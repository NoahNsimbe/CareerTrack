import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Careers, UserSubmissions } from '../models/main';
import {UaceSubjects, Programs, UaceSubject, Program} from '../models/uace';
import {Combination, UceSubject} from '../models/uce';
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
    console.log(error);
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

  getUaceSubjects(): Observable<UaceSubject[]> {
    return this.httpClient.get<UaceSubject[]>(`${environment.rootApi}${environment.uaceSubjects}`).pipe(
      catchError(MainService.handleError)
    );
  }

  getUceSubjects(): Observable<UceSubject[]> {
    return this.httpClient.get<UceSubject[]>(`${environment.rootApi}${environment.uceSubjects}`).pipe(
      retry(3),
      catchError(MainService.handleError)
    );
  }

  getCareers(): Observable<Careers> {

    return this.httpClient
              .get<Careers>(`${environment.rootApi}${environment.careers}`)
              .pipe(retry(3), catchError(MainService.handleError));

  }

  getCombinations(submissions: UserSubmissions, careerOnly: boolean): Observable<Combination[]> {

    let data: any;
    if (careerOnly === true) {
      data = {career : submissions.career};
    } else {
      data = {career : submissions.career, uce_results : submissions.uce_results};
    }

    return this.httpClient
                .post<Combination[]>(`${environment.rootApi}${environment.getCombination}`, data)
                .pipe(retry(3), catchError(MainService.handleError));
  }

  getPrograms(submissions: UserSubmissions, careerOnly: boolean): Observable<Program[]> {

    let data: any;
    if (careerOnly === true) {
      data = {career : submissions.career};
    } else {
      data = {career : submissions.career, uce_results : submissions.uce_results, uace_results : submissions.uace_results};
    }

    return this.httpClient
                .post<Program[]>(`${environment.rootApi}${environment.getCourse}`, data)
                .pipe(retry(3), catchError(MainService.handleError));
  }

}
