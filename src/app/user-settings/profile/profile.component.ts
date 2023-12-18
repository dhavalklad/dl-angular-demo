import {Component, Injector, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../shared/services/api/users.service";
import {userUniqueEmailValidator} from "../../shared/validators/user-unique-email.validator";

@Component({
  selector: 'app-user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfileForm!: FormGroup<{
    fName: FormControl<null | string>,
    lName: FormControl<null | string>,
    email: FormControl<null | string>,
  }>;


  constructor(
    private userService: UsersService
  ) {
  }


  ngOnInit(): void {
    this.initializeForm();
    this.userService.myProfile().subscribe({
      next: (user) => {
        this.userProfileForm.patchValue({
          fName: user.firstName,
          lName: user.lastName,
          email: user.email
        });
        // verify below logic
        this.userProfileForm.get('email')?.setAsyncValidators(userUniqueEmailValidator(this.userService, user.id));
      }
    });
  }

  initializeForm() {
    this.userProfileForm = new FormGroup({
      fName: new FormControl<string | null>(null, [Validators.required]),
      lName: new FormControl<string | null>(null, [Validators.required]),
      email: new FormControl<string | null>(null, {validators: [Validators.required, Validators.email]}),
    });
  }

  onUpdate() {

  }
}
