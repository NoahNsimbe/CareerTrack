import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { UceSubjects, uceSubjects } from '../models/uce';
import { MainService } from '../services/main.service';


@Component({
  selector: 'app-uce',
  templateUrl: './uce.component.html',
  styleUrls: ['./uce.component.css']
})
export class UceComponent implements OnInit {


  uceResults: FormGroup;
  electivesResults: FormGroup;
  Grades: any;

  electives: uceSubjects[];
  uceSubjects: uceSubjects[];
  compulsorySubjects: uceSubjects[];

  constructor( private formBuilder: FormBuilder, private mainService: MainService, ) {
      this.Grades = [
      {  name: 'D1', value: '1'},
      {  name: 'D2', value: '2'},
      {  name: 'C3', value: '3'},
      {  name: 'C4', value: '4'},
      {  name: 'C5', value: '5'},
      {  name: 'C6', value: '6'},
      {  name: 'P7', value: '7'},
      {  name: 'P8', value: '8'},
      {  name: 'F9', value: '9'}]
      this.electives = new Array();
      this.compulsorySubjects = new Array();
      this.electivesResults = this.formBuilder.group(
       {
        uceElective1: ['', RxwebValidators.compose({
          validators:[
            RxwebValidators.required(),
            RxwebValidators.unique()
          ]
        })],
        uceElective2: ['', RxwebValidators.unique()],
        uceElective3: ['', RxwebValidators.unique()],
        uceElective1Grade: ['',  RxwebValidators.required()],
        uceElective2Grade: [''],
        uceElective3Grade: [''],
       }
    )
      this.uceResults = this.formBuilder.group({})
  }

  inputChanged(element: any, e: { target: { value: any; }; }) {

    var elementName = element;
    var elementValue = e.target.value;

    if(elementValue !== ""){

      this.Grades.forEach(grade => {
        if(grade.name == elementValue){
          elementValue = grade.value ;
        }
      })

      this.uceResults.get(elementName).setValue(elementValue);

    }

  }

  electiveChanged(element: any, e: { target: { value: any; }; }) {

    var elementName = element.getAttribute('formControlName');
    var elementValue = e.target.value;
    var elementNameGrade = elementName + 'Grade';

    if(elementValue !== ""){

      elementValue = elementValue.split(':')[1].trim();

      if(elementName == 'uceElective1' || elementName == 'uceElective2' || elementName == 'uceElective3'){
        this.electivesResults.get(elementNameGrade).setValidators(RxwebValidators.compose({
        validators:[
          RxwebValidators.required()
        ]
      }));
        this.electivesResults.get(elementNameGrade).updateValueAndValidity();
      }

      if(elementName == 'uceElective1Grade' || elementName == 'uceElective2Grade' || elementName == 'uceElective3Grade'){
        var elementParentName = elementName.substring(0, 12);
        if(this.electivesResults.get(elementParentName).value == ""){
          alert("please select a subject for elective " + elementParentName.substring(11) + " before entering the grade");
          this.electivesResults.get(elementName).setValue("");
          return
        }
      }

      this.electivesResults.get(elementName).setValue(elementValue, {
        onlySelf: true
      });

    }
    else{
      if(elementName == 'uceElective1' || elementName == 'uceElective2' || elementName == 'uceElective3'){
        this.electivesResults.get(elementNameGrade).setValue("");
        this.electivesResults.get(elementNameGrade).clearValidators();
        this.electivesResults.get(elementNameGrade).updateValueAndValidity();
      }

      if(elementName == 'uceElective1Grade' || elementName == 'uceElective2Grade' || elementName == 'uceElective3Grade'){
        this.electivesResults.get(elementName.substring(0, 12)).setValue("");
        this.electivesResults.get(elementName).clearValidators();
        this.electivesResults.get(elementName).updateValueAndValidity();
      }
    }
  }

  loadSubjects(): void{
    this.mainService
        .getUceSubjects()
        .subscribe((data: UceSubjects) => {
          this.uceSubjects = data.uce_subjects;

          this.uceSubjects.forEach(subject => {
            if(String(subject.category).toString().toUpperCase() == "COMPULSORY"){
              this.compulsorySubjects.push(subject);
              this.uceResults.addControl(subject.code, new FormControl("", RxwebValidators.required()));
            }
            else{
              this.electives.push(subject);
            }

          });
        });
  }

  ngOnInit() {
    this.loadSubjects();
  }

}
