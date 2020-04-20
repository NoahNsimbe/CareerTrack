import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Careers, UserSubmissions } from './main';
import { UaceSubjects, Programs } from './uace';
import { UceSubjects, Combinations } from './uce';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})

export class MainService {

  httpOptions: any;

  constructor(private httpClient: HttpClient, private serverService: ServerService) {

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

  }

  getUaceSubjects(): Observable<UaceSubjects>{
    return this.httpClient.get<UaceSubjects>(this.serverService.getApi("uace_subjects")).pipe(
      catchError(this.handleError)
    );
  }

  getUceSubjects(): Observable<UceSubjects>{
    return this.httpClient.get<UceSubjects>(this.serverService.getApi("uce_subjects")).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getCareers(): Observable<Careers>{

    return this.httpClient
              .get<Careers>(this.serverService.getApi("careers"))
              .pipe(retry(3),catchError(this.handleError));

  }

  getCombinations(submissions: UserSubmissions, careerOnly: boolean): Observable<any>{

    var data = null
    if (careerOnly == true){
      data = JSON.stringify({"career" : submissions.career});
    }
    else{
      data = JSON.stringify({"career" : submissions.career, "uce_results" : submissions.uce_results});
    }

    return this.httpClient
                .post<Combinations>(this.serverService.getApi("combination"), data, this.httpOptions)
                .pipe(retry(3),catchError(this.handleError));
  }

  getPrograms(submissions: UserSubmissions, careerOnly: boolean): Observable<any>{

    var data = null
    if (careerOnly == true){
      data = JSON.stringify({"career" : submissions.career});
    }
    else{
      data = JSON.stringify({"career" : submissions.career, "uce_results" : submissions.uce_results, "uace_results" : submissions.uace_results});
    }

    return this.httpClient
                .post<Programs>(this.serverService.getApi("course"), data, this.httpOptions)
                .pipe(retry(3),catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {

    var user_response = null
    if (error.error instanceof ErrorEvent) {
      user_response = error.error.message
      console.error('An error occurred:', user_response); 
    } 
    
    else {
      if (error.status == 500){
        user_response = error.error
      }
      else{
        user_response = "Something bad happened. Please try again later"
      }
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    return throwError(user_response);
  }

}
