import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/services/auth.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {MaterialServices} from '../shared/error/material.services';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  aSub!: Subscription

  constructor(private authService: AuthService, private router: Router
    , private activateRoute: ActivatedRoute) {
    this.form = new FormGroup<any>({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
    this.activateRoute.queryParams.subscribe((params) => {
      if (params['registered']) {
        MaterialServices.toast('You can enter the sistem')
      } else if (params['accessDenied']) {
        MaterialServices.toast('You need auth in the sistem')
      } else if (params['sessionFailed']) {
        MaterialServices.toast('Please auth in the sistem again')
      }
    })
  }

  onSubmit() {
    this.form.disable()

    const user = {
      email: this.form.value.email,
      password: this.form.value.email,
    }
    this.aSub = this.authService.login(user).subscribe(
      () => {
        this.router.navigate(['/overview'])
      },
      (error) => {
        MaterialServices.toast(error.error.message)
        this.form.enabled

      })
  }
}
