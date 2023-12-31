import {Component, OnInit} from '@angular/core';
import {CategoriesService} from '../shared/services/categories.service';
import {Category} from '../shared/interface';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss'],
})
export class CategoriesPageComponent implements OnInit {

  categories$!: Observable<Category[]>

  constructor(private categoryService: CategoriesService) {
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.fetch()
  }

}
