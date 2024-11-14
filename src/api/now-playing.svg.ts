import { VercelRequest, VercelResponse } from '@vercel/node'
import render from 'preact-render-to-string'

import { getNowPlaying } from '../lib/spotify'
import Player from '../components/Player'

export default async function nowPlaying(req: VercelRequest, res: VercelResponse) {
	const track = await getNowPlaying({ coverFormat: 'base64' })
	const player = render(Player(track))

	res.setHeader('Content-Type', 'image/svg+xml')
	res.setHeader('Cache-Control', 's-maxage=1')
	res.status(200).send(player)
}
