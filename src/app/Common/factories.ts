import { IArtist } from "../interfaces/IArtist";
import { IPlaylist } from "../interfaces/IPlaylist";
import { ITrack } from "../interfaces/ITrack";

export function newArtist() : IArtist {
    return {
        id: '',
        name: '',
        imageUrl: '',
        tracks: []
    }
}

export function newTrack() : ITrack {
    return {
        id: '',
        album: { id: '', imageUrl: '', name: '' },
        artists: [],
        duration: '',
        title: ''
    }
}

export function newPlaylist() : IPlaylist {
    return {
        id: '',
        name: '',
        imageUrl: '',
        tracks: []
    }
}