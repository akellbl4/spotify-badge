import { h, Fragment } from "preact";

export default function Progress({ playing, progress, duration }) {
	return (
		<Fragment>
			<style>{`
				.progress {
					position: relative;
					width: 100%;
					height: 3px;
					background: #EAEAEA;
					overflow: hidden;
					border-radius: 3px;
				}
				.progress:before {
					position: absolute;
					top: 0;
					left: 0;
					content: '';
					width: 100%;
					height: 100%;
					background-color: ${playing ? "#10a242" : "rgba(0, 0, 0, 0.1);"};
					transform: translateX(-100%);
					animation: progress ${duration}ms linear;
					animation-delay: -${progress}ms;
					animation-play-state: ${playing ? "running" : "paused"}
					border-radius: 3px;
				}
				@keyframes progress {
					0% {
						transform: translateX(-100%);
					}
					100% {
						transform: translateX(0);
					}
				}
			`}</style>
			<div className="progress" />
		</Fragment>
	);
}
