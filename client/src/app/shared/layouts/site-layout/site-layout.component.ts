import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {MaterialServices} from '../../error/material.services';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss'],
})
export class SiteLayoutComponent implements AfterViewInit {
  @ViewChild('floating') floatingRef!: ElementRef

  constructor(private authService: AuthService, private router: Router) {
  }


  links = [
    {url: '/overview', name: 'Обзор'},
    {url: '/analytics', name: 'Аналитика'},
    {url: '/history', name: 'История'},
    {url: '/order', name: 'Добавить заказ'},
    {url: '/categories', name: 'Ассортимент'},
  ]

  logout(event: Event) {
    event.preventDefault()
    this.authService.logout()
    this.router.navigate(['/login'])
  }

  ngAfterViewInit(): void {
    MaterialServices.initialLizeFloatingButton(this.floatingRef)
  }
}
