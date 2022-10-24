import React, { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa';
import { config, useTransition, animated } from 'react-spring';

interface PropType {
	selectedOption: string,
	Options: string[],
	onOptionClick: (a: number) => void
}

export default function DropDownMenu({ selectedOption, Options, onOptionClick }: PropType) {
	const [isMenuVisible, setIsMenuVisible] = useState(false);

	const transitions = useTransition(isMenuVisible, {
		from: {
			opacity: 0,
			transform: `scale(0.9)`,
			transformOrigin: "top right"
		},
		enter: { opacity: 1, transform: `scale(1)` },
		leave: { opacity: 0, transform: `scale(0)` },
		config: config.wobbly
	});

	function toggleProjectMenu() {
		setIsMenuVisible(state => !state);
	}

	return (
		<button onClick={toggleProjectMenu} className='relative bg-slate-700 w-full rounded flex justify-between items-center px-2 py-1'>
			{selectedOption}
			<FaChevronDown />
			{transitions((props: any, item: any) =>
				item && (
					<animated.div
						style={props}
						className="mt-2 absolute top-7 right-0 w-full origin-top-right rounded overflow-hidden z-10"
					>
						{
							Options.map((opt, index) => (
								<div className='bg-slate-500 text-slate-900  py-1' key={index} 
									onClick={onOptionClick.bind(null, index)}>
									{opt}
								</div>

							))
						}
					</animated.div>
				)
			)
			}
		</button>
	)
}
