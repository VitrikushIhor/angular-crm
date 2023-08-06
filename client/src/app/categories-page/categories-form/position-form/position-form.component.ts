import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PositionService} from '../../../shared/services/position.service';
import {Position} from '../../../shared/interface';
import {materialInstance, MaterialServices} from '../../../shared/error/material.services';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-position-form',
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.scss'],
})
export class PositionFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('categoryId') categoryId!: string
  @ViewChild('modal') modalRef!: ElementRef
  positios: Position[] = []
  loading = false
  modal!: materialInstance
  form: FormGroup
  positionId: null | string | undefined = null

  constructor(private positionService: PositionService) {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(1, [Validators.required, Validators.min(1)]),
    })
  }

  ngOnInit(): void {
    this.loading = true
    this.positionService.fetch(this.categoryId).subscribe(positions => {
      this.positios = positions
      this.loading = false
    })
  }

  ngAfterViewInit(): void {
    this.modal = MaterialServices.initModal(this.modalRef)
  }

  ngOnDestroy(): void {
    if (this.modal.destroy) {
      this.modal.destroy()
    }
  }

  onSelectPosition(position: Position) {
    this.positionId = position._id
    this.form.patchValue({
      name: position.name,
      cost: position.cost,
    })

    MaterialServices.updateTextInputs()

    if (this.modal.open) {
      this.modal.open()
    }
  }

  onAddPosition() {
    this.positionId = null
    this.form.reset({
      name: null,
      cost: 1,
    })

    MaterialServices.updateTextInputs()

    if (this.modal.open) {
      this.modal.open()
    }

  }

  onCancel() {
    if (this.modal.close) {
      this.modal.close()
    }
  }


  completed() {
    if (this.modal.close) {
      this.modal.close()
    }
    this.form.reset({name: '', cost: 1})
    this.form.enable()
  }

  onSubmit() {

    this.form.disable()

    const newPosition: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId,
    }

    if (this.positionId) {
      newPosition._id = this.positionId
      this.positionService.update(newPosition).subscribe(
        pos => {
          const index = this.positios.findIndex(p => p._id === pos._id)
          this.positios[index] = pos
          MaterialServices.toast('Changes was saved')
        }, err => {
          this.form.enable()
          MaterialServices.toast(err.error.message)
        }, () => {
          this.completed()
        },
      )
    } else {
      this.positionService.create(newPosition).subscribe(
        pos => {
          MaterialServices.toast('Position was created')
          this.positios.push(pos)
        }, err => {
          this.form.enable()
          MaterialServices.toast(err.error.message)
        }, () => {
          this.completed()

        },
      )
    }


  }

  onDeletePosition(event: Event, position: Position) {
    event.stopPropagation()
    const confirm = window.confirm(`You shure about delete Position ${position.name}?`)
    if (confirm) {
      this.positionService.delete(position).subscribe(
        response => {
          const index = this.positios.findIndex(p => p._id === position._id)
          this.positios.splice(index, 1)
          MaterialServices.toast(response.message)
        },
        e => {
          MaterialServices.toast(e.error.message)
        },
      )
    }
  }
}
