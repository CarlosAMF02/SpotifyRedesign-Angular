import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { newTrack } from 'src/app/Common/factories';
import { ITrack } from 'src/app/interfaces/ITrack';
import { Subscription } from 'rxjs';
import { SpotifyService } from 'src/app/services/spotify.service';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.scss']
})
export class MusicListComponent implements OnInit, OnDestroy {

  playIcon = faPlay;
  
  bannerImageUrl = '';
  bannerText = '';

  title = '';

  tracksList: ITrack[] = [];
  actualTrack: ITrack = newTrack();

  subs: Subscription[] = [];

  constructor(private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private spotifyService: SpotifyService, 
    private playerService: PlayerService) {}

  ngOnInit(): void {
    this.getTracks();
    this.getActualTrack();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  getTrackArtists(track: ITrack) {
    return track.artists.map(a => a.name).join(', ')
  }

  async playTrack(track: ITrack) {
    await this.spotifyService.playTrack(track.id);

    if (track.album.imageUrl) this.playerService.selectActualTrack(track);
  }

  getActualTrack() {
    const sub = this.playerService.actualTrack.subscribe(track => this.actualTrack = track )
    this.subs.push(sub);
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
