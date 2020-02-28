import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ServerService } from '../server.service';
import { UceSubjects } from '../uce';


@Component({
  selector: 'app-uce',
  templateUrl: './uce.component.html',
  styleUrls: ['./uce.component.css']
})
export class UceComponent implements OnInit {

  // uceResults = new FormGroup({
  //   uceMath: new FormControl(''),
  //   uceEng: new FormControl(''), 
  //   uceHist: new FormControl(''), 
  //   uceChem: new FormControl(''), 
  //   uceBio: new FormControl(''), 
  //   uceGeog: new FormControl(''), 
  //   ucePhys: new FormControl(''), 
  //   uceElective1: new FormControl(''), 
  //   uceElective2: new FormControl(''), 
  //   uceElective3: new FormControl(''), 
  // });

  // uceResults: any;
  Grades: any = [
    {  name: 'D1', value: '1'}, 
    {  name: 'D2', value: '2'}, 
    {  name: 'C3', value: '3'}, 
    {  name: 'C4', value: '4'}, 
    {  name: 'C5', value: '5'}, 
    {  name: 'C6', value: '6'}, 
    {  name: 'P7', value: '7'}, 
    {  name: 'P8', value: '8'}, 
    {  name: 'F9', value: '9'}]

  electives: string[];
  removedElectives: string[];

  constructor( private formBuilder: FormBuilder, private serverService: ServerService, ) {}

  uceResults = this.formBuilder.group({
    uceMath: ['',  RxwebValidators.required() ],
    uceEng: ['',  RxwebValidators.required() ], 
    uceHist: ['',  RxwebValidators.required() ], 
    uceChem: ['',  RxwebValidators.required() ], 
    uceBio: ['', RxwebValidators.required() ], 
    uceGeog: ['',  RxwebValidators.required() ], 
    ucePhys: ['',  RxwebValidators.required() ], 
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
  })


  inputChanged(element: HTMLElement, e: { target: { value: any; }; }) {
    var elementName = element.getAttribute('formControlName');
    var elementValue = e.target.value;
 //   elementValue = elementValue.split(':')[1].trim()
    var elementNameGrade = elementName + 'Grade';

    if(elementValue !== ""){

      elementValue = elementValue.split(':')[1].trim();

      if(elementName == 'uceElective1' || elementName == 'uceElective2' || elementName == 'uceElective3'){      
        this.uceResults.get(elementNameGrade).setValidators(RxwebValidators.compose({
        validators:[
          RxwebValidators.required(),
          RxwebValidators.unique()
        ]
      }));
        this.uceResults.get(elementNameGrade).updateValueAndValidity();
      }

      if(elementName == 'uceElective1Grade' || elementName == 'uceElective2Grade' || elementName == 'uceElective3Grade'){      
        var elementParentName = elementName.substring(0, 12);
        if(this.uceResults.get(elementParentName).value == ""){
          alert("please select a subject for elective " + elementParentName.substring(11) + " before entering the grade");
          this.uceResults.get(elementName).setValue("");
          return
        }
      }

      this.uceResults.get(elementName).setValue(elementValue, {
        onlySelf: true
      });

      try {
        
        let location = this.electives.indexOf(elementValue);
        this.removedElectives.push(this.electives.splice(location, 1).toString());

      } catch (error) {
        console.log(error);
      }


      // try{
      //   this.uceResults.get(elementName).setValue(elementValue, {
      //     onlySelf: true
      //   })
      //   console.log(elementValue);
      //   console.log(this.uceResults.valid);
      // }
      // finally{

      // }
      

      
      
     // elementValue = this.uceResults.get(elementName).value;
     // console.log(elementValue.split(':')[1].trim());
      

    }
    else{
      if(elementName == 'uceElective1' || elementName == 'uceElective2' || elementName == 'uceElective3'){
        this.uceResults.get(elementNameGrade).setValue("");
        this.uceResults.get(elementNameGrade).clearValidators();
        this.uceResults.get(elementNameGrade).updateValueAndValidity();
      }

      if(elementName == 'uceElective1Grade' || elementName == 'uceElective2Grade' || elementName == 'uceElective3Grade'){      
        this.uceResults.get(elementName.substring(0, 12)).setValue("");
        this.uceResults.get(elementName).clearValidators();
        this.uceResults.get(elementName).updateValueAndValidity();
      }

    }

    
  }

  loadSubjects(): void{
    this.serverService
        .getUceSubjects()
        .subscribe((data: UceSubjects) => {
          this.electives = data.subjects;
        });

  }

  ngOnInit() {
    this.loadSubjects();
  }

}
