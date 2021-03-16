import { h, Fragment } from "preact";

export default function TrackInfo({
	track = "Not playing",
	artist = "Spotify",
}) {
	return (
		<Fragment>
			<style>{`
				.track-info {
					position: relative;
					width: 100%;
					white-space: nowrap;
				}
				.track-info:after {
						position: absolute;
						top: 0;
						right: 0;
						display: block;
						content: '';
						height: 100%;
						width: 40px;
						background: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
				}
				.track-info-artist {
					color: #707070;
				}
			`}</style>
			<div className="track-info">
				<span className="track-info-composition">{track}</span>
				<span className="track-info-artist">{` – ${artist}`}</span>
			</div>
		</Fragment>
	);
}
