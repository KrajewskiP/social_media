import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../helpers/PasswordMatcherHelper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  registerForm: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required],
    color: ['', Validators.required]
  }, {
    validators: MustMatch('password', 'confirmPassword')
  });

  get form() {
    return this.registerForm.controls;
  }

  register() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    console.log("submitted");
    this.registerForm.reset();
    // add user
  }

  resetForm() {
    console.log("resetting");
    this.registerForm.reset();
    this.submitted = false;
  }
}
