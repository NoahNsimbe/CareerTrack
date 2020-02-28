import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { UaceSubjects, Programs } from './uace';
import { Careers } from './careers';
import { UceSubjects, Combinations } from './uce';
import { UserLogin } from './user';


const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': null,
    })
}

// https://stackoverflow.com/questions/54041525/typescript-assign-a-readonly-attribute-in-a-function-inside-the-constructor
// type Mutable<T> = {
//   -readonly [P in keyof T]: T[P];
// };

// export interface urls{
//   programsUrl: string;
//   combinationsUrl: string;
//   uceSubjectsUrl: string;
//   uaceSubjectsUrl: string;
//   articleUrl: string;
//   careersUrl: string;
// }


@Injectable({
  providedIn: 'root'
})
export class ServerService{


  // public articleUrl = "api/articles";
  // public readonly articleUrl : string;
  // public readonly careersUrl = "api/careers";
  // public readonly uaceSubjectsUrl = "api/uace_subjects";
  // public readonly uceSubjectsUrl = "api/uce_subjects";
  // public readonly combinationsUrl = "api/recom_combinations";
  // public readonly programsUrl = "api/recom_programs";

  // private apiUrls: urls;
  public readonly getArticleUrl : string;
  public readonly getArticlesUrl : string;
  public readonly careersUrl : string;
  public readonly uaceSubjectsUrl : string;
  public readonly uceSubjectsUrl : string;
  public readonly combinationsUrl : string;
  public readonly programsUrl : string;
  public readonly userDetailsUrl : string;
  public readonly updateUserUrl : string;
  public readonly addUserUrl : string;
  public readonly userLogInUrl : string;
  public readonly postArticleUrl : string;
  public readonly serverApi : string;

  
  private httpOptions: any;
  public serverToken: string;
  public userName: string;
  public tokenValidity: Date;
  private readonly apiUrlsFile = 'assets/urls.json';


  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    // this.getUrls().subscribe(
    //               (data: urls) => 
    //               {this.apiUrls = data, console.log("urls : " + data), 
    //               (this as Mutable<ServerService>).careersUrl = data.careersUrl,
    //               (this as Mutable<ServerService>).articleUrl = data.articleUrl,
    //               (this as Mutable<ServerService>).combinationsUrl = data.combinationsUrl,
    //               (this as Mutable<ServerService>).uaceSubjectsUrl = data.uaceSubjectsUrl,
    //               (this as Mutable<ServerService>).uceSubjectsUrl = data.uceSubjectsUrl,
    //               (this as Mutable<ServerService>).programsUrl = data.programsUrl},
    //               _error => {console.log("error occured"), 
    //                         this.apiUrls = {} as urls});

    this.getArticlesUrl = "api/articles";
    this.careersUrl = null;
    this.combinationsUrl = "api/recom_combinations";
    this.uaceSubjectsUrl = "api/uace_subjects";
    this.uceSubjectsUrl = "api/uce_subjects";
    // this.uaceSubjectsUrl = "http://127.0.0.1:8000/uace_subjects";
    // this.uceSubjectsUrl = "http://127.0.0.1:8000/uce_subjects";
    this.programsUrl = "api/recom_programs";
    this.postArticleUrl = "api/post_article";
    this.serverApi = "api/"
   // this.serverApi = "http://127.0.0.1:8000/"

   }

  // private getUrls(): Observable<urls>{
  //   return this.httpClient.get<urls>(this.apiUrlsFile)
  //                 // .pipe(catchError(this.handleError), map((response:any) => response.json()))
  //                 .pipe(
  //                   retry(3),
  //                   catchError(this.handleError)
  //           );

  // }



  getHeroes(): Observable<Careers[]>{
    return this.httpClient.get<Careers[]>(this.careersUrl)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getUaceSubjects(): Observable<UaceSubjects>{
    return this.httpClient.get<UaceSubjects>(this.uaceSubjectsUrl).pipe(
      catchError(this.handleError)
    );
  }

  getUceSubjects(): Observable<UceSubjects>{
    return this.httpClient.get<UceSubjects>(this.uceSubjectsUrl).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getCareers(): Observable<Careers>{
    return this.httpClient
              .get<Careers>(this.careersUrl)
              .pipe(retry(3),catchError(this.handleError));

  }

  getCombinations(): Observable<Combinations>{
    return this.httpClient
                .get<Combinations>(this.combinationsUrl)
                .pipe(retry(3),catchError(this.handleError));
  }

  getPrograms(): Observable<Programs>{
    return this.httpClient
                .get<Programs>(this.programsUrl)
                .pipe(retry(3),catchError(this.handleError));
  }

  getApi(request: string): string{
    return this.serverApi + request;
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

  // getUaceSubjects(): Observable<UaceSubjects> {
  //   return this.httpClient.get<UaceSubjects>(this.uaceSubjectsUrl)
  //                         .pipe(
  //                           retry(3),
  //                           catchError(this.handleError),
                            
  //                         );
  // }

  // getUaceSubjects(){
  //   return this.httpClient.get<UaceSubjects>(this.uaceSubjectsUrl);
  // }

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
