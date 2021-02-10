import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    repeatPassword: new FormControl(),
    plans: new FormControl()
  });
  selectedPlan: any;
  hide = true;
  repeatHide = true;

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.router.navigate(['/']);
  }

}
