import fetch from 'isomorphic-unfetch'

import {
	TOKEN_ENDPOINT,
	NOW_PLAYING_ENDPOINT,
	REFRESH_TOKEN,
	CLIENT_ID,
	CLIENT_SECRET,
} from '../consts'

export type TrackInfo = {
	progress: number
	duration: number
	track: string
	artist: string
	isPlaying: boolean
	coverUrl: string
	url: string
}

export const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')

async function getAccessToken() {
	const payload = new URLSearchParams({
		grant_type: 'refresh_token',
		refresh_token: REFRESH_TOKEN,
	})
	const res = await fetch(TOKEN_ENDPOINT, {
		method: 'POST',
		headers: {
			'Authorization': `Basic ${basic}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: payload.toString(),
	})

	const { access_token } = await res.json()

	return access_token
}

function formatTrackInfo(trackInfo: SpotifyApi.CurrentlyPlayingResponse): TrackInfo | null {
	const { progress_ms, item, is_playing: isPlaying = false, currently_playing_type } = trackInfo

	if (item === null || currently_playing_type !== 'track') {
		return null
	}

	const {
		duration_ms: duration,
		name: track,
		artists = [],
		album,
		external_urls,
	} = item as SpotifyApi.TrackObjectFull
	const artist = artists.map(({ name }) => name).join(', ')
	const coverUrl = album.images[album.images.length - 1]?.url
	const url = external_urls.spotify
	const progress = progress_ms ?? 0

	return { progress, duration, track, artist, isPlaying, coverUrl, url }
}

async function getCurrentTrack(): Promise<null | TrackInfo> {
	const token = await getAccessToken()
	const res = await fetch(NOW_PLAYING_ENDPOINT, {
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})

	if (res.status !== 200) {
		return null
	}

	const data: SpotifyApi.CurrentlyPlayingResponse = await res.json()

	return formatTrackInfo(data)
}

async function getCoverBase64(url: string) {
	try {
	const res = await fetch(url)
	const buff = await res.arrayBuffer()
	
	return `data:image/jpeg;base64,${Buffer.from(buff).toString('base64')}`
	} catch(e) {
		console.error('Error fetching cover image:', e)
		return ''
	}
}

export async function getNowPlaying(
	{ coverFormat }: { coverFormat: 'url' | 'base64' } = { coverFormat: 'url' }
): Promise<TrackInfo | { isPlaying: false }> {
	const track = await getCurrentTrack()

	if (track === null) {
		return {
			isPlaying: false,
		}
	}

	if (coverFormat === 'base64') {
		const coverBase64 = await getCoverBase64(track.coverUrl)

		return {
			...track,
			coverUrl: coverBase64,
		}
	}

	return track
}
