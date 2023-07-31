import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../shared/models/user";
import {confirmPasswordValidator} from "../shared/directives/confirm-password.directive";
import {UsersService} from "../shared/services/api/users.service";

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

  }

  onSubmit() {
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
  }): User {
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

    return {
      firstName: form.fName,
      lastName: form.lName,
      email: form.email,
      password: form.password,
      phone: form.phone,
      city: form.city,
      about: form.about,
      gender: form.gender
    };
  }

  makeAPICall(user: User) {
    this.userService.addUser(user).subscribe((user: User) => {
      console.log('user added successfully', user);
      this.resetForm();
    });
  }

  resetForm(): void {
    this.signupForm.reset();
  }
}
