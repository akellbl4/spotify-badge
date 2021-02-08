const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;

export const CLIENT_ID = SPOTIFY_CLIENT_ID;
export const CLIENT_SECRET = SPOTIFY_CLIENT_SECRET;
export const REFRESH_TOKEN = SPOTIFY_REFRESH_TOKEN;
export const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
export const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
