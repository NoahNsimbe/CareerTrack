import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ServerService } from '../server.service';
import { UaceSubjects } from '../uace';
import { Careers } from '../careers';


@Component({
  selector: 'app-uace',
  templateUrl: './uace.component.html',
  styleUrls: ['./uace.component.css']
})
export class UaceComponent implements OnInit {

  heroes: Careers[];

  Grades: any = [
    {  name: 'A', value: '6'}, 
    {  name: 'B', value: '5'}, 
    {  name: 'C', value: '4'}, 
    {  name: 'D', value: '3'}, 
    {  name: 'E', value: '2'}, 
    {  name: 'F', value: '1'}, 
    {  name: 'O', value: '0'}]

  compulsorySubject: string;
  subjects: string[];
  susidiaries: string[];
  applicationTypes: any = ['Government Sponsorship', 'Private Sponsorship'];
  sub: string[];

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
    uaceSubsidiaryGrade: ['', RxwebValidators.required() ], 
    uaceDpGrade: ['', RxwebValidators.required() ], 
    uaceOption1Grade: ['', RxwebValidators.required() ], 
    uaceOption2Grade: ['', RxwebValidators.required() ], 
    uaceOption3Grade: ['', RxwebValidators.required() ], 
  });
  uaceSubjects: UaceSubjects;

  constructor( private formBuilder: FormBuilder, private serverService: ServerService) { 
    
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

  getHeroes(): void{
    this.serverService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  // loadSubjects():void{
  //   this.serverService.getUaceSubjects()
  //       .subscribe(data => {
  //         console.log(data);
  //         this.susidiaries = data.subsidiaries;
  //         this.subjects = data.optionals;
  //         this.compulsorySubject = data.compulsory;
  //       } );
  // }

    loadSubjects(): void{
    this.serverService.getUaceSubjects()
        .subscribe((data: UaceSubjects) => {
          //  console.log(data.optionals);
          this.susidiaries = data.subsidiaries;
          this.subjects = data.optionals;
          this.compulsorySubject = data.compulsory;
        });
  }


  // loadSubjects(): void{
  //   this.serverService.getUaceSubjects()
  //       .subscribe((data: UaceSubjects) => this.uaceSubjects = { ...data });
  // }

}
