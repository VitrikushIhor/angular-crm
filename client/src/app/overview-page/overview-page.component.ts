import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AnalyticsService} from '../shared/services/analytics.service';
import {Observable} from 'rxjs';
import {OverviewPage} from '../shared/interface';
import {materialInstance, MaterialServices} from '../shared/error/material.services';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss'],
})
export class OverviewPageComponent implements OnInit, OnDestroy, AfterViewInit {
  data$!: Observable<OverviewPage>
  tapTarget!: materialInstance
  yesterday = new Date()

  @ViewChild('tapTarget') tapTargetRef!: ElementRef

  constructor(private service: AnalyticsService) {
  }

  ngOnInit(): void {
    this.data$ = this.service.getOverview()
    this.yesterday.setDate(this.yesterday.getDate() - 1)
  }

  ngAfterViewInit(): void {
    this.tapTarget = MaterialServices.initTapTarget(this.tapTargetRef)
  }

  ngOnDestroy(): void {
    if (this.tapTarget.destroy) {
      this.tapTarget.destroy()
    }
  }

  openInfo() {
    if (this.tapTarget.open) {
      this.tapTarget.open()
    }
  }
}
