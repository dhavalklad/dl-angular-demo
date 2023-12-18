import {
  Component, Injector,
  OnInit
} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {confirmPasswordValidator} from "../../shared/directives/confirm-password.directive";
import {userUniqueEmailValidator} from "../../shared/validators/user-unique-email.validator";
import {AuthService} from "../../shared/services/api/auth.service";
import {UsersService} from "../../shared/services/api/users.service";
import {User} from "../../shared/models/user";
import {Router} from "@angular/router";
import {tap} from "rxjs";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {

  errorMessage?: string | null;
  showSpinner: boolean = false;

  registrationForm!: FormGroup<{
    fName: FormControl<string | null>,
    lName: FormControl<string | null>,
    email: FormControl<string | null>,
    password: FormControl<string | null>,
    confirmPassword: FormControl<string | null>,
  }>;

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.initializeForm();

  }

  initializeForm() {
    this.registrationForm = new FormGroup({
      fName: new FormControl<string | null>(null, [Validators.required]),
      lName: new FormControl<string | null>(null, [Validators.required]),
      email: new FormControl<string | null>(null, [Validators.required, Validators.email], [userUniqueEmailValidator(this.userService)]),
      password: new FormControl<string | null>(null, [Validators.required, Validators.minLength(5)]),
      confirmPassword: new FormControl<string | null>(null, [Validators.required, Validators.minLength(5)]),
    }, {validators: confirmPasswordValidator});
  }

  onSubmit() {
    if (!this.registrationForm.valid) {
      return;
    }
    this.showSpinner = true;
    const user: User = {
      firstName: this.registrationForm.value.fName as string,
      lastName: this.registrationForm.value.lName as string,
      email: this.registrationForm.value.email as string,
      password: this.registrationForm.value.password as string,
      confirmPassword: this.registrationForm.value.confirmPassword as string
    };
    // make API call to register user
    this.authService.registerUser(user).pipe(
      tap({
        subscribe: () => {
          this.showSpinner = true
        },
        finalize: () => {
          this.showSpinner = false
        }
      }),
    ).subscribe({
      next: (data) => {
        this.errorMessage = null;
        this.showSpinner = false;
        this.router.navigate(['/auth']);
      },
      error: (error) => {
        this.showSpinner = false;
        this.errorMessage = error;
      }
    });

  }


}
