import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private formBuilder: FormBuilder) { }

  get form() { return this.loginForm.controls; }
  
  ngOnInit(): void {
    if (this.authService.isLogged()) {
      this.router.navigate(['/home']);
    }
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.form.username.value, this.form.password.value)
      // .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(["/home"]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}
