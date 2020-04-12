import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Careers, UserSubmissions } from '../main';
import { UceComponent } from '../uce/uce.component';
import { UaceComponent } from '../uace/uace.component';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Subject, Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AuthenticationService } from '../auth.service';
import { UaceCombinations, Combinations } from '../uce';
import { Programs, UniveristyPrograms } from '../uace';
import { MainService } from '../main.service';


@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {
  
  careerForm: FormGroup = this.formBuilder.group({

  });

  @ViewChild(UceComponent, {static: false}) uceComponent !: UceComponent;
  @ViewChild(UaceComponent, {static: false}) uaceComponent !: UaceComponent;

  uaceForm: FormGroup;
  uceForm: FormGroup;
  submissions: UserSubmissions;

  recommendedCombinations: UaceCombinations[];
  recommendedPrograms: UniveristyPrograms[];

  careersList: Careers[];
  recommendation: any;
  

  searchTerms = new Subject<string>();
  loggedIn: boolean;
  saveDetails: boolean;

  level: string;
  loading: boolean;
  operationSuccess: boolean;

  careerChoice: FormControl;
  comment: FormControl;
  careers: string[];
  filteredOption: Observable<string[]>;
  educLevel: { "uce": boolean; "uace": boolean; 'careers': boolean; };
  

  constructor(
    private titleService: Title, 
    private authService: AuthenticationService,
    private mainService: MainService, 
    private formBuilder: FormBuilder) {

      this.loggedIn = true;
      this.loading = false;
      this.saveDetails = false;

      this.submissions = new UserSubmissions();
      
      this.careers = [];

      this.recommendation = [
        {  name: 'Combination', value: 'UCE'}, 
        {  name: 'Course', value: 'UACE'}]

      this.educLevel = { "uce": false, "uace": false, 'careers':false  };
      this.operationSuccess = false;

      this.careerChoice = new FormControl("", RxwebValidators.required());
      this.comment = new FormControl("");

      this.careerForm.addControl("careerChoice", this.careerChoice);

      this.careerForm.addControl("comments", this.comment);

      
     }

  ngOnInit() {
    this.titleService.setTitle('Recommendations | Career Track');
    this.loadCareers();


    this.filteredOption = this.careerChoice.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase().trim();

    if(filterValue.length > 0){
      return this.careers.filter(option => option.toLowerCase().includes(filterValue));
   //   return this.careers.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    }
    return 

  }

  loadCareers(): void{
    this.mainService
        .getCareers()
        .subscribe((data: Careers) =>{
          this.careers = data.careers;
          console.log(this.careers)
        },error => console.log("error => " + error));

  }

  getCombinations(results: UserSubmissions): void{
    this.mainService.getCombinations(results)
    .subscribe((data: Combinations) => {
      this.recommendedCombinations = data.combinations;
      this.operationSuccess = true; 
    },error => {
      console.log("error => " + error);
      this.operationSuccess = false;});
  }

  getPrograms(results: UserSubmissions): void{
    this.mainService.getPrograms(results)
    .subscribe((data: Programs) => {
      this.recommendedPrograms = data.programs;
      this.operationSuccess = true;
    },error => {
      console.log("error => " + error);
      this.operationSuccess = false;
    });

  }

  verify(): void{

    this.operationSuccess = false;
    

    if(this.educLevel.uace){

      this.uceForm = this.uceComponent.uceResults;
      this.uaceForm = this.uaceComponent.uaceResults;

      if( !this.uaceForm.valid){
        alert("Please fill in all your UACE subjects, results and specify the application type");
        return;
      }
      if( !this.uceForm.valid){
        alert("Please fill in all your UCE subjects and results");
        return;
      }

      this.submissions.uceResults = this.uceForm.value;
      this.submissions.uaceResults = this.uaceForm.value;
      
    }
    else if(this.educLevel.uce){

      this.uceForm = this.uceComponent.uceResults;

      if( !this.uceForm.valid){
        alert("Please fill in all your UCE subjects and results");
        return;
      }

      this.submissions.uceResults = this.uceForm.value;
    }
    else{
      // log error
      return
    }

    if(!this.careerForm.valid){   
      alert("Please fill in a careeer");
      return
    }

    this.submissions.career = this.careerForm.value;

 //   this.loading = true;
    
    

    if(this.educLevel.uace){

      this.getPrograms(this.submissions);
    }
    else{
      this.getCombinations(this.submissions);
    }


 //   this.loading = false;

  }

  inputChanged(e: { target: { value: any; }; }) {
    var elementValue = e.target.value;

    if(elementValue !== ""){

      this.level = elementValue
      if(this.level.trim().valueOf() == "UCE"){
        this.educLevel.uce = true
        this.educLevel.uace = false
        this.educLevel.careers = true
      }

      if(this.level.trim().valueOf() == "UACE"){
        this.educLevel.uce = true
        this.educLevel.uace = true
        this.educLevel.careers = true
      }

    }
    else{
      this.educLevel.uce = false
      this.educLevel.uace = false
      this.educLevel.careers = false

    } 
  }
}
