import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AnalyticsPage, OverviewPage} from '../interface';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {

  constructor(private http: HttpClient) {
  }

  getOverview() {
    return this.http.get<OverviewPage>(`/api/analytics/overview`)
  }

  getAnalytics() {
    return this.http.get<AnalyticsPage>(`/api/analytics/analytics`)

  }

}
