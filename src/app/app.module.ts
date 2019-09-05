import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClientModule, HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PlayersComponent } from './components/players/players.component';
import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { TechniqueComponent } from './components/technique/technique.component';

import { RestapiService } from './services/restapi.service';

import { YtVideoPipe } from './pipes/ytVideo.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlayersComponent,
    TournamentsComponent,
    TechniqueComponent,
    YtVideoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    RestapiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
