import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public loading = false;

  profileForm: FormGroup = this.formBuilder.group({
    firstName: [""],
    lastName: [""],
    userName:[""],
    profession:[""],
    educationLevel:[""],
    edicationLevel:[""],
    password:["", RxwebValidators.password({ validation:{ minLength: 8, digit: true, specialCharacter: true} })],
    newPassword:["", RxwebValidators.password({ validation:{ minLength: 8, digit: true, specialCharacter: true} })],
    confirmPassword:["", RxwebValidators.compare({fieldName: "newPassword"})],
    email:["", RxwebValidators.email()],
    profilePic:["", RxwebValidators.image({maxHeight:100  ,maxWidth:100 })],  
  });

  userForm = this.formBuilder.group({
    Username:['',[ RxwebValidators.compose({
    validators:[
    RxwebValidators.required(),
    RxwebValidators.alpha()
    ]})]]
    });
  

  constructor(private serviceTitle : Title, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.serviceTitle.setTitle("Profile | Career Tarck");
    this.populateProfile();
  }

  login() {
    this.loading = false;
    }

  populateProfile(): void{
    this.profileForm.get("firstName").setValue("Patrick");
    this.profileForm.get("lastName").setValue("Amwine");
    this.profileForm.get("userName").setValue("PatrickAmwine");
    this.profileForm.get("profession").setValue("Student");
    this.profileForm.get("edicationLevel").setValue("UACE");
    this.profileForm.get("email").setValue("patrickamwine@gmail.com");
    this.profileForm.get("profilePic").setValue("");
    this.profileForm.get("password").setValue("");
    this.profileForm.get("confirmPassword").setValue("");
    this.profileForm.get("newPassword").setValue("");

  }

}
