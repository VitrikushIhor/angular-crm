import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Order} from '../interface';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {

  constructor(private http: HttpClient) {
  }

  create(order: Order) {
    return this.http.post<Order>(`/api/order`, order)
  }

  fetch(params: any = {}) {
    return this.http.get<Order[]>(`/api/order`, {
      params: new HttpParams(
        {
          fromObject: params,
        },
      ),
    })
  }
}
