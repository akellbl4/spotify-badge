import { Fragment, h } from "preact";

import Pause from "./Pause";
import Cover from "./Cover";
import Progress from "./Progress";
import Equalizer from "./Equalizer";
import TrackInfo from "./TrackInfo";
import SpotifyLogo from "./SpotifyLogo";
import { RefreshIcon } from "./RefreshIcon";

const width = 540;
const height = 50;

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
						height: 20px;
						flex-grow: 1;
						overflow: hidden;
						align-items: center;
						animation: shift-6 0.2s;
						animation-fill-mode: forwards;
						animation-delay: var(--delay);
					}
					.frame-body-status {
						margin-left: 12px;
						width: 20px;
						height: 20px;
						overflow: hidden;
						flex-shrink: 0;
						animation: shift-6 0.2s;
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
					@keyframes shift-6 {
						0% {
							transform: translateY(0);
						}
						100% {
							transform: translateY(6px);
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

// .player {
// 		position: relative;
// 		border-radius: 6px;
// 		background-color: #fff;
// 		padding: 8px;
// 		display: flex;
// 		align-items: center;
// 		font-size: 16px;
// 		font-weight: 400;
// 		line-height: 1.5;
//
// 		white-space: nowrap;
// 		overflow: hidden;
// 		text-overflow: ellipsis;
// 	}
// 	.spotify-logo {
// 		flex-shrink: 0;
// 	}
// 	.cover {
// 		flex-shrink: 0;
// 		border-radius: 4px;
// 		overflow: hidden;
// 		animation: appear 0.5s ease-out forwards;
// 	}
// 	.text {
// 		position: relative;
// 		overflow: hidden;
// 		margin-right: 20px;
// 		margin-bottom: 8px;
// 		padding-right: 40px;
// 	}
// 	.text:after {
// 		position: absolute;
// 		top: 0;
// 		right: 0;
// 		display: block;
// 		content: '';
// 		height: 100%;
// 		width: 40px;
// 		background: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
// 	}
// 	.track {
// 		margin-left: 12px;
// 		font-weight: 500;
// 		color: #333;
// 		flex-shrink: 0;
// 	}
// 	.artist {
// 		color: #6b7280;
// 		flex-shrink: 0;
// 	}
// 	.progress {
// 		position: absolute;
// 		bottom: 10px;
// 		left: 60px;
// 		width: 430px;
// 		height: 3px;
// 		background: #e0eaec;
// 		overflow: hidden;
// 		border-radius: 3px;
// 	}
// 	.progress:before {
// 		position: absolute;
// 		top: 0;
// 		left: 0;
// 		content: '';
// 		width: 100%;
// 		height: 100%;
// 		background-color: #10a242;
// 		transform: translateX(-100%);
// 		animation: progress ${duration}ms linear infinite;
// 		animation-delay: -${progress}ms;
// 		border-radius: 3px;
// 	}
// 	.progress-paused:before {
// 		animation-play-state: paused;
// 		background: #e1e4e8;
// 	}
// 	.equalizer {
// 		flex-shrink: 0;
// 		overflow: hidden;
// 		position: relative;
// 		width: 20px;
// 		height: 20px;
// 		display: flex;
// 		margin-left: auto;
// 	}
// 	.equalizer-line {
// 		background: #0da242;
// 		height: 100%;
// 		width: 3px;
// 		transition: .8s;
// 		animation: equalize 4s linear infinite;
// 		margin-left: 3px;
// 	}
// 	.equalizer-line:nth-child(1) {
// 		animation-delay: -1.9s;
// 	}
// 	.equalizer-line:nth-child(2) {
// 		animation-delay: -2.9s;
// 	}
// 	.equalizer-line:nth-child(3) {
// 		animation-delay: -3.9s;
// 	}
// 	@keyframes equalize {
// 		0% {
// 			transform: translateY(90%);
// 		}
// 		4% {
// 			transform: translateY(77%);
// 		}
// 		8% {
// 			transform: translateY(73%);
// 		}
// 		12% {
// 			transform: translateY(52%);
// 		}
// 		16% {
// 			transform: translateY(38%);
// 		}
// 		20% {
// 			transform: translateY(52%);
// 		}
// 		24% {
// 			transform: translateY(73%);
// 		}
// 		28% {
// 			transform: translateY(13%);
// 		}
// 		32% {
// 			transform: translateY(73%);
// 		}
// 		36% {
// 			transform: translateY(90%);
// 		}
// 		40% {
// 			transform: translateY(38%);
// 		}
// 		44% {
// 			transform: translateY(73%);
// 		}
// 		48% {
// 			transform: translateY(90%);
// 		}
// 		52% {
// 			transform: translateY(52%);
// 		}
// 		56% {
// 			transform: translateY(20%);
// 		}
// 		60% {
// 			transform: translateY(52%);
// 		}
// 		64% {
// 			transform: translateY(90%);
// 		}
// 		68% {
// 			transform: translateY(52%);
// 		}
// 		72% {
// 			transform: translateY(90%);
// 		}
// 		76% {
// 			transform: translateY(38%);
// 		}
// 		80% {
// 			transform: translateY(90%);
// 		}
// 		84% {
// 			transform: translateY(69%);
// 		}
// 		88% {
// 			transform: translateY(90%);
// 		}
// 		92% {
// 			transform: translateY(38%);
// 		}
// 		96% {
// 			transform: translateY(90%);
// 		}
// 		100% {
// 			transform: translateY(90%);
// 		}
// 	}
// 	@keyframes progress {
// 		0% {
// 			transform: translateX(-100%);
// 		}
// 		100% {
// 			transform: translateX(0);
// 		}
// 	}
// {
// 	cover ? (
// 		<img
// 			className="cover"
// 			src={`data:image/jpeg;base64,${cover}`}
// 			width="40"
// 			height="40"
// 		/>
// 	) : (
// 		<svg
// 			className="spotify-logo"
// 			width="40"
// 			height="40"
// 			viewBox="0 0 168 168"
// 			xmlns="http://www.w3.org/2000/svg"
// 		>
// 			<path
// 				fill="#1ED760"
// 				d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"
// 			/>
// 		</svg>
// 	);
// }
// <div className="text">
// 	<span className="track">{track}</span>
// 	<span className="artist">&nbsp;&nbsp;–&nbsp;&nbsp;{artist}</span>
// </div>;
// {
// 	isPlaying && (
// 		<div className="equalizer">
// 			<div className="equalizer-line"></div>
// 			<div className="equalizer-line"></div>
// 			<div className="equalizer-line"></div>
// 		</div>
// 	);
// }
// {
// 	progress && (
// 		<div className={cn("progress", { "progress-paused": !isPlaying })} />
// 	);
// }
