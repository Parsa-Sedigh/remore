import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  });
  hidePassword = true;
  errors = {
    isEmailFieldEmpty: false,
    isPasswordFieldEmpty: false,
    isEmailPattern: true
  };

  constructor(private readonly router: Router,
              private readonly snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.loginForm);
    if (this.loginForm.status === 'VALID') {
      console.log(this.loginForm);
      this.router.navigate(['/dashboard'])
        .then(() => {
          this.snackbar.open('Welcome to Remore!', 'ok', {
            duration: 2500
          });
        });
    } else {
      if (this.loginForm.controls.email.errors) {
        if (this.loginForm.controls.email.errors.required) {
          this.errors.isEmailFieldEmpty = true;
        } else if (this.loginForm.controls.email.errors.email) {
          this.errors.isEmailPattern = false;
        }
      }
      if (this.loginForm.controls.password.errors) {
        if (this.loginForm.controls.password.errors.required) {
          this.errors.isPasswordFieldEmpty = true;
        }
      }
    }

  }

  openSnackBar(message: string) {}
}
