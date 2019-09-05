import { Component, OnInit, OnChanges, OnDestroy, AfterViewInit, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  title: string;
  activeCard: string;
  appContainerSize: {
    width: number;
    height: number;
    marginTop: number;
  };

  @ViewChild('appContainer') appContainerRef: ElementRef;

  constructor() {
  }

  ngOnInit() {
    this.title = 'angular-tennis-project';
    this.activeCard = "";
    this.appContainerSize = {
      width: 0,
      height: 0,
      marginTop: 0
    };
    this.getActiveCard();
  }

  ngAfterViewInit() {
    window.addEventListener('resize', this.getAppContainerSize);
    this.getAppContainerSize();
  }

  ngOnChanges() {
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.getAppContainerSize);
  }

  getActiveCard() {
    if (sessionStorage.getItem('cardSelection')) {
      const currentCard = JSON.parse(sessionStorage.getItem('cardSelection'));
      if (currentCard) {
        this.activeCard = currentCard;
      }
    }
    else {
      this.activeCard = 'home';
    }
  }

  setActiveCard(card) {
    this.activeCard = card;
    sessionStorage.setItem('cardSelection', JSON.stringify(this.activeCard));
  }

  getAppContainerSize() {
    this.appContainerSize.width = this.appContainerRef.nativeElement.width;
    this.appContainerSize.height = this.appContainerRef.nativeElement.height;

    if(this.appContainerSize.width <= 860 || this.appContainerSize.height <= 750) {
      this.appContainerSize.marginTop = 10;
    }
    else{
      this.appContainerSize.marginTop = 0;
    }
  }
}

