import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHome, faSearch, faGuitar, faMusic } from '@fortawesome/free-solid-svg-icons';
import { IPlaylist } from 'src/app/interfaces/IPlaylist';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit {
  selectedOption = 'Home';

  playlists: IPlaylist[] = []

  // Icons
  homeIcon = faHome;
  searchIcon = faSearch;
  artistIcon = faGuitar;
  playlistIcon = faMusic;

  constructor(private spotifyService: SpotifyService, private router: Router) {}

  ngOnInit() : void {
    this.getPlaylists();
  }

  buttonClick(buttonName: string) {
    this.selectedOption = buttonName;
    this.router.navigateByUrl('player/home')
  }

  goToPlaylist(playlistId: string) {
    this.selectedOption = playlistId;
    this.router.navigateByUrl('/player/list/playlist/' + playlistId);
  }

  async getPlaylists() {
    this.playlists = await this.spotifyService.getUserPlaylists();
  }
}
