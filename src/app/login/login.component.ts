import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });
  hidePassword = true;

  constructor(private readonly router: Router,
              private readonly snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.router.navigate(['/'])
      .then(() => {
        this.snackbar.open('Welcome to Remore!', 'ok', {
          duration: 2500
        });
      });
  }

  openSnackBar(message: string) {}
}
