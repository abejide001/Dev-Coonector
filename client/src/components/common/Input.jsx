import React from 'react';

export default function Input(props) {
    console.log(props)
	return (
		<div>
			<input
				type={props.type}
				className={props.className}
				placeholder={props.placeholder}
				name={props.name}
				value={props.value}
				onChange={props.onChange}
			/>
		</div>
	);
}
