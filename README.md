# Spotify is playing now in your README.md

If you want to share your love for music with the world you are in the right place. Show what's playing on your Spotify by posting the generated image!

<img src="https://spotify-badge.vercel.app/api/now-playing.svg" width="540" height="52">

### Features

🎸 **playing now** - current state of the playing track with real-time progress bar  
🎬 **ended state** – when a track is ended, the badge transitions to this state  
⏸ **paused state** - when the current track is paused in the player  
📭 **idle state** – not playing

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fakellbl4%2Fspotify-playing-now-readme&env=SPOTIFY_CLIENT_ID,SPOTIFY_CLIENT_SECRET,SPOTIFY_REFRESH_TOKEN,VERCEL_URL&envDescription=Spotify%20credentials%20should%20be%20provided.&envLink=https%3A%2F%2Fgithub.com%2Fakellbl4%2Fspotify-playing-now-readme%2Fblob%2Fmain%2FREADME.md&project-name=spotify-playing-now-readme)

### How to use

#### Create a Spotify application for authentication

- Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/) and log in with your Spotify account
- Click **Create An App**
- Fill in the name and description of a new app and click **Create**.
- Click **Show Client Secret**.
- Copy **Client ID** and **Client Secret** we will need it a bit later.

> [!IMPORTANT]
> Since early 2026, Spotify apps start in **Development Mode**, which comes with rules that directly affect this badge — see [Spotify's Development Mode](#spotifys-development-mode) below before you go further. In short: the Spotify account that owns the app needs an active **Premium** subscription, and you'll need to redo the "Get Refresh Token" step below every so often, since refresh tokens now expire.

#### Deploy an application to Vercel

- Open [this link](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fakellbl4%2Fspotify-playing-now-readme&env=SPOTIFY_CLIENT_ID,SPOTIFY_CLIENT_SECRET,SPOTIFY_REFRESH_TOKEN,VERCEL_URL&envDescription=Spotify%20credentials%20should%20be%20provided.&envLink=https%3A%2F%2Fgithub.com%2Fakellbl4%2Fspotify-playing-now-readme%2Fblob%2Fmain%2FREADME.md&project-name=spotify-playing-now-readme) for deploy app to Vercel
- Click **Continue** on **Clone Git Repository** screen
- Choose where you want to save code on **Create Git Repository** and Vercel will fork this repo automatically
- Click **Continue** on **Import Project** screen
- Put **Client ID** to `SPOTIFY_CLIENT_ID` and **Client Secret** to `SPOTIFY_CLIENT_SECRET` and put just `-` to `SPOTIFY_REFRESH_TOKEN`.
- If you plan to use API specify `API_CORS_HOST` as the host from which you plan to call the API endpoint. [Read more](#api)
- Click **Deploy**

#### Get Refresh Token

- When an application is deployed go to **Dashboard**
- Copy your project's stable **production** domain (the one shown under the `Production` label — e.g. `https://spotify-badge.vercel.app`). Don't use one of the auto-generated preview/deployment URLs (the ones with a random hash in them like `spotify-badge-c74hazo6k.vercel.app`) — those change on every deploy, so registering one as your Redirect URI will break as soon as you redeploy.
- Go back to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
- Open application
- Click to **Edit Settings**
- Add path `/api/auth` to that production domain. It should look like this `https://spotify-badge.vercel.app/api/auth`.
  [Screenshot](https://github.com/akellbl4/spotify-badge/blob/25e8d27aaff69e93ffb7a933a615b7e114fc58cc/screenshots/vercel-domain.png)
- Put the url **Redirect URI** and click **Add**
- Save changes by clicking on **Save** at the end of the form
- Open a new tab on the browser and go to that same URL, e.g. `https://spotify-badge.vercel.app/api/auth`
- Copy **Refresh token** and put to the application settings on Vercel
- Go to the **Deployments** page and redeploy the last deployment of your application on Vercel
- Everything is done!

You can copy this snippet and change the domain in the URL to the domain of your application and post it wherever you would like

```html
<img
	src="https://spotify-playing-now-readme.vercel.app/api/now-playing.svg"
	width="540"
	height="52"
/>
```

## API

To make API available, specify `API_CORS_HOST` after you deploy the app.

- Open the created project on Vercel and go to **Settings**.
- Open tab **Environment Variables**
- Create a variable with the name `API_CORS_HOST` and put the site address from which you plan to make requests for example `https://example.com` (the variable will be set to `Access-Control-Allow-Origin` header. [More about the header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin))

### `GET /api/now-playing`

**Response:**

When something is playing

```ts
type Response = 
/** When a track is playing */
{
	progress: number;
	duration: number;
	track: string;
	artist: string;
	isPlaying: boolean;
	coverUrl: string;
	url: string;
}

/** When nothing is playing */
| {
	isPlaying: false;
}
```

## Spotify's Development Mode

Every new Spotify app starts in **Development Mode**, and since a February 2026 policy change this comes with rules that matter for a badge like this one:

- **The app owner's Spotify account must have an active Premium subscription.** If it lapses, the app stops authenticating — API calls will start failing until Premium is restored.
- **Refresh tokens expire** — your app's Client Secret page in the dashboard shows the current lifetime (commonly 180 days). When it expires, requests will fail with `invalid_grant`, and you'll need to redo [Get Refresh Token](#get-refresh-token) to mint a new one.
- Development Mode apps are capped to a small number of authorized users and a limited number of Client IDs per developer account. For a personal badge with a single user (you), this isn't a practical limit.
- If you ever created more than one Spotify app for this project, double-check that the `SPOTIFY_CLIENT_ID` / `SPOTIFY_CLIENT_SECRET` pair in Vercel matches the **same** app you authorized in [Get Refresh Token](#get-refresh-token). A refresh token only works with the app that issued it — mixing credentials from two different apps produces an `invalid_grant: Invalid refresh token` error that looks identical to an expired token.

None of this applies if your app is approved for **Extended Quota Mode**, but that requires a registered business and 250k+ monthly active users — not realistic for a personal project, so periodic token renewal is expected behavior here.

### Troubleshooting

If the badge shows an idle/empty state even while something is playing:

1. Check the deployed function's logs for the actual error:
   ```bash
   vercel logs <your-production-domain>
   ```
   `lib/spotify.ts` logs the real Spotify API response on any failure instead of silently returning an idle state.
2. `invalid_grant: Refresh token revoked` or `Invalid refresh token` → redo [Get Refresh Token](#get-refresh-token).
3. Otherwise, confirm the app's Premium requirement and Development Mode status in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/).

### Development

- Copy `.env.example` to `.env` and add values to env variables
- Run `npm install -g pnpm@9` if your global `pnpm` isn't `9.x` yet (required by this project's `engines` field)
- Run `pnpm install` for dependencies installation
- Run `pnpm dev` to start a development server
