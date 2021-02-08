import { h } from "preact";

const width = 540;
const height = 48;

type PlayerProps = {
	cover?: string;
	track?: string;
	artist?: string;
	duration?: number;
	progress?: number;
};

export default function Player({ track = "Not playing", artist = "Spotify", cover }: PlayerProps) {
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
                    .player {
                        border-radius: 6px;
                        background-color: #fff;
                        padding: 8px;
                        display: flex;
                        align-items: center;
                        font-size: 16px;
                        font-weight: 400;
                        line-height: 1.5;
                        font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .cover {
                        flex-shrink: 0;
                        border-radius: 2px;
                        overflow: hidden;
                    }
                    .track {
                        margin-left: 12px;
                        font-weight: 500;
                        color: #333;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        flex-shrink: 0;
                    }
                    .artist {
                        color: #6b7280;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        flex-shrink: 0;
                    }
                `}</style>
				<div className="player" xmlns="http://www.w3.org/1999/xhtml">
					{cover ? (
						<img className="cover" src={`data:image/jpeg;base64,${cover}`} width="32" height="32" />
					) : (
						<svg
							className="spotify-logo"
							width="32"
							height="32"
							viewBox="0 0 168 168"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill="#1ED760"
								d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"
							/>
						</svg>
					)}
					<span className="track text">{track}</span>
					<span className="artist text">
						&nbsp;&nbsp;–&nbsp;&nbsp;
						{artist}
					</span>
				</div>
			</foreignObject>
		</svg>
	);
}
