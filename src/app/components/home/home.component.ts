import { Component, OnInit, OnChanges, OnDestroy, AfterViewInit, ElementRef, ViewChild, Injectable } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { Observable, Subscription } from 'rxjs';
import { map, filter} from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  dataUrl: string;
  appBoxSize: {
    width: number;
    appBoxWidthFlag: boolean;
  };
  fetchedRankingArray: Array<string>;
  headersRankingArray: Array<string>;
  clockDate: string;
  atpRankingSubscription: Subscription;

  @ViewChild('home-box') appBoxRef: ElementRef;

  constructor(private restapiService: RestapiService) {
  }

  ngOnInit() {
    this.dataUrl = '/static/atp-ranking.json';
    this.fetchedRankingArray = [];
    this.headersRankingArray = ["Rank", "Player", "Country", "ATP Points", "Age"];
    this.clockDate = "Loading...";
    this.appBoxSize = {
      width: 0,
      appBoxWidthFlag: false
    };
    this.atpRankingSubscription = this.getAtpRanking(this.dataUrl)
      .subscribe(
        (response) => {
            this.fetchedRankingArray = response;
            console.log(this.fetchedRankingArray);
        },
        (error) => {
            console.log(error);
        }
      );
  }

  ngOnChanges() {
  }

  ngOnDestroy() {
    this.atpRankingSubscription.unsubscribe();
    window.removeEventListener('resize', this.getComponentBoxWidth);
  }

  ngAfterViewInit() {
    window.addEventListener('resize', this.getComponentBoxWidth);
  }

  getAtpRanking(url) {
    return this.restapiService.getRanking<string>(url);
  }

  updateClock() {
    this.clockDate = moment().format('DD MMMM YYYY HH:mm');
  }

  getComponentBoxWidth() {
    this.appBoxSize.width = this.appBoxRef.nativeElement.width;
    if(this.appBoxSize.width <= 750) {
      this.appBoxSize.appBoxWidthFlag = true;
    }
    else{
      this.appBoxSize.appBoxWidthFlag = false;
    }
  }
}
