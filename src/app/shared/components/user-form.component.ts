import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {confirmPasswordValidator} from "../directives/confirm-password.directive";
import {User} from "../models/user";

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    // styleUrls: ['./user.component.css']
})
export class UserFormComponent implements OnInit, OnChanges {

    @Input({required: false}) user?: User;
    @Output() formSubmitted: EventEmitter<User> = new EventEmitter<User>();

    genders: string[] = ["male", "female", "other"];

    // hobbies = [{label: "sports"}, {label: "reading"}, {label: "travelling"}, {label: "etc."}];

    cities: string[] = ["St Catharine's", "Niagara", "Welland", "Hamilton"];

    signupForm!: FormGroup;

    ngOnInit(): void {
        console.log('child user', this.user);
        this.initializeForm();
    }


    initializeForm() {
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
        this.formSubmitted.emit(this.mapUser(this.signupForm.value));
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

    ngOnChanges(changes: SimpleChanges): void {
        console.log('change: ', changes['user'].firstChange, changes['user'].currentValue);
        if (changes['user']) {
            console.log('patch change: ', {...changes['user'].currentValue});

            this.fillUserForm({...changes['user'].currentValue});
        }
    }

    fillUserForm(user: User) {
      // let patient={};
      // let p1=Object.assign();
        this.signupForm?.patchValue({
            fName: user.firstName,
            lName: user.lastName,
            email: user.email,
            phone: user.phone,
            city: user.city,
            about: user.about,
            gender: user.gender,
        });
    }

    onReset() {
        this.signupForm.reset();
    }

}
