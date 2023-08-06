import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Order} from '../../shared/interface';
import {materialInstance, MaterialServices} from '../../shared/error/material.services';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss'],
})
export class HistoryListComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() orders!: Order[]

  @ViewChild('modal') modalRef!: ElementRef
  modal!: materialInstance
  selectedOrder!: Order

  computePrice(order: Order) {
    return order.list.reduce((total, item) => {
      // @ts-ignore
      return total += item.quantity * item.cost
    }, 0)
  }

  ngOnInit(): void {
  }

  selectOrder(order: Order) {
    this.selectedOrder = order
    if (this.modal.open) {
      this.modal.open()
    }
  }

  ngAfterViewInit(): void {
    this.modal = MaterialServices.initModal(this.modalRef)
  }

  ngOnDestroy(): void {
    if (this.modal.destroy) {
      this.modal.destroy()
    }
  }

  closeModal() {
    if (this.modal.close) {
      this.modal.close()
    }
  }
}
