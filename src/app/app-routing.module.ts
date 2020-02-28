import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BlogComponent } from './blog/blog.component';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { PostArticleComponent } from './post-article/post-article.component';

const routes: Routes = [
  
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'profile', component: ProfileComponent }, //  , data: { title: 'Profile | Career Tarck' }
  { path: 'blog', component: BlogComponent },
  { path: 'recommendations', component: RecommendationsComponent },
  // { path: 'article-details', component: ArticleDetailsComponent , data: { articleId: null } },
  { path: 'article-details/:articleId', component: ArticleDetailsComponent },
  { path: 'post-article', component: PostArticleComponent }, 
  { path: '**', component: PageNotFoundComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
