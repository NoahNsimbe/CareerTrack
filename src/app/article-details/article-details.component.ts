import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Article, ArticleComment, ArticleRates } from '../blog';
import { ServerService } from '../server.service';
import { BlogService } from '../blog.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../auth.service';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {
  article: Article;
  error: any;
  comment: ArticleComment;
  user: User;

  constructor(private authService: AuthenticationService, private formBuilder: FormBuilder,
               private blogService: BlogService, private route:ActivatedRoute, private userService: UserService) { }

  articleCommentForm: FormGroup = this.formBuilder.group({
    comment: ["", [RxwebValidators.compose({
                  validators:[RxwebValidators.required(), RxwebValidators.maxLength({value:300 }) ]}) ]
              ] //, RxwebValidators.maxLength({value:10 })
  });

  ngOnInit() {
    // this.activatedroute.data.subscribe(data => {console.log(data)});
    this.getArticle();
  }

  postComment(articleId: string): void{    

    if(this.articleCommentForm.valid){

      this.comment.body = this.articleCommentForm.get("comment").value;
      this.comment.date = new Date();
      this.comment.articleId = articleId;

      if(this.authService.signedIn){
         this.user = this.userService.user;
         this.comment.person = this.user.firstName + " " + this.user.lastName;
      }
      else{
        this.comment.person = "Anonymous";
      }

      this.blogService.commentArticle(this.comment)
                      .subscribe((data: ArticleComment[]) => 
                      {console.log(data)},
                      error => {console.log(error)});
    }

  }

  likeArticle(articleId: string): void{
    this.blogService.likeArticle(articleId)
                    .subscribe((data: ArticleRates) => 
                    {console.log(data)},
                    error => {console.log(error)});
  }

  dislikeArticle(articleId: string): void{
    this.blogService.dislikeArticle(articleId)
                    .subscribe((data: ArticleRates) => 
                    {console.log(data)},
                    error => {console.log(error)});
  }

  getArticle(){
    const articleId = this.route.snapshot.paramMap.get('articleId');
    this.blogService.getArticle(articleId)
                      .subscribe(
                        (data: Article) => this.article = {...data},
                        error => this.error = error,
                         );

    console.log(this.article);
    console.log(this.error);

  }

}
