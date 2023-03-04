import { Component, OnInit } from '@angular/core';
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

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit() : void {
    this.getPlaylists();
  }

  buttonClick(buttonName: string) {
    this.selectedOption = buttonName;
  }

  async getPlaylists() {
    this.playlists = await this.spotifyService.getUserPlaylists();
  }
}
