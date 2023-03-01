export const environment = {
    production: true
};

export const SpotifyConfiguration = {
    clientId: '4155bfed153c4805972b8898365acdcf',
    authEndpoint: 'https://accounts.spotify.com/authorize',
    redirectUrl: 'http//localhost:4200/login/',
    scopes: [
        "user-read-currently-playing", // musica tocando agora
        "user-read-recently-played", // musicas tocadas recentemente
        "user-read-playback-state", // estado do player do usuario
        "user-top-read", // top artistas e musicas do usuario
        "user-modify-playback-state", // alterar do player do usuario
        "user-library-read", // ler biblioteca dos usuarios
        "playlist-read-private", // ler playlists privadas
        "playlist-read-collaborative" // ler playlists colaborativas
    ]
};