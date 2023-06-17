import React from 'react'
import { animated, useTransition } from 'react-spring'

interface PropType {
	children: JSX.Element | JSX.Element[] | string;
	onClose: () => void;
	isVisible: boolean;
}

export default function Modal({ children, onClose, isVisible }: PropType) {

	const modalTtransitions = useTransition(isVisible, {
		from: { opacity: 0, transform: "translateY(-40px)" },
		enter: { opacity: 1, transform: "translateY(0px)" },
	});



	return (
		<div className={`absolute z-10 w-full h-screen flex`}>
			<div onClick={onClose}
				className={`absolute w-full h-full bg-black bg-opacity-50 `} />
				<div className='relative m-auto'>
				{modalTtransitions(
					(prop, item) =>
						item && (
							<animated.div style={prop} className='bg-slate-700 p-3 rounded'>
									{children}
							</animated.div>
						)
				)}
			</div>
		</div>
	)
}
