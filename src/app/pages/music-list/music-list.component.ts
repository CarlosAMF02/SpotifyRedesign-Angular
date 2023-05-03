import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITrack } from 'src/app/interfaces/ITrack';
import { Subscription } from 'rxjs';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.scss']
})
export class MusicListComponent implements OnInit {
  
  bannerImageUrl = '';
  bannerText = '';

  title = '';

  tracksList: ITrack[] = [];

  subs: Subscription[] = [];

  constructor(private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.getTracks();
  }

  getTracks() {
    const sub = this.activatedRoute.paramMap.subscribe(async params => {
      const type = params.get('type');
      const id = params.get('id');
      await this.getPageData(type, id);
    });

    this.subs.push(sub);
  }

  async getPageData(type: string, id: string) {
    if (type === 'playlist') {
      await this.getPlaylistData(id);
    } 
    else if ( type === 'artist') {
      await this.getArtistData(id);
    } else {
      this.router.navigate(['player/home'])
    }
  }

  async getPlaylistData(playlistId: string) {
    const playlist = await this.spotifyService.getPlaylistTracks(playlistId);
    
    const { name, imageUrl, tracks } = playlist;

    this.definePageData(name, imageUrl, tracks);
    this.title = 'Músicas da Playlist: ' + name;
  }

  async getArtistData(artistId: string) {
    const artist = await this.spotifyService.getArtistTracks(artistId);

    const { name, imageUrl, tracks } = artist;

    this.definePageData(name, imageUrl, tracks);
    this.title = 'Músicas do Artista: ' + name;
  }

  definePageData(bannerText: string, bannerImageUrl: string, tracks: ITrack[]) {
    this.bannerImageUrl = bannerImageUrl;
    this.bannerText = bannerText;
    this.tracksList = tracks;
  }

}
