import { h, Fragment } from "preact";

export default function Pause() {
	return (
		<Fragment>
			<style>{`
				.pause {
					display: flex;
					justify-content: center;
					align-items: center;
					box-sizing: border-box;
					border: 1px solid #ccc;
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
				.pause:before,
				.pause:after {
					display: block;
					height: 9px;
					width: 3px;
					margin: 1px;
					content: '';
					background: #ccc;
				}
			`}</style>
			<div className="pause" />
		</Fragment>
	);
}
