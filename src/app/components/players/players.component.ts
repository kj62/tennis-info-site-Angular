import { Component, OnInit, OnChanges, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { Observable, Subscription } from 'rxjs';
import { map, filter} from 'rxjs/operators';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  dataUrl: string;
  appBoxSize: {
    width: number;
    appBoxWidthFlag: boolean;
  };
  fetchedPlayersArray: Array<string>;
  currentPlayerIndex: number;
  playersSubscription: Subscription;

  @ViewChild('players') appBoxRef: ElementRef;

  constructor(private restapiService: RestapiService) {
  }

  ngOnInit() {
    this.dataUrl = '/static/atp-ranking.json';
    this.fetchedPlayersArray = [];
    this.currentPlayerIndex = 0;
    this.appBoxSize = {
      width: 0,
      appBoxWidthFlag: false
    };
    this.playersSubscription = this.getPlayers(this.dataUrl)
    .subscribe(
      (response) => {
          this.fetchedPlayersArray = response;
          console.log(this.fetchedPlayersArray);
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
    this.playersSubscription.unsubscribe();
    window.addEventListener('resize', this.getComponentBoxWidth);
  }

  getPlayers(url) {
    return this.restapiService.getPlayers<string>(url);
  }

  setImgClass(playerIndex: number): string {
    if(playerIndex == 0){
        return "player-img-1";
    }
    else if(playerIndex == 1){
        return "player-img-2";
    }
    else if(playerIndex == 2){
        return "player-img-3";
    }
    else if(playerIndex == 3){
        return "player-img-4";
    }
  }

  setLinkImg(playerIndex: number): string {
    switch(playerIndex){
        case 0:
          return "https://www.atpworldtour.com/en/players/rafael-nadal/n409/overview";
        case 1:
          return "https://www.atpworldtour.com/en/players/roger-federer/f324/overview";
        case 2:
          return "https://www.atpworldtour.com/en/players/novak-djokovic/d643/overview";
        case 3:
          return "https://www.atpworldtour.com/en/players/juan-martin-del-potro/d683/overview";
    }
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
