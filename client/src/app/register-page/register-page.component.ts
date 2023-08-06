import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MaterialServices} from '../shared/error/material.services';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  form: FormGroup
  authSubscription!: Subscription

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

  onSubmit() {
    this.form.disable()
    this.authSubscription = this.authService.register(this.form.value).subscribe(() => {
      this.router.navigate(['/login'], {
        queryParams: {
          registered: true,
        },
      })
    }, (error) => {
      MaterialServices.toast(error.error.message)
    })
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe()
    }
  }
}
