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
import { RecentSearchComponent } from 'src/app/components/recent-search/recent-search.component';
import { FormsModule } from '@angular/forms';
import { TopArtistsComponent } from 'src/app/components/top-artists/top-artists.component';
import { ArtistItemImageComponent } from 'src/app/components/artist-item-image/artist-item-image.component'
import { PlayerCardComponent } from 'src/app/components/player-card/player-card.component';
import { MusicListComponent } from '../music-list/music-list.component';
import { BannerComponent } from 'src/app/components/banner/banner.component';



@NgModule({
  declarations: [
    PlayerComponent,
    LeftPanelComponent,
    MenuButtonComponent,
    UserInfoComponent,
    HomeComponent,
    FavoriteArtistComponent,
    RightPanelComponent,
    RecentSearchComponent,
    TopArtistsComponent,
    ArtistItemImageComponent,
    PlayerCardComponent,
    MusicListComponent,
    BannerComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule.forChild(PlayerRoutes)
  ]
})
export class PlayerModule { }
