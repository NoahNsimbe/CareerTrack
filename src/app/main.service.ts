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

// const httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': null,
//     })
// }

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

    // this.response = this.httpClient
    // .get<HttpResponseBase>(this.serverService.getApi("careers"))
    // .pipe(retry(3),catchError(this.handleError));

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

    data = JSON.stringify({"career" : submissions.career});

    return this.httpClient
                .post<Combinations>(this.serverService.getApi("combination"), data, this.httpOptions)
                .pipe(retry(3),catchError(this.handleError));
  }

  getPrograms(submissions: UserSubmissions, careerOnly: boolean): Observable<Programs>{
    let data = JSON.stringify(submissions);
    return this.httpClient
                .post<Programs>(this.serverService.getApi("course"), data)
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

    return throwError(
      'Something bad happened; please try again later.');
  }

}
