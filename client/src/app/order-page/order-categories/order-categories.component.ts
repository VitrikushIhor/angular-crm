import {Component, OnInit} from '@angular/core';
import {CategoriesService} from '../../shared/services/categories.service';
import {Observable} from 'rxjs';
import {Category} from '../../shared/interface';

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.scss'],
})
export class OrderCategoriesComponent implements OnInit {
  categoies$!: Observable<Category[]>

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit(): void {
    this.categoies$ = this.categoriesService.fetch()
  }

}
