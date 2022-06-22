import { VercelRequest, VercelResponse } from '@vercel/node'
import { CORS_HOST } from '../consts'
import { getNowPlaying } from '../lib/spotify'

export default async function nowPlaying(req: VercelRequest, res: VercelResponse) {
	const track = await getNowPlaying()

	if (CORS_HOST) {
		res.setHeader('Access-Control-Allow-Origin', CORS_HOST)
		res.setHeader('Access-Control-Allow-Methods', 'GET')
	}

	res.setHeader('Content-Type', 'application/json')
	res.setHeader('Cache-Control', 's-maxage=1')
	res.status(200).send(track)
}
