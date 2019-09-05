import { Component, OnInit, OnChanges, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { Observable, Subscription } from 'rxjs';
import { map, filter} from 'rxjs/operators';

@Component({
  selector: 'app-technique',
  templateUrl: './technique.component.html',
  styleUrls: ['./technique.component.scss']
})
export class TechniqueComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  dataUrl: string;
  appBoxSize: {
    width: number;
    appBoxWidthFlag: boolean;
  };
  fetchedTechniqueArray: Array<string>;
  currentTechniqueIndex: number;
  techniqueSubscription: Subscription;
  clipsSrc: Array<string>;

  @ViewChild('technique') appBoxRef: ElementRef;

  constructor(private restapiService: RestapiService) {
  }

  ngOnInit() {
    this.dataUrl = '/static/atp-ranking.json';
    this.fetchedTechniqueArray = [];
    this.currentTechniqueIndex = 0;
    this.appBoxSize = {
      width: 0,
      appBoxWidthFlag: false
    };
    this.clipsSrc = [
      "https://www.youtube.com/embed/g08vWMFbPoc?rel=0",
      "https://www.youtube.com/embed/oUIa6-wQADA",
      "https://www.youtube.com/embed/Now4OFySdC4?rel=0",
      "https://www.youtube.com/embed/z1ze7NMfaN0",
      "https://www.youtube.com/embed/_YE-k1QwZfg",
      "https://www.youtube.com/embed/8LBNv93fwPk",
      "https://www.youtube.com/embed/nrvkqIVbiDE",
      "https://www.youtube.com/embed/NZxgD1z3lrA",
      "https://www.youtube.com/embed/XNJ-uaytATI",
      "https://www.youtube.com/embed/Ht3hOqFPxz0",
      "https://www.youtube.com/embed/smXwpViLrS8",
      "https://www.youtube.com/embed/GZ5GH9spSa8",
      "https://www.youtube.com/embed/6HECCLBKeCk",
      "https://www.youtube.com/embed/H1F8YxcdfKo"
    ];
    this.techniqueSubscription = this.getTechnique(this.dataUrl)
    .subscribe(
      (response) => {
          this.fetchedTechniqueArray = response;
          console.log(this.fetchedTechniqueArray);
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
    this.techniqueSubscription.unsubscribe();
    window.removeEventListener('resize', this.getComponentBoxWidth);
  }

  getTechnique(url) {
    return this.restapiService.getTechnique<string>(url);
  }

  incrementTechniqueVidIndex() {
    if(this.currentTechniqueIndex < 12) {
      this.currentTechniqueIndex = this.currentTechniqueIndex + 2;
    }
  }

  decrementTechniqueVidIndex() {
    if(this.currentTechniqueIndex >= 2) {
      this.currentTechniqueIndex = this.currentTechniqueIndex - 2;
    }
  }

  // getAppBoxWidth($event) {
  //   this.appBoxSize.width = this.$refs['technique'].clientWidth;
  //   if(this.appBoxSize.width <= 750) {
  //     this.appBoxSize.appBoxWidthFlag = 1;
  //   }
  //   else{
  //     this.appBoxSize.appBoxWidthFlag = 0;
  //   }
  // }

  setVidSrc(techniqueIndex: number): string {
    if(this.clipsSrc) {
      return this.clipsSrc[techniqueIndex];
    }
  }

  isTechniqueListEnd(): boolean {
    if(this.currentTechniqueIndex < 12) {
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
