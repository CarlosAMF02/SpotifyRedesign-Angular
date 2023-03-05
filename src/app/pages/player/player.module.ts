import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { RouterModule } from '@angular/router';
import { PlayerRoutes } from './player.routes';
import { LeftPanelComponent } from 'src/app/components/left-panel/left-panel.component';
import { MenuButtonComponent } from 'src/app/components/menu-button/menu-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserInfoComponent } from 'src/app/components/user-info/user-info.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { FavoriteArtistComponent } from 'src/app/components/favorite-artist/favorite-artist.component';
import { RightPanelComponent } from 'src/app/components/right-panel/right-panel.component';



@NgModule({
  declarations: [
    PlayerComponent,
    LeftPanelComponent,
    MenuButtonComponent,
    UserInfoComponent,
    HomeComponent,
    FavoriteArtistComponent,
    RightPanelComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild(PlayerRoutes)
  ]
})
export class PlayerModule { }
