import {Component, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Careers, UserSubmissions} from '../models/main';
import {UceComponent} from '../uce/uce.component';
import {UaceComponent} from '../uace/uace.component';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {Observable, Subject} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Combination} from '../models/uce';
import {Program} from '../models/uace';
import {MainService} from '../services/main.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {



  @ViewChild(UceComponent, {static: false}) uceComponent !: UceComponent;
  @ViewChild(UaceComponent, {static: false}) uaceComponent !: UaceComponent;

  uaceForm: FormGroup;
  uceForm: FormGroup;
  electivesForm: FormGroup;
  submissions: UserSubmissions;
  careerForm: FormGroup;
  uceRecommendations: any;

  combinations: Combination[];
  programs: Program[];

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
  educLevel: { 'uce': boolean; 'uace': boolean; 'careers': boolean; 'course': boolean; 'combination': boolean; };


  constructor(
    private titleService: Title,
    private mainService: MainService,
    private formBuilder: FormBuilder) {

      this.loggedIn = true;
      this.loading = false;
      this.saveDetails = false;

      this.uceRecommendations = [];

      this.submissions = new UserSubmissions();

      this.careers = [];

      this.recommendation = [
        {  name: 'Combination, provided results', value: 'UCE'},
        {  name: 'Course, provided results', value: 'UACE'},
        {  name: 'Combination, without results', value: 'COMBINATION'},
        {  name: 'Course, without results', value: 'COURSE'}
      ];

      this.educLevel = { course: false, combination: false, uce: false, uace: false, careers: false  };
      this.operationSuccess = false;

      this.careerChoice = new FormControl('', RxwebValidators.required());

      this.careerForm = this.formBuilder.group({
        career: this.careerChoice,
      });

      this.level = '';
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

    if (filterValue.length > 0) {
      return this.careers.filter(option => option.toLowerCase().includes(filterValue));
   //   return this.careers.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    }
    return;

  }

  loadCareers(): void {
    this.mainService
        .getCareers()
        .subscribe((data: Careers) => {

          for (const dataKey in data) {
            const lastindex = this.careers.length;
            this.careers[lastindex] = data[dataKey].name;
          }
        }, error => console.log('error => ' + error));
  }

  getCombinations(results: UserSubmissions, careerOnly: boolean): void {

    this.mainService
      .getCombinations(results, careerOnly)
      .subscribe((data: Combination[]) => {
      this.combinations = data;
      // for (const subject in this.combinations) {
      //   this.uceRecommendations.append('{subject: this.combinations.combinations[subject] }');
      // }
      this.operationSuccess = true;
    }, error => {
      console.log('error => ' + error);
      this.operationSuccess = false;
      });
  }

  getPrograms(results: UserSubmissions, careerOnly: boolean): void {
    this.mainService.getPrograms(results, careerOnly)
    .subscribe((data: Program[]) => {
      this.programs = data;
      this.operationSuccess = true;
    }, error => {
      console.log('error => ' + error);
      alert(error);
      this.operationSuccess = false;
    });

  }

  addElectives(results: {}, electives: {}): {} {

    for (const subject in electives) {



        if (subject === 'uceElective1' || subject === 'uceElective2' || subject === 'uceElective3') {

          let elective = electives[subject];
          console.log(subject);

          if ((elective != null) || (elective !== '')) {
            const gradeName = subject + 'Grade';

            try {
              elective = elective.split(':')[1].trim();
            } catch (e) {

            }

            if ((electives[gradeName] != null) || (electives[gradeName] !== '')) {

              try {
                results[elective] = electives[gradeName].split(':')[1].trim();
              } catch (e) {
                results[elective] = electives[gradeName];
              }
            }

          }

        }
    }

    return results;
  }

  unpackUace(results: {}): {} {

    const uaceResults: any = {};

    for (const x in results) {

        if (x === 'uaceOption1' || x === 'uaceOption2' || x === 'uaceOption2' || x === 'uaceSubsidiary') {

          const subject = results[x];

          if (subject != null) {

            const gradeName = x + 'Grade';

            if (results[gradeName] != null) {
                const grade = results[gradeName];
                uaceResults[subject] = grade;
            }
          }
        } else if (x === 'applicationType') {
          uaceResults.admission_type = results[x];
        } else if (x === 'genderType') {
          uaceResults.gender = results[x];
        } else if (x === 'uaceGpGrade') {

          this.uaceComponent.compulsorySubjects.forEach(element => {
            uaceResults[element.code] = results[x];
          });
        } else {

        }
    }

    return uaceResults;

  }

  verify(): void {

    //   this.loading = true;

    this.operationSuccess = false;
    this.submissions = new UserSubmissions();

    if (!this.careerForm.valid) {
      alert('Please fill in a careeer');
      return;
    }
    this.submissions.career = this.careerForm.get('career').value;

    if (this.educLevel.uace || this.educLevel.uce) {

      this.uceForm = this.uceComponent.uceResults;
      this.electivesForm = this.uceComponent.electivesResults;

      if (!this.uceForm.valid) {
        alert('Please fill in all your UCE subjects and results');
        return;
      } else if (!this.electivesForm.valid) {
        alert('Please fill in atleast the first UCE elective subject and its results results');
        return;
      } else {
        this.submissions.uce_results = this.addElectives(this.uceForm.value, this.electivesForm.value);
      }

      if (this.educLevel.uace) {
        this.uaceForm = this.uaceComponent.uaceResults;
        if (!this.uaceForm.valid) {
          alert('Please fill in all your UACE subjects, results and specify the application type');
          return;
        } else {
        //  this.submissions.uace_results = this.uaceForm.value;
          this.submissions.uace_results = this.unpackUace(this.uaceForm.value);
          console.log(this.submissions);
          this.getPrograms(this.submissions, false);
        }
      } else {
        console.log(this.submissions);
        // this.getCombinations(this.submissions, false);
      }
    } else if (this.educLevel.combination) {
      // console.log(this.submissions)
      this.getCombinations(this.submissions, true);
    } else if (this.educLevel.course) {
      // console.log(this.submissions)
      this.getPrograms(this.submissions, true);
    } else {
      console.log('Not recommdation selected');
      return;
    }

 //   this.loading = false;

  }

  initialize() {
    this.educLevel.careers = true;
    this.educLevel.uce = false;
    this.educLevel.uace = false;
    this.educLevel.course = false;
    this.educLevel.combination = false;
    this.operationSuccess = false;
  }

  inputChanged(e: { target: { value: any; }; }) {
    const elementValue: any = e.target.value;

    if (elementValue !== '') {

      this.recommendation.forEach(recom => {
        if (recom.name === elementValue) {
          this.level = recom.value ;
        }
      });

      this.initialize();

      if (this.level.trim().valueOf() === 'UCE') {
        this.educLevel.uce = true;
        this.educLevel.uace = false;
      } else if (this.level.trim().valueOf() === 'UACE') {
        this.educLevel.uce = true;
        this.educLevel.uace = true;
      } else if (this.level.trim().valueOf() === 'COMBINATION') {
        this.educLevel.combination = true;
      } else if (this.level.trim().valueOf() === 'COURSE') {
        this.educLevel.course = true;
      } else {
        this.educLevel.careers = false;
      }

    } else {
      this.educLevel.uce = false;
      this.educLevel.uace = false;
      this.educLevel.careers = false;
      this.educLevel.course = false;
      this.educLevel.combination = false;

    }
  }
}
