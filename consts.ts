const {
	SPOTIFY_CLIENT_ID,
	SPOTIFY_CLIENT_SECRET,
	SPOTIFY_REFRESH_TOKEN,
	API_CORS_HOST,
	VERCEL_URL,
} = process.env;

Object.entries({
	SPOTIFY_CLIENT_ID,
	SPOTIFY_CLIENT_SECRET,
	SPOTIFY_REFRESH_TOKEN,
}).forEach(([key, value]) => {
	if (typeof value === "string") {
		return;
	}

	console.error(`Missing environment variable: ${key}`);
});
export const CLIENT_ID = SPOTIFY_CLIENT_ID ?? "";
export const CLIENT_SECRET = SPOTIFY_CLIENT_SECRET ?? "";
export const REFRESH_TOKEN = SPOTIFY_REFRESH_TOKEN ?? "";
export const CORS_HOST = API_CORS_HOST ?? "*";
export const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
export const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
export { VERCEL_URL };
