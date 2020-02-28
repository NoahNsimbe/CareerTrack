import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Article, Blog } from '../blog';
import { catchError } from 'rxjs/operators';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  articles: Article[];
  error: string;
  

  constructor(
    private titleService: Title, 
    private blogService: BlogService ) 
    { }

  ngOnInit() {
    this.titleService.setTitle("Blog | Career Track");
  }

  loadArticles(){

    this.blogService.getArticles()
                      .subscribe(
                        // (data: Blog) => this.articles = {...data},
                        (data: Blog) => {this.articles = data.articles},
                        error => {this.error = error, console.log(error)},
                         );
    console.log(this.articles);

  }

  



}
