import { Injectable } from '@angular/core';
import { FacebookLoginProvider, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { AuthService} from "angularx-social-login"
import { ServerService } from './server.service';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UserLogin } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService { 

  public signedIn: boolean;
  public socialSignedIn: boolean;
  private socialPlatformProvider: string;
  public socialUser: SocialUser;

  constructor(public authService: AuthService, public serverService: ServerService) {
    this.signedIn = false;
    this.socialSignedIn = false;
    this.socialPlatformProvider = "";
    this.socialUser = new SocialUser;
  }

  public socialSignIn(socialProvider: string): void{
    
    
    if(socialProvider === "facebook"){
      this.socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }
    else if(socialProvider === "google"){
      this.socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.authService.signIn(this.socialPlatformProvider)
                    .then(socialUser => {
                      this.socialUser = socialUser;
                      this.socialSignedIn = (socialUser != null);
                      }).catch((errors: HttpErrorResponse) => this.logError(errors));

    if(this.socialSignedIn){
      this.signedIn = this.serverService.logIn({'userName': this.socialUser.id, 'password': this.socialUser.idToken});
    }

  }

  public socialSignOut(): void{
    this.authService.signOut().then(() => {
    //  debugger;
      this.signedIn = false;
      this.serverService.logOut();
      this.socialUser = null;
      
    });
  }

  public signIn(user: UserLogin): boolean{
// update user service details

    this.signedIn = this.serverService.logIn(user);
    if(this.signedIn){
    //  this.userService.loadUser(user);
    }

    return  this.signedIn;

  }

  public signOut(): void{
     
  }
  public logError(error: HttpErrorResponse){

  if (error.error instanceof ErrorEvent) {
    console.error('An error occurred:', error.error.message);

  } else {
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }

  return throwError('Something bad happened; please try again later.');
  }





}
