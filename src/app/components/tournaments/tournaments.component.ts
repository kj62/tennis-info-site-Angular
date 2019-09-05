import { Component, OnInit, OnChanges, OnDestroy, AfterViewInit, ElementRef, ViewChild, Injectable } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { Observable, Subscription } from 'rxjs';
import { map, filter} from 'rxjs/operators';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss']
})
export class TournamentsComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  dataUrl: string;
  appBoxSize: {
    width: number;
    appBoxWidthFlag: boolean;
  };
  fetchedTournamentArray: Array<string>;
  currentTournamentIndex: number;
  tournamentsSubscription: Subscription;

  @ViewChild('tournaments') appBoxRef: ElementRef;

  constructor(private restapiService: RestapiService) {
  }

  ngOnInit() {
    this.dataUrl = '/static/atp-ranking.json';
    this.fetchedTournamentArray = [];
    this.currentTournamentIndex = 0;
    this.appBoxSize = {
      width: 0,
      appBoxWidthFlag: false
    };
    this.tournamentsSubscription = this.getTournaments(this.dataUrl)
    .subscribe(
      (response) => {
          this.fetchedTournamentArray = response;
          console.log(this.fetchedTournamentArray);
      },
      (error) => {
          console.log(error);
      }
    );
  }

  ngOnChanges() {
  }

  ngAfterViewInit() {
    window.addEventListener('resize', this.getComponentBoxWidth);
  }

  ngOnDestroy() {
    this.tournamentsSubscription.unsubscribe();
    window.removeEventListener('resize', this.getComponentBoxWidth);
  }

  getTournaments(url) {
    return this.restapiService.getTournaments<string>(url);
  }

  incrementTournamentImgIndex() {
    if(this.currentTournamentIndex < 12) {
      this.currentTournamentIndex = this.currentTournamentIndex + 2;
    }
  }

  decrementTournamentImgIndex() {
    if(this.currentTournamentIndex >= 2) {
      this.currentTournamentIndex = this.currentTournamentIndex - 2;
    }
  }

  setImgOneClass(tournamentIndexCtr: number): string {
    if(tournamentIndexCtr == 0){
      return "tour-img-1";
    }
    else if(tournamentIndexCtr == 2){
      return "tour-img-3";
    }
    else if(tournamentIndexCtr == 4){
      return "tour-img-5";
    }
    else if(tournamentIndexCtr == 6){
      return "tour-img-7";
    }
    else if(tournamentIndexCtr == 8){
      return "tour-img-9";
    }
    else if(tournamentIndexCtr == 10){
      return "tour-img-11";
    }
    else if(tournamentIndexCtr == 12){
      return "tour-img-13";
    }
  }

  setImgTwoClass(tournamentIndexCtr: number): string {
    if(tournamentIndexCtr == 0){
      return "tour-img-2";
    }
    else if(tournamentIndexCtr == 2){
      return "tour-img-4";
    }
    else if(tournamentIndexCtr == 4){
      return "tour-img-6";
    }
    else if(tournamentIndexCtr == 6){
      return "tour-img-8";
    }
    else if(tournamentIndexCtr == 8){
      return "tour-img-10";
    }
    else if(tournamentIndexCtr == 10){
      return "tour-img-12";
    }
    else if(tournamentIndexCtr == 12){
      return "tour-img-14";
    }
  }

  setLinkImgOne(tournamentIndex: number): string {
    switch(tournamentIndex) {
      case 0:
        return "https://ausopen.com/";
      case 2:
        return "http://www.wimbledon.com/index.html";
      case 4:
        return "https://bnpparibasopen.com/";
      case 6:
        return "http://montecarlotennismasters.com/";
      case 8:
        return "http://www.internazionalibnlditalia.com/";
      case 10:
        return "https://www.wsopen.com/";
      case 12:
        return "https://www.rolexparismasters.com/uk";
    }
  }

  setLinkImgTwo(tournamentIndex: number): string {
    switch(tournamentIndex) {
      case 1:
        return "https://www.rolandgarros.com/en-us/";
      case 3:
        return "https://www.usopen.org/index.html";
      case 5:
        return "http://miamiopen.com/";
      case 7:
        return "https://www.madrid-open.com/";
      case 9:
        return "http://www.rogerscup.com/";
      case 11:
        return "http://en.shanghairolexmasters.com/";
      case 13:
        return "https://www.nittoatpfinals.com/";
    }
  }

  isTournamentListEnd(): boolean {
    if(this.currentTournamentIndex < 12) {
      return true;
    }
    return false;
  }

  isAppBoxWidthSmall(): boolean {
    if(this.appBoxSize.appBoxWidthFlag){
      return true;
    }
    return false;
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
