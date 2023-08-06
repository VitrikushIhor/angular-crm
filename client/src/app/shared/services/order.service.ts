import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OrderPosition, Position} from '../interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  public list: OrderPosition[] = []
  public price = 0

  constructor(private http: HttpClient) {
  }

  add(position: Position) {
    const orderPosition = Object.assign({}, {
      name: position.name,
      cost: position.cost,
      quantity: position.quantity,
      _id: position._id,
    })
    const candidate = this.list.find(p => p._id === position._id)

    if (candidate) {
      candidate.quantity += orderPosition.quantity
    } else {
      // @ts-ignore
      this.list.push(orderPosition)
    }
    this.computePrice()

  }

  clear() {
    this.list = []
    this.price = 0
  }

  remove(orderPosition: OrderPosition) {
    const index = this.list.findIndex(p => p._id === orderPosition._id)
    this.list.splice(index, 1)
    this.computePrice()

  }

  private computePrice() {
    this.price = this.list.reduce((total, item) => {
      // @ts-ignore
      return total += item.quantity * item.cost
    }, 0)
  }

}
