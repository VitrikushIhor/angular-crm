import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {materialInstance, MaterialServices} from '../shared/error/material.services';
import {OrderService} from '../shared/services/order.service';
import {Order, OrderPosition} from '../shared/interface';
import {OrdersService} from '../shared/services/orders.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {
  isRoot!: boolean
  @ViewChild('modal') modalRef!: ElementRef
  modal!: materialInstance
  pending = false


  constructor(private router: Router, private ordersService: OrdersService, public orderService: OrderService) {
  }

  ngOnInit(): void {
    this.isRoot = this.router.url === '/order'
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order'
      }
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

  openModal() {
    if (this.modal.open) {
      this.modal.open()
    }
  }

  cancel() {
    if (this.modal.close) {
      this.modal.close()
    }
  }

  sumbit() {
    this.pending = true
    if (this.modal.close) {
      this.modal.close()
    }

    const order: Order = {
      list: this.orderService.list.map(item => {
        delete item._id
        return item
      }),
    }

    this.ordersService.create(order).subscribe(
      newOrder => {
        MaterialServices.toast(`Order №${newOrder.order} was add}`)
        this.orderService.clear()
      },
      error => {
        MaterialServices.toast(error.error.message)
      },
      () => {
        if (this.modal.close) {
          this.modal.close()

        }
        this.pending = false
      },
    )
  }

  removePosition(orderPosition: OrderPosition) {
    this.orderService.remove(orderPosition)
  }
}
