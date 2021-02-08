import { h } from "preact";

type RefreshTokenProps = {
	token?: string;
};

export default function RefreshToken({ token }: RefreshTokenProps) {
	return (
		<html>
			<head>
				<style>{`
                    body {
                        font-size: 16px;
                        font-weight: 400;
                        line-height: 1.5;
                        font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
                        color: #333;
                    }
                    pre {
                        max-width: 600px;
                        padding: 16px;
                        border-radius: 4px;
                        background-color: #f5f5f5;
                        overflow-wrap: break-word;
                        white-space: pre-wrap;
                    }
                `}</style>
			</head>
			<body>
				{token ? (
					<div>
						<h3>Refresh token:</h3>
						<pre>{token}</pre>
					</div>
				) : (
					<div>Invalid authorization code</div>
				)}
			</body>
		</html>
	);
}
