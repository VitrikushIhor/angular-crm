import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {materialInstance, MaterialServices} from '../shared/error/material.services';
import {OrdersService} from '../shared/services/orders.service';
import {Subscription} from 'rxjs';
import {Filter, Order} from '../shared/interface';

const Step = 2

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss'],
})


export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {
  isFilterVisible = false
  @ViewChild('tooltip') tooltipRef!: ElementRef
  tooltip!: materialInstance
  offset = 0
  limit = Step
  oSub!: Subscription
  orders: Order[] = []
  loading = false
  reloading = false
  noMoreOrders = false
  filter: Filter = {order: 0}

  constructor(private ordersService: OrdersService) {
  }

  ngAfterViewInit(): void {
    this.tooltip = MaterialServices.initTooltip(this.tooltipRef)
  }

  ngOnDestroy(): void {
    if (this.tooltip.destroy) {
      this.tooltip.destroy()
    }
    this.oSub.unsubscribe()
  }

  ngOnInit(): void {
    this.reloading = true
    this.fetch()
  }

  private fetch() {
    const params = Object.assign({}, this.filter, {
      offset: this.offset,
      limit: this.limit,
    })
    this.oSub = this.ordersService.fetch(params).subscribe(orders => {
      this.orders = this.orders.concat(orders)
      this.noMoreOrders = orders.length < Step
      this.loading = false
      this.reloading = false
    })
  }

  loadMore() {
    this.offset += Step
    this.loading = true
    this.fetch()
  }

  applyFilter(filter: Filter) {
    this.orders = []
    this.offset = 0
    this.filter = filter
    this.reloading = true
    this.fetch()
  }
}
