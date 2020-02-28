import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Article, Blog, ArticleComment, ArticleRates } from './blog';
import { Observable, throwError } from 'rxjs';
import { ServerService } from './server.service';
import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  httpOptions: { headers: HttpHeaders; };
  

  constructor(private httpClient: HttpClient, private serverService: ServerService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
   }

  postArticle(article: Article): Observable<Article>{
    // this.httpOptions.headers.set('Authorization', this.serverService.serverToken);
    return this.httpClient.post<Article>(this.serverService.getApi("post_article"), JSON.stringify(article), this.httpOptions)
                          .pipe(
                            tap((newHero: Article) => console.log(`added article w/ id=${newHero.blogger}`)),
                            retry(3),
                            catchError(this.handleError)
                          )
  }

  getArticles(): Observable<Blog>{
    return this.httpClient.get<Blog>(this.serverService.getApi("articles"))
                          .pipe(
                            retry(3),
                            catchError(this.handleError)
                          );
  }

  getArticle(articleId: string): Observable<Article>{
    return this.httpClient.post<Article>(this.serverService.getApi("get_article"), articleId)
                          .pipe(
                            retry(3),
                            catchError(this.handleError)
                          );
  }

  
  likeArticle(articleId: string): Observable<ArticleRates>{
    return this.httpClient.post<ArticleRates>(this.serverService.getApi("like_article"), articleId)
                          .pipe(
                            retry(3),
                            catchError(this.handleError)
                          );
  }

  dislikeArticle(articleId: string): Observable<ArticleRates>{
    return this.httpClient.post<ArticleRates>(this.serverService.getApi("dislike_article"), articleId)
                          .pipe(
                            retry(3),
                            catchError(this.handleError)
                          );
  }

  commentArticle(comment: ArticleComment): Observable<ArticleComment[]>{
    return this.httpClient.post<ArticleComment[]>(this.serverService.getApi("comment_article"), comment, this.httpOptions)
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
