import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, RequiredValidator, ValidationErrors, Validators} from "@angular/forms";
import {User} from "../user";
import {confirmPasswordValidator} from "../shared/confirm-password.directive";
import {UsersService} from "../shared/users.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  genders: string[] = ["male", "female", "other"];

  // hobbies = [{label: "sports"}, {label: "reading"}, {label: "travelling"}, {label: "etc."}];

  cities: string[] = ["St Catharine's", "Niagara", "Welland", "Hamilton"];

  signupForm!: FormGroup;

  constructor(private userService: UsersService) {
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      fName: new FormControl(null, [Validators.required]),
      lName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      confirmPassword: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      about: new FormControl(null),
      gender: new FormControl(null, [Validators.required]),
    }, {validators: confirmPasswordValidator});

    console.log('signup form is: ', this.signupForm);
  }

  onSubmit() {
    // console.log(this.signupForm.value);
    // return;
    this.makeAPICall(this.mapUser(this.signupForm.value));
  }

  mapUser(form: {
    fName: string,
    lName: string,
    email: string,
    phone: number,
    password: string,
    confirmPassword: string,
    city: string,
    about: string,
    gender: string
  }) {
    // destructuring
    // const {
    //   firstName,
    //   lastName,
    //   email,
    //   password,
    //   phone,
    //   city,
    //   about,
    //   gender
    // } = form.value;

    const user: User = {
      firstName: form.fName,
      lastName: form.lName,
      email: form.email,
      password: form.password,
      phone: form.phone,
      city: form.city,
      about: form.about,
      gender: form.gender
    };
    return user;
  }

  makeAPICall(user: User) {
    this.userService.addUser(user).subscribe((user: User) => {
      console.log('user added successfully', user);
      this.resetForm();
    });
    // console.log('user', user);
  }

  resetForm(): void {
    this.signupForm.reset();
  }
}
