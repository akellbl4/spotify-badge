import { h, Fragment } from "preact";

type Props = {
	src: string;
	playing: boolean;
};

export default function Cover({ src, playing }: Props) {
	return (
		<Fragment>
			<style>{`
				.cover {
					height: 100%;
					width: 100%;
					overflow: hidden;
					border-radius: 2px;
					box-shadow: ${playing ? "0px 1px 4px rgb(0 0 0 / 20%)" : "none"}
				}
			`}</style>
			<img className="cover" src={src} />
		</Fragment>
	);
}
