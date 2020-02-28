import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserLogin, User } from '../user';
import { UserService } from '../user.service';
import { AuthenticationService } from '../auth.service';

export interface loading{value: false};

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  public loading: boolean;
  public logIn: UserLogin;
  public signUp: User;
  public user: User;

  constructor(public dialog: MatDialog, public authService: AuthenticationService, public userService: UserService) {  
    this.loading = false;
    this.logIn = null;
    this.signUp = null;
  }

  openDialog() {
    const signupDialog =  this.dialog.open(SignUpComponent);
    let signUpSuccess: boolean = false;


    signupDialog.afterClosed().subscribe(result => {
      if( result === undefined){
        console.log("user closed dialog");
      }
      else if (result === true){
        this.openLogInDialog();  
      }
      else{

        try {
          this.signUp = result.value as User;
          console.log(JSON.stringify(this.signUp)); 
          this.userService.addUser(this.signUp)
                          .subscribe((data: User) => {
                                        console.log(data),
                                        this.logIn = data as UserLogin,
                                        signUpSuccess = true;
                                      },
                                      error => {console.log(error)}
                                      );  
          if(signUpSuccess){
            this.authService.signIn(this.logIn);
          }
        } catch (error) {
          alert("an error occured");
          console.log(error);
        }

      }
    
    });
  }

  openLogInDialog() {
    const logInDialog =  this.dialog.open(LoginComponent);
    let signInSuccess: boolean = false;

    logInDialog.afterClosed().subscribe(result => {
      if( result === undefined){
        console.log("user closed dialog");
      }
      else{
        try{
          this.logIn = result.value as UserLogin;
          console.log( JSON.stringify(this.logIn));
          signInSuccess = this.authService.signIn(this.logIn);

          if(signInSuccess){
            this.user = this.userService.user;
          }
        }
        catch (error){

        }

      }
    });
  }

  
  ngOnInit() {
    
  }



}


@Component({
  selector: 'app-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./navbar.component.css'],
})
export class SignUpComponent  implements OnInit {

  public signUpForm: FormGroup = this.formBuilder.group({
    firstName: [""],
    lastName: [""],
    email: [""],
    password: [""],
    confirmPassword: [""]
  });
  login: boolean;

  constructor(
    public dialogRef: MatDialogRef<SignUpComponent>,
    public loginDialog: MatDialog,
    private formBuilder: FormBuilder
    ) { this.login = true; }

  ngOnInit() {
  }

  close(): void{
    this.dialogRef.close();
  }

  // submit(): void{
  //   // this.loading = true;
  // }

  // toggleTologin(): void{
  //   this.close();
  //   // setTimeout(() => this.loginDialog.open(LoginComponent), 2500);
  //    this.loginDialog.open(LoginComponent);
  // }

}


@Component({
  selector: 'app-login',
  templateUrl: 'login.html',
  styleUrls: ['./navbar.component.css'],
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup = this.formBuilder.group({
    email: [""],
    password: [""]
  });
  public loginLoading: boolean;

  constructor(public dialogRef: MatDialogRef<LoginComponent>, 
    private formBuilder: FormBuilder) {
      this.loginLoading = false;
     }

  ngOnInit() {
  }

  close(): void{
    this.dialogRef.close();
  }

  // submit(): void{
  //   this.loginLoading = true;
  // }
}