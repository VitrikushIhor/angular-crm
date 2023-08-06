import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PositionService} from '../../shared/services/position.service';
import {map, Observable, switchMap} from 'rxjs';
import {Position} from '../../shared/interface';
import {OrderService} from '../../shared/services/order.service';
import {MaterialServices} from '../../shared/error/material.services';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.scss'],
})
export class OrderPositionsComponent implements OnInit {
  positions$!: Observable<Position[]>

  constructor(private activateRoute: ActivatedRoute,
              private positionService: PositionService,
              private orderService: OrderService,
  ) {
  }

  ngOnInit(): void {
    this.positions$ = this.activateRoute.params.pipe(
      switchMap((params) => {
        return this.positionService.fetch(params[`id`])
      }), map(
        (positions) => {
          return positions.map(position => {
            position.quantity = 1
            return position
          })
        },
      ),
    )
  }

  addToOrder(position: Position) {
    MaterialServices.toast(`Add x${position.quantity}`)
    this.orderService.add(position)
  }
}
