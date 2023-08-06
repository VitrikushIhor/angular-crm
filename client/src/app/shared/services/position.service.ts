import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Message, Position} from '../interface';

@Injectable({
  providedIn: 'root',
})
export class PositionService {

  constructor(private http: HttpClient) {
  }

  fetch(categoryId: string) {
    return this.http.get<Position[]>(`/api/position/${categoryId}`)
  }

  create(position: Position) {
    return this.http.post<Position>(`/api/position`, position)
  }

  update(position: Position) {
    return this.http.patch<Position>(`/api/position/${position._id}`, position)
  }

  delete(position: Position) {
    return this.http.delete<Message>(`/api/position/${position._id}`)
  }
}
