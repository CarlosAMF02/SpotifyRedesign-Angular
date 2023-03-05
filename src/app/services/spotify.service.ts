import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js'
import { IUser } from '../interfaces/IUser';
import { SpotifyArtistFullToArtist, SpotifyPlaylistToPlaylist, SpotifyTrackToTrack, SpotifyUserToUser } from '../Common/spotifyHelper';
import { IPlaylist } from '../interfaces/IPlaylist';
import { Router } from '@angular/router';
import { IArtist } from '../interfaces/IArtist';
import { ITrack } from '../interfaces/ITrack';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi : Spotify.SpotifyWebApiJs = null;
  user: IUser;

  constructor(private router: Router) { 
    this.spotifyApi = new Spotify()
  }

  async initializeUser() {
    if(!!this.user) return true;
    
    const token = localStorage.getItem('token');

    if(!token) return false;

    try {
      this.setAccessToken(token);
      await this.getSpotifyUser();
      return !!this.user;
    } catch(ex) {
      console.error(ex);
      return false;
    }
  }

  async getSpotifyUser() {
    const userInfo = await this.spotifyApi.getMe();
    this.user = SpotifyUserToUser(userInfo)
  }

  getLoginUrl() {
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;

    return authEndpoint + clientId + redirectUrl + scopes + responseType;
  }

  getTokenUrlCallback() {
    if (!window.location.hash) return ''

    const params = window.location.hash.substring(1).split('&');

    return params[0].split('=')[1];
  }

  setAccessToken(token: string) {
    this.spotifyApi.setAccessToken(token);

    localStorage.setItem('token', token);
  }

  async getUserPlaylists(offset = 0, limit = 50): Promise<IPlaylist[]> {
    const playlists = await this.spotifyApi.getUserPlaylists(this.user.id, { offset, limit });

    return playlists.items.map(SpotifyPlaylistToPlaylist);
  }

  async getFavoriteArtists(limit = 10): Promise<IArtist[]> {
    const artists = await this.spotifyApi.getMyTopArtists({ limit });

    return artists.items.map(SpotifyArtistFullToArtist)
  }

  async getUserSavedTracks(offset = 0, limit = 50): Promise<ITrack[]> {
    const tracks = await this.spotifyApi.getMySavedTracks({ offset, limit });

    return tracks.items.map(x => SpotifyTrackToTrack(x.track));
  }

  async playTrack(trackId: string) {
    
    await this.spotifyApi.queue(trackId);
    await this.spotifyApi.skipToNext();
    
    try {
      await this.spotifyApi.play();
    } catch(ex) {
      console.error(ex)
    }
    
    
  } 

  async getActualTrack(): Promise<ITrack> {
    const track = await this.spotifyApi.getMyCurrentPlayingTrack();

    return SpotifyTrackToTrack(track.item);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
