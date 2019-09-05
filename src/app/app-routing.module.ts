import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PlayersComponent } from './components/players/players.component';
import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { TechniqueComponent } from './components/technique/technique.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'tournaments', component: TournamentsComponent },
  { path: 'technique', component: TechniqueComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
