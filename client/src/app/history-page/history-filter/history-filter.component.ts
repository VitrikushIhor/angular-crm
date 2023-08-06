import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Filter} from '../../shared/interface';
import {MaterialDatepicker, MaterialServices} from '../../shared/error/material.services';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss'],
})
export class HistoryFilterComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() onFilter = new EventEmitter<Filter>()
  @ViewChild('start') startRef!: ElementRef
  @ViewChild('end') endRef!: ElementRef
  order!: number
  start!: MaterialDatepicker
  end!: MaterialDatepicker
  isValid = true

  ngOnInit(): void {
  }

  submitFilter() {
    const filter: Filter = {order: 0}
    if (this.order) {
      filter.order = this.order
    }

    if (this.start.date) {
      filter.start = this.start.date
    }

    if (this.end.date) {
      filter.end = this.end.date
    }


    this.onFilter.emit(filter)
  }

  validate() {
    if (!this.start.date || !this.end.date) {
      this.isValid = true
      return
    }
    this.isValid = this.start.date < this.end.date
  }

  ngAfterViewInit(): void {
    this.start = MaterialServices.initDatepicker(this.startRef, this.validate.bind(this))
    this.end = MaterialServices.initDatepicker(this.endRef, this.validate.bind(this))
  }

  ngOnDestroy(): void {
    if (this.start.destroy) {
      this.start.destroy()
    }
    if (this.end.destroy) {
      this.end.destroy()
    }
  }
}
