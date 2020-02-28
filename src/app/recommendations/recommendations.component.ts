import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Careers, UserSubmissions } from '../careers';
import { CareersService } from '../careers.service';
import { UceComponent } from '../uce/uce.component';
import { UaceComponent } from '../uace/uace.component';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, startWith, map } from 'rxjs/operators';
import { AuthenticationService } from '../auth.service';
import { UaceCombinations, Combinations } from '../uce';
import { Programs, UniveristyPrograms } from '../uace';


@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {
  
  // careerFormGroup: FormGroup = this.formBuilder.group({ 
    
  //   comment: [''],
  //   careers:this.formBuilder.array([
  //     this.getCareerFormGroup()
  //   ])
  // });

  // careersList$: Observable<Career[]>;
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
  

  searchTerms = new Subject<string>();
  loggedIn: boolean;
  saveDetails: boolean;

  Levels: string[];
  level: string;
  loading: boolean;
  operationSuccess: boolean;

  careerChoiceOne: FormControl;
  careerChoiceTwo: FormControl;
  careerChoiceThree: FormControl;
  comment: FormControl;
  careers: string[];
  filteredOptionsOne: Observable<string[]>;
  filteredOptionsTwo: Observable<string[]>;
  filteredOptionsThree: Observable<string[]>;
  educLevel: { "uce": boolean; "uace": boolean; 'careers': boolean; };
  

  constructor(
    private titleService: Title, 
    private authService: AuthenticationService,
    private careerService: CareersService, 
    private formBuilder: FormBuilder) {

      this.loggedIn = true;
      this.loading = false;
      this.saveDetails = false;

      this.submissions = new UserSubmissions();
      
      this.careers = [];
      this.Levels = ['UCE', 'UACE'];
      this.educLevel = { "uce": false, "uace": false, 'careers':false  };
      this.operationSuccess = false;

      this.careerChoiceOne = new FormControl("", RxwebValidators.required());
      this.careerChoiceTwo = new FormControl("");
      this.careerChoiceThree = new FormControl("");
      this.comment = new FormControl("");

      this.careerForm.addControl("careerChoiceOne", this.careerChoiceOne);
      this.careerForm.addControl("careerChoiceTwo", this.careerChoiceTwo);
      this.careerForm.addControl("careerChoiceThree", this.careerChoiceThree);
      this.careerForm.addControl("comments", this.comment);

      
     }

  ngOnInit() {
    this.titleService.setTitle('Recommendations | Career Track');
    this.loadCareers();


    this.filteredOptionsOne = this.careerChoiceOne.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

      this.filteredOptionsTwo = this.careerChoiceTwo.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

      this.filteredOptionsThree = this.careerChoiceThree.valueChanges
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
    this.careerService
        .getCareers()
        .subscribe((data: Careers) =>{ 
          this.careers = data.careersList;
        },error => console.log("error => " + error));
  }

  getCombinations(results: UserSubmissions): void{
    this.careerService.getCombinations(results)
    .subscribe((data: Combinations) => {
      this.recommendedCombinations = data.combinations;
      this.operationSuccess = true; 
    },error => {
      console.log("error => " + error);
      this.operationSuccess = false;});
  }

  getPrograms(results: UserSubmissions): void{
    this.careerService.getPrograms(results)
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
      alert("Please fill in atleast one careeer");
      return
    }

    this.submissions.careers = this.careerForm.value;

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












  // searchCareer(): void{
  //   // this.careerService.getCareers()
  //   //   .subscribe(careers => this.careersList = careers);

  //   this.careersList$ = this.searchTerms.pipe(
  //     // wait 300ms after each keystroke before considering the term
  //     debounceTime(300),

  //     // ignore new term if same as previous term
  //     distinctUntilChanged(),

  //     // switch to new search observable each time the term changes
  //     switchMap((term: string) => this.careerService.searchCareers(term)),
  //   );
  // }


//   addCareer(): void{
//     let careerArray = <FormArray>this.careerFormGroup.controls.careers;
//     if(careerArray.length < 3){
//       careerArray.push(this.getCareerFormGroup());
      
      
//     }
//     else{
//       alert("You can enter a maximum of 3 careers");
//       console.log(this.careerFormGroup);
//     }

// //    this.search('m');
//  //   console.log(this.careersList$);
    
//   }

//   getCareerFormGroup(){
//     return this.formBuilder.group({
//       careerName:['', [RxwebValidators.compose({
//         validators:[
//           RxwebValidators.required(),
//           RxwebValidators.unique()
//         ]
//       })] ] //required
//     })
//   }

//   selectCareer( value:any) {
//     var elementValue = value;
//     this.search("");
    
//   }



 // Push a search term into the observable stream.
  // search(term: string): void {
  //   this.searchTerms.next(term);
  // }

}
