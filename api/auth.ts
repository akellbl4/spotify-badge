import { NowRequest, NowResponse } from "@vercel/node";
import fetch from "isomorphic-unfetch";
import { render } from "preact-render-to-string";

import { CLIENT_ID, TOKEN_ENDPOINT } from "../consts/spotify";
import { basic } from "../lib/spotify";
import RefreshToken from "../components/RefreshToken";

const { VERCEL_URL } = process.env;
const REDIRECT_URI = `https://${VERCEL_URL}/api/auth`;

export default async function spotifyAuth(req: NowRequest, res: NowResponse) {
	if (!req.query.code) {
		const query = new URLSearchParams({
			client_id: CLIENT_ID,
			response_type: "code",
			redirect_uri: REDIRECT_URI,
			scope: "user-read-currently-playing user-top-read",
		});

		return res.redirect(
			`https://accounts.spotify.com/authorize?${query.toString()}`
		);
	}

	const response = await fetch(TOKEN_ENDPOINT, {
		method: "POST",
		headers: {
			Authorization: `Basic ${basic}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			grant_type: "authorization_code",
			code: `${req.query.code}`,
			redirect_uri: REDIRECT_URI,
		}).toString(),
	});

	const data = await response.json();
	const html = render(RefreshToken({ token: data.refresh_token }));

	return res.send(html);
}
