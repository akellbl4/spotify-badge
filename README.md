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
- Copy your domain with `prod` label of your application
- Go back to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
- Open application
- Click to **Edit Settings**
- Add path `/api/auth` to the deployment domain. It should look like this `https://spotify-badge-c74hazo6k-akellbl4.vercel.app/api/auth`.
  [Screenshot](https://github.com/akellbl4/spotify-badge/blob/25e8d27aaff69e93ffb7a933a615b7e114fc58cc/screenshots/vercel-domain.png)
- Put the url **Redirect URI** and click **Add**
- Save changes by clicking on **Save** at the end of the form
- Open a new tab on the browser and go to the url which you put in **Redirect URI**. The URL should look like this `https://spotify-badge-c74hazo6k-akellbl4.vercel.app.akellbl4.vercel.app/api/auth`
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
	progress: number | null;
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
### Development

- Copy `.env.example` to `.env` and add values to env variables
- Run `pnpm install` for dependencies installation
- Run `pnpm dev` to start a development server
