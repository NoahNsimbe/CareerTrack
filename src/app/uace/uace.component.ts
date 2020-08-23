import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { UaceSubjects, uaceSubjects } from '../models/uace';
import { MainService } from '../services/main.service';



@Component({
  selector: 'app-uace',
  templateUrl: './uace.component.html',
  styleUrls: ['./uace.component.css']
})
export class UaceComponent implements OnInit {

  // Grades: Array<{name: string, value: string}>;
  Grades: any;
  compulsorySubject: string;
  subjects: string[];
  // susidiaries: string[];
  applicationTypes: any;
  genderTypes: any;
  uaceSubjects: Array<uaceSubjects>;
  subsidiaries: Array<uaceSubjects>;
  mainSubjects: Array<uaceSubjects>;
  compulsorySubjects:  Array<uaceSubjects>;

  uaceResults = this.formBuilder.group({
    uaceOption1: ['', [RxwebValidators.compose({
        validators:[
          RxwebValidators.required(),
          RxwebValidators.unique()
        ]
      })] ],
    uaceOption2: ['', [RxwebValidators.compose({
        validators:[
          RxwebValidators.required(),
          RxwebValidators.unique()
        ]
      }) ]],
    uaceOption3: ['', RxwebValidators.compose({
        validators:[
          RxwebValidators.required(),
          RxwebValidators.unique()
        ]
      }) ],
    uaceSubsidiary: ['', RxwebValidators.required() ],
    applicationType: ['', RxwebValidators.required() ],
    gender: ['', RxwebValidators.required() ],
    uaceSubsidiaryGrade: ['', RxwebValidators.required() ],
    uaceGpGrade: ['', RxwebValidators.required() ],
    uaceOption1Grade: ['', RxwebValidators.required() ],
    uaceOption2Grade: ['', RxwebValidators.required() ],
    uaceOption3Grade: ['', RxwebValidators.required() ],
  });

  constructor( private formBuilder: FormBuilder, private mainService: MainService) {

    this.applicationTypes = [
      {name:'Public Admission', value: 'Public'},
      {name:'Private Admission', value: 'Private'}
    ];
    this.genderTypes = [
      {name:'Male', value: 'Male'},
      {name:'Female', value: 'Female'}
    ];

    this.Grades = [
      {  name: 'A', value: '6'},
      {  name: 'B', value: '5'},
      {  name: 'C', value: '4'},
      {  name: 'D', value: '3'},
      {  name: 'E', value: '2'},
      {  name: 'F', value: '1'},
      {  name: 'O', value: '0'}];
    this.subsidiaries = [];
    this.mainSubjects = [];
    this.compulsorySubjects = [];
  }

  inputChanged(element: HTMLElement, e: { target: { value: any; }; }) {
    var elementName = element.getAttribute('formControlName');
    var elementValue = e.target.value;

    if(elementValue !== ""){

      elementValue = elementValue.split(':')[1].trim();

      this.uaceResults.get(elementName).setValue(elementValue, {
        onlySelf: true
      })
    }
  }

  ngOnInit() {

    this.loadSubjects();

  }

  loadSubjects(): void{
    this.mainService.getUaceSubjects()
        .subscribe((data: UaceSubjects) => {
          this.uaceSubjects = data.uace_subjects;
          console.log(this.uaceSubjects);

          this.uaceSubjects.forEach(subject => {

            let category: string = String(subject.category).toString().toUpperCase()
            let general: string = String(subject.general_subject).toString().toUpperCase()

            if(category == "SCIENCE" || category == "ART"){
              this.mainSubjects.push(subject);
            }
            else{
              if(general == "TRUE"){
                this.compulsorySubjects.push(subject);
              }
              else{
                this.subsidiaries.push(subject);
              }
            }

          });

        });
  }
}
