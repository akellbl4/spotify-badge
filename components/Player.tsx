import { Fragment, h } from "preact";

import Pause from "./Pause";
import Cover from "./Cover";
import Progress from "./Progress";
import Equalizer from "./Equalizer";
import TrackInfo from "./TrackInfo";
import SpotifyLogo from "./SpotifyLogo";
import { RefreshIcon } from "./RefreshIcon";

const width = 540;
const height = 52;

type Props = {
	cover?: string;
	track?: string;
	artist?: string;
	duration?: number;
	progress?: number;
	isPlaying?: boolean;
};

export default function Player({
	track,
	artist,
	cover,
	progress,
	duration,
	isPlaying,
}: Props) {
	const hasTrack = track && artist;
	return (
		<svg
			fill="none"
			width={width}
			height={height}
			viewBox={`0 0 ${width} ${height}`}
			xmlns="http://www.w3.org/2000/svg"
		>
			<foreignObject width={width} height={height}>
				<style>{`
					.frame {
						--delay: ${duration - progress}ms;

						display: flex;
						box-sizing: border-box;
						width: 100%;
						padding: 6px 12px;
						align-items: center;
						border-radius: 6px;
						background-color: #fff;
						font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
						font-size: 16px;
					}
					.frame-image {
						display: flex;
						justify-content: center;
						align-items: center;
						flex-shrink: 0;
						width: 40px;
						heigh: 40px;
						margin-right: 12px;
					}
					.frame-body {
						display: flex;
						width: 100%;
						overflow: hidden;
						flex-wrap: wrap;
						align-items: center;
					}
					.frame-body-content {
						display: flex;
						max-width: calc(100% - 32px);
						height: 20px;
						flex-grow: 1;
						overflow: hidden;
						align-items: center;
						animation: shift-5 0.2s;
						animation-fill-mode: forwards;
						animation-delay: var(--delay);
						animation-play-state: ${isPlaying ? "running" : "paused"};
					}
					.frame-body-status {
						margin-left: 12px;
						width: 20px;
						height: 20px;
						overflow: hidden;
						flex-shrink: 0;
						animation: shift-5 0.2s;
						animation-fill-mode: forwards;
						animation-delay: var(--delay);
					}
					.frame-body-status-playing {
						transform: translateY(-50%);
						animation: shift-half 0.2s;
						animation-fill-mode: forwards;
						animation-delay: var(--delay);
					}
					.frame-progress {
						width: 100%;
						margin-top: 8px;
						animation: disappear 0.2s;
						animation-delay: var(--delay);
						animation-fill-mode: forwards;
					}
					@keyframes disappear {
						0% {
							opacity: 1;
							transform: translateY(0);
						}
						100% {
							opacity: 0;
							transform: translateY(100%);
						}
					}
					@keyframes shift-5 {
						0% {
							transform: translateY(0);
						}
						100% {
							transform: translateY(5px);
						}
					}
					@keyframes shift-half {
						0% {
							transform: translateY(-50%);
						}
						100% {
							transform: translateY(0);
						}
					}
				`}</style>
				<div className="frame" {...{ xmlns: "http://www.w3.org/1999/xhtml" }}>
					<div className="frame-image">
						{cover ? (
							<Cover
								playing={isPlaying}
								src={`data:image/jpeg;base64,${cover}`}
							/>
						) : (
							<SpotifyLogo />
						)}
					</div>
					<div className="frame-body">
						<div className="frame-body-content">
							<TrackInfo artist={artist} track={track} />
						</div>
						{hasTrack && (
							<div className="frame-body-status">
								{isPlaying ? (
									<div className="frame-body-status-playing">
										<RefreshIcon />
										<Equalizer />
									</div>
								) : (
									<Pause />
								)}
							</div>
						)}
						{isPlaying && (
							<div className="frame-progress">
								<Progress
									playing={isPlaying}
									progress={progress}
									duration={duration}
								/>
							</div>
						)}
					</div>
				</div>
			</foreignObject>
		</svg>
	);
}
