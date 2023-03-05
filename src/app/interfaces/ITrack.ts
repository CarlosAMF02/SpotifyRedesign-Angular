export interface ITrack {
    id: string,
    title: string,
    artists: { id: string, name: string }[],
    album: { id: string, name: string, imageUrl: string },
    duration: string
}