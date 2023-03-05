import { IArtist } from "../interfaces/IArtist";
import { ITrack } from "../interfaces/ITrack";

export function newArtist() : IArtist {
    return {
        id: '',
        name: '',
        imageUrl: ''
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