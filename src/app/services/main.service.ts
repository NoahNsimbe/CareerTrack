import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Careers, UserSubmissions } from '../models/main';
import { UaceSubjects, Programs } from '../models/uace';
import { UceSubjects, Combinations } from '../models/uce';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MainService {

  constructor(private httpClient: HttpClient) {

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

  }

  httpOptions: any;

  private static handleError(error: HttpErrorResponse) {

    let userResponse: any;
    if (error.error instanceof ErrorEvent) {
      userResponse = error.error.message;
      console.error('An error occurred:', userResponse);
    } else {
      if (error.status === 500) {
        userResponse = error.error;
      } else {
        userResponse = 'Something bad happened. Please try again later';
      }
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    return throwError(userResponse);
  }

  getUaceSubjects(): Observable<UaceSubjects> {
    return this.httpClient.get<UaceSubjects>(`${environment.rootApi}${environment.uaceSubjects}`).pipe(
      catchError(MainService.handleError)
    );
  }

  getUceSubjects(): Observable<UceSubjects> {
    return this.httpClient.get<UceSubjects>(`${environment.rootApi}${environment.uceSubjects}`).pipe(
      retry(3),
      catchError(MainService.handleError)
    );
  }

  getCareers(): Observable<Careers> {

    return this.httpClient
              .get<Careers>(`${environment.rootApi}${environment.careers}`)
              .pipe(retry(3), catchError(MainService.handleError));

  }

  getCombinations(submissions: UserSubmissions, careerOnly: boolean): Observable<any> {

    let data: string;
    if (careerOnly === true) {
      data = JSON.stringify({career : submissions.career});
    } else {
      data = JSON.stringify({career : submissions.career, uce_results : submissions.uce_results});
    }

    return this.httpClient
                .post<Combinations>(`${environment.rootApi}${environment.getCombination}`, data, this.httpOptions)
                .pipe(retry(3), catchError(MainService.handleError));
  }

  getPrograms(submissions: UserSubmissions, careerOnly: boolean): Observable<any> {

    let data: string;
    if (careerOnly === true) {
      data = JSON.stringify({career : submissions.career});
    } else {
      data = JSON.stringify({career : submissions.career, uce_results : submissions.uce_results, uace_results : submissions.uace_results});
    }

    return this.httpClient
                .post<Programs>(`${environment.rootApi}${environment.getCourse}`, data, this.httpOptions)
                .pipe(retry(3), catchError(MainService.handleError));
  }

}
