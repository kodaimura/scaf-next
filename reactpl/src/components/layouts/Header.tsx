import React from 'react';


export const Header = (props: {
	rightContent: React.ReactNode
}) => {

	return (
		<header className="navbar is-dark mb-3">
		<div className="navbar-brand">
			<a className="navbar-item" href="/">REACTPL</a>
		</div>

		<div className="navbar-end">
			<div className="navbar-item">{props.rightContent}</div>
		</div>
		</header>
	);
}