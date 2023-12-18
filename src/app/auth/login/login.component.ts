import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/api/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  errorMessage?: string;

  showSpinner: boolean = false;

  // provide form group type to strict the type of form control
  loginForm!: FormGroup<{
    email: FormControl<string | null>,
    password: FormControl<string>
  }>;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = new FormGroup({
      email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(5)],
        nonNullable: true
      }),
    });
  }

  onReset() {
    this.loginForm.reset();
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    this.showSpinner = true;
    // type casting
    const email = <string>this.loginForm.value.email;
    const password = this.loginForm.value.password as string;
    //call signUp method
    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log('login token: ', response.token);
        this.errorMessage = undefined;
        this.loginForm.reset();
        this.showSpinner = false;
        this.router.navigate(['/users']);
      },
      error: (error) => {
        console.log('component error: ', error);
        this.showSpinner = false;
        this.errorMessage = error;
        this.loginForm.reset();
      }
    });
    console.log(this.loginForm.value);

  }
}
