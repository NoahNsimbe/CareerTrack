import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { UserLogin } from './user';
import { Urls } from './main'

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': null,
    })
}

@Injectable({
  providedIn: 'root'
})
export class ServerService{


  public readonly userDetailsUrl : string;
  public readonly updateUserUrl : string;
  public readonly addUserUrl : string;
  public readonly userLogInUrl : string;
  private serverApi : string;
  //private urls: Urls;


  private httpOptions: any;
  public serverToken: string;
  public userName: string;
  public tokenValidity: Date;
 // private apiUrlsFile = JSON.parse('assets/urls.json');


  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    this.serverApi = "http://127.0.0.1:8000/";

   }

  getApi(request: string): string{
    //this.urls = this.apiUrlsFile

    //console.log(this.apiUrlsFile)
    //console.log(this.urls.serverUrl)
    return this.serverApi + request + "/";
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


  saveUser(details: any): Observable<any>{
    httpOptions.headers.set('Authorization', 'JWT' + this.serverToken);
    return this.httpClient.post('', details, httpOptions)
                          .pipe(
                            retry(3),
                            catchError(this.handleError)
                          );
  }

  public logIn(user: UserLogin): boolean{

    let response: boolean = false;

    this.httpClient.post(this.userLogInUrl, JSON.stringify(user), this.httpOptions)
                   .subscribe(
                     data => {
                       this.updateData(data['token']),
                       response = true;
                      },
                     catchError(this.handleError)
                     );
    return response
  }

  private updateData(token: string): void{
    this.serverToken = token;

    const tokenParts = this.serverToken.split(/\./);
    const tokenDecoded = JSON.parse(window.atob(tokenParts[1]));
    this.tokenValidity = new Date(tokenDecoded.exp * 1000);
    this.userName = tokenDecoded.username;

  }

  public refreshToken(): void{
    this.httpClient.post('', JSON.stringify({token: this.serverToken}), this.httpOptions)
                   .subscribe(
                     data => {this.updateData(data['token'])},
                     catchError(this.handleError)
                     );

  }

  public logOut(): void{
    this.serverToken = null;
    this.tokenValidity = null;
    this.userName = null;
  }

}
