import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoriesService} from '../../shared/services/categories.service';
import {of, switchMap} from 'rxjs';
import {MaterialServices} from '../../shared/error/material.services';
import {Category} from '../../shared/interface';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss'],
})
export class CategoriesFormComponent implements OnInit {
  isNew = true
  form: FormGroup
  image!: File
  imagePreview: any = ''
  category!: Category
  @ViewChild('input') inputRef!: ElementRef

  constructor(private activatedRoute: ActivatedRoute,
              private categoriesService: CategoriesService,
              private router: Router) {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
    })
  }

  ngOnInit() {
    this.form.disable()

    this.activatedRoute.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              this.isNew = false
              return this.categoriesService.getById(params['id'])
            }

            return of(null)
          },
        ),
      )
      .subscribe(
        category => {
          if (category) {
            this.category = category
            this.form.patchValue({
              name: category.name,
            })
            this.imagePreview = category.imageSrc
            MaterialServices.updateTextInputs()
          }

          this.form.enable()
        },
        error => MaterialServices.toast(error.error.message),
      )
  }

  onSubmit() {
    let obs$
    this.form.disable()
    if (this.isNew) {
      obs$ = this.categoriesService.create(this.form.value.name, this.image)
    } else {
      obs$ = this.categoriesService.update(this.category._id, this.form.value.name, this.image)

    }

    obs$.subscribe(
      category => {
        MaterialServices.toast('Edit Saved')
        this.form.enable()
      },
      e => {
        MaterialServices.toast(e.error.message)
        this.form.enable()
      },
    )
  }

  triggerClick() {
    this.inputRef.nativeElement.click()
  }

  onFileUpload(event: any) {
    const file = event.target.files[0]
    this.image = file
    const reader = new FileReader()
    reader.onload = () => {
      this.imagePreview = reader.result
    }
    reader.readAsDataURL(file)
  }

  deleteCategory() {
    const decision = window.confirm(`you sure about delete category ${this.category.name}?`)
    if (decision) {
      this.categoriesService.delete(this.category._id).subscribe(
        res => {
          MaterialServices.toast(res.message)
        }, e => {
          MaterialServices.toast(e.error.message)
        }, () => {
          this.router.navigate(['/categories'])
        },
      )
    }
  }
}
