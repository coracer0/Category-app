import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private destroy = new Subject<any>();
  hide = true;

  loginForm = this.fb.group({
    username: ['', [
      Validators.email,
      Validators.required,
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(4)
    ]]
  });

  constructor(private authSvc: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.destroy.next({});
    this.destroy.complete();
  }

  onLogin(): void {
    const formValue = this.loginForm.value;

    this.authSvc.logIn(formValue)
      .pipe(takeUntil(this.destroy))
      .subscribe((res) => {
        if (res) {
          this.router.navigate(['']);
        }
      })
  }

  getErrorMessage(field: string): string {
    let message = "";
    const campo = this.loginForm?.get(field);

    if (campo != null) {
      if (campo.errors?.required) {
        message = "Este campo es requerido";
      } else if (campo.errors?.email) {
        message = "El formato no es correcto";
      } else if (campo.errors?.minlength) {
        message = "Los caracteres minimos son 4";
      }
    }
    return message;
  }


}
