import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Title } from '@angular/platform-browser';
import { Article } from '../blog';
import { BlogService } from '../blog.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post-article',
  templateUrl: './post-article.component.html',
  styleUrls: ['./post-article.component.css']
})
export class PostArticleComponent implements OnInit {

  postArticleFormGroup: FormGroup = this.formBuilder.group({
    title: ["",  RxwebValidators.required()],
    body: ["", RxwebValidators.required()],
    comments: [""],
    articleLink: ["" ] //RxwebValidators.url()
  });

  article: Article;


  constructor(private formBuilder: FormBuilder, private location: Location, private titleService: Title, private blogService: BlogService) {

   }

  
  postArticle(): void{
    if(this.postArticleFormGroup.valid){
      this.article = this.postArticleFormGroup.value as Article;
      console.log("Article to be posted => " +  this.article)
      this.blogService.postArticle(this.article)
                      .subscribe((data: Article) => 
                        {console.log("Article successfully posted => " + data)},
                        error => {console.log(error)}
                        )
    }

  }
  

  ngOnInit() {
    this.titleService.setTitle("Post Article | Career Track")
  }

  goBack(): void {
    this.location.back();
  }

}
