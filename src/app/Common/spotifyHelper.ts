import { IArtist } from "../interfaces/IArtist";
import { IPlaylist } from "../interfaces/IPlaylist";
import { ITrack } from "../interfaces/ITrack";
import { IUser } from "../interfaces/IUser";
import { msToMinute } from "./converters";
import { newPlaylist, newTrack } from "./factories";

export function SpotifyUserToUser(user: SpotifyApi.CurrentUsersProfileResponse): IUser {
    return { 
        id: user.id,
        name: user.display_name,
        imageUrl: user.images.pop().url,
    }
}

export function SpotifyPlaylistToPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist {
    return { 
        id: playlist.id,
        name: playlist.name,
        imageUrl: playlist.images.pop().url,
        
    }
}

export function SpotifySinglePlaylistToPlaylist(playlist: SpotifyApi.SinglePlaylistResponse): IPlaylist {
    if (!playlist) return newPlaylist();

    return { 
        id: playlist.id,
        name: playlist.name,
        imageUrl: playlist.images.shift().url,
        tracks: []
    }
}

export function SpotifyArtistFullToArtist(artist: SpotifyApi.ArtistObjectFull): IArtist {
    return {
        id: artist.id,
        name: artist.name,
        imageUrl: artist.images.sort((a,b) => a.width - b.width).pop().url
    }
}

export function SpotifyTrackToTrack(track: SpotifyApi.TrackObjectFull): ITrack {

    if (!track) return newTrack();

    return {
        id: track.uri,
        title: track.name,
        album: { id: track.album.id, imageUrl: track.album.images.shift().url, name: track.album.name },
        artists: track.artists.map(a => ({ id: a.id, name: a.name })),
        duration: msToMinute(track.duration_ms)
    }
}

export function SpotifySimpleTrackToTrack(track: SpotifyApi.TrackObjectSimplified, album: SpotifyApi.AlbumObjectSimplified): ITrack {

    if (!track) return newTrack();

    return {
        id: track.uri,
        title: track.name,
        album: { id: album.id, imageUrl: '', name: album.name },
        artists: track.artists.map(a => ({ id: a.id, name: a.name })),
        duration: msToMinute(track.duration_ms)
    }
}