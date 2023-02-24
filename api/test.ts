import type { VercelRequest, VercelResponse } from '@vercel/node'
import { x } from '../x'

export default async function test(_: VercelRequest, res: VercelResponse) {
	res.status(200).send('hi' + x)
}
