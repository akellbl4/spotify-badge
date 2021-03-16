import { h, Fragment } from "preact";

export default function Equalizer() {
	return (
		<Fragment>
			<style>{`
				.equalizer {
					overflow: hidden;
					position: relative;
					width: 20px;
					height: 20px;
					display: flex;
					margin-left: auto;
				}
				.equalizer-line {
					display: block;
					content: '';
					height: 100%;
					width: 3px;
					transition: .8s;
					animation: equalize 4s linear infinite;
					background: #EAEAEA;
				}
				.equalizer-line + .equalizer-line {
					margin-left: 2px;
				}
				.equalizer-line:nth-child(1) {
					animation-delay: -1.9s;
				}
				.equalizer-line:nth-child(2) {
					animation-delay: -2.9s;
				}
				.equalizer-line:nth-child(3) {
					animation-delay: -3.9s;
				}
				@keyframes equalize {
					0% {
						transform: translateY(90%);
					}
					4% {
						transform: translateY(77%);
					}
					8% {
						transform: translateY(73%);
					}
					12% {
						transform: translateY(52%);
					}
					16% {
						transform: translateY(38%);
					}
					20% {
						transform: translateY(52%);
					}
					24% {
						transform: translateY(73%);
					}
					28% {
						transform: translateY(13%);
					}
					32% {
						transform: translateY(73%);
					}
					36% {
						transform: translateY(90%);
					}
					40% {
						transform: translateY(38%);
					}
					44% {
						transform: translateY(73%);
					}
					48% {
						transform: translateY(90%);
					}
					52% {
						transform: translateY(52%);
					}
					56% {
						transform: translateY(20%);
					}
					60% {
						transform: translateY(52%);
					}
					64% {
						transform: translateY(90%);
					}
					68% {
						transform: translateY(52%);
					}
					72% {
						transform: translateY(90%);
					}
					76% {
						transform: translateY(38%);
					}
					80% {
						transform: translateY(90%);
					}
					84% {
						transform: translateY(69%);
					}
					88% {
						transform: translateY(90%);
					}
					92% {
						transform: translateY(38%);
					}
					96% {
						transform: translateY(90%);
					}
					100% {
						transform: translateY(90%);
					}
			`}</style>
			<div className="equalizer">
				<div className="equalizer-line" />
				<div className="equalizer-line" />
				<div className="equalizer-line" />
			</div>
		</Fragment>
	);
}
