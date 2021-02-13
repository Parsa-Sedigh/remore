import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    repeatPassword: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    plans: new FormControl()
  });
  selectedPlan: any;
  hide = true;
  repeatHide = true;
  errors = {
    isEmailFieldEmpty: false,
    isPasswordFieldEmpty: false,
    isEmailPattern: true,
    isRepeatPasswordCorrect: false
  };

  constructor(private readonly router: Router,
              private readonly snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  get emailField(): AbstractControl {
    return this.registerForm.controls.email;
  }
  get passwordField(): AbstractControl {
    return this.registerForm.controls.password;
  }
  get repeatPasswordField(): AbstractControl {
    return this.registerForm.controls.repeatPassword;
  }
  get plansField(): AbstractControl {
    return this.registerForm.controls.plans;
  }

  // matchPasswords(): ValidatorFn {
  //   return (formGroup: FormGroup) => {
  //     const password = formGroup.controls.password.value;
  //     const repeatPassword = formGroup.controls.repeatPassword.value;
  //     if (password === repeatPassword) {
  //       return null;
  //     }
  //
  //     if (password !== repeatPassword) {
  //       formGroup.controls.password.setErrors({password: true});
  //       formGroup.controls.repeatPassword.setErrors({password: true});
  //       return {mismatch: true};
  //     }
  //   };
  // }

  onSubmit(): void {
    if (this.registerForm.status === 'VALID') {
      this.router.navigate(['/'])
        .then(() => {
          this.snackbar.open('Welcome to Remore!', 'close', {
            duration: 2500
          });
        });
    } else {
      if (this.registerForm.controls.email.errors) {
        console.log(this.registerForm);
        if (this.emailField.errors?.required) {
          this.errors.isEmailFieldEmpty = true;
        } else if (this.emailField.errors?.email) {
          this.errors.isEmailPattern = false;
        }
      }
      if (this.registerForm.controls.password.errors) {
        if (this.registerForm.controls.password.errors.required) {
          this.errors.isPasswordFieldEmpty = true;
        }
      }
      if (this.passwordField.value !== null && this.repeatPasswordField.value !== null &&
        this.passwordField.value !== this.repeatPasswordField.value) {
        this.errors.isRepeatPasswordCorrect = false;
      }
    }
  }

}
