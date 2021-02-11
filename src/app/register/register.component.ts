import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';

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

  constructor(private readonly router: Router) {
  }

  ngOnInit(): void {
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

  onSubmit(registerForm: HTMLFormElement): void {
    console.log(registerForm);
    this.router.navigate(['/']);
  }

}
