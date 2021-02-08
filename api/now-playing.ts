import { NowRequest, NowResponse } from "@vercel/node";
import render from "preact-render-to-string";

import { formatTrackInfo, getCoverBase64, getNowPlaying } from "../lib/spotify";
import Player from "../components/Player";

export default async function nowPlaying(req: NowRequest, res: NowResponse) {
	const nowPlaying = await getNowPlaying();
	const trackInfo = formatTrackInfo(nowPlaying);
	const cover = trackInfo ? await getCoverBase64(trackInfo.coverUrl) : undefined;
	const player = render(Player({ ...trackInfo, cover }));

	res.setHeader("Content-Type", "image/svg+xml");
	res.setHeader("Cache-Control", "s-maxage=1");
	res.status(200).send(player);
}
