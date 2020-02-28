import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { Careers, UserSubmissions } from './careers';
import { UaceSubjects, Programs } from './uace';
import { UceSubjects, Combinations } from './uce';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})

export class CareersService {

  private careersUrl = 'http://127.0.0.1:8000/careers';

  constructor(private httpClient: HttpClient, private serverService: ServerService) { 
  }

  // private log(message: string) {
  //   console.log(message);
  // }

  // searchCareers(term: string): Observable<Career[]> {
  //   if (!term.trim()) {
  //     // if not search term, return empty hero array.
  //     return of([]);
  //   }
  //   return this.httpClient.get<Career[]>(`${this.careersUrl}/?career=${term}`).pipe(
  // //    tap(_ => this.log(`found careers matching "${term}"`)),
  //     catchError(this.handleError<Career[]>('searchHeroes', []))
  //   );
  // }

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
              .get<Careers>(this.careersUrl)
              .pipe(retry(3),catchError(this.handleError));

  }

  getCombinations(submissions: UserSubmissions): Observable<Combinations>{
    let data = JSON.stringify(submissions.careers + submissions.uceResults);
    return this.httpClient
                .get<Combinations>(this.serverService.getApi("recom_combinations"))
                .pipe(retry(3),catchError(this.handleError));
  }

  getPrograms(submissions: UserSubmissions): Observable<Programs>{
    let data = JSON.stringify(submissions.uaceResults + submissions.careers);
    return this.httpClient
                .get<Programs>(this.serverService.getApi("recom_programs"))
                .pipe(retry(3),catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      // console.log('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      // console.log(
      //   `Backend returned code ${error.status}, ` +
      //   `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  // private handleError<T> (operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  
  //     // TODO: send the error to remote logging infrastructure
  //   //  console.error(error); // log to console instead
  //     console.error(`${operation} failed: ${error.message}`);
  
  //     // TODO: better job of transforming error for user consumption
  //     this.log(`${operation} failed: ${error.message}`);
  
  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }
}
