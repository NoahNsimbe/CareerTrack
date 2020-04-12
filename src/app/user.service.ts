import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User, UserLogin } from './user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions: { headers: HttpHeaders; };
  public user: User;

  constructor(public httpClient: HttpClient, public serverService: ServerService) { 

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

  }

  loadUser(user: UserLogin): void{
    this.httpOptions.headers.set('Authorization', this.serverService.serverToken);
    
    this.httpClient.post<User>(this.serverService.getApi("post_article"), JSON.stringify(user), this.httpOptions)
                            .pipe(
                              retry(3),
                              catchError(this.handleError)
                            )
                            .subscribe((data: User) => {
                              this.user = data;
                            });
  }

  getUserDetails(user: UserLogin): Observable<User>{

      this.httpOptions.headers.set('Authorization', this.serverService.serverToken);
      this.httpOptions.headers.set('Content-Type', 'application/json');
  
      return this.httpClient.post<User>(this.serverService.getApi("post_article"), JSON.stringify(user), this.httpOptions)
                            .pipe(
                              retry(3),
                              catchError(this.handleError)
                            );
  }

  addUser(user: User): Observable<User>{

    this.httpOptions.headers.set('Authorization', this.serverService.serverToken);
    this.httpOptions.headers.set('Content-Type', 'application/json');
    return this.httpClient.post<User>(this.serverService.getApi("post_article"), JSON.stringify(user))
                          .pipe(
                            retry(3),
                            catchError(this.handleError)
                          );
    
  }

  updateUser(user: User): Observable<User>{

    this.httpOptions.headers.set('Authorization', this.serverService.serverToken);
    this.httpOptions.headers.set('Content-Type', 'application/json');

    return this.httpClient.post<User>(this.serverService.getApi("post_article"), JSON.stringify(user), this.httpOptions)
                          .pipe(
                            retry(3),
                            catchError(this.handleError)
                          );
    
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
}
