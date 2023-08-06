import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category, Message} from '../interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {

  constructor(private http: HttpClient) {
  }

  fetch(): Observable<Category[]> {
    return this.http.get<Category[]>(`api/category`)
  }


  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`/api/category/${id}`)
  }

  create(name: string, image?: File): Observable<Category> {
    const Fd = new FormData()
    if (image) {
      Fd.append('image', image, image.name)
    }
    Fd.append('name', name)
    return this.http.post<Category>('/api/category',

      Fd)
  }

  update(id: string, name: string, image?: File): Observable<Category> {
    const Fd = new FormData()
    if (image) {
      Fd.append('image', image, image.name)
    }
    Fd.append('name', name)
    return this.http.patch<Category>(`/api/category/${id}`, Fd)
  }

  delete(id: string) {
    return this.http.delete<Message>(`/api/category/${id}`)

  }
}
