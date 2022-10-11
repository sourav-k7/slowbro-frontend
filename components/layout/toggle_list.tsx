import React, { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa';
import { useSpring, animated } from 'react-spring'
import useMeasure from 'react-use-measure'

interface PropType {
	title: String,
	children: JSX.Element | JSX.Element[];
}

export default function ToggleTaskList({
	title, children
}: PropType) {
	const [isExpanded, setIsExpanded] = useState(false);
	const [listRef, bounds] = useMeasure()

	function onToggleList() {
		setIsExpanded(state => !state)
	}

	const toggleWrapperAnimatedStyle = useSpring({ transform: !isExpanded ? 'rotate(0deg)' : 'rotate(180deg)' })
	const contentAnimatedStyle = useSpring({
		height: isExpanded ? bounds.height : 0
	})

	return (
		<div className='bg-gray-900 p-3 rounded-md font-semibold my-2' onClick={onToggleList}>
			<div className='flex justify-between my-1 items-center cursor-pointer'>
				{title}

				<animated.div style={toggleWrapperAnimatedStyle}>
					<FaChevronDown />
				</animated.div>

			</div>
			<animated.div style={contentAnimatedStyle} className={`overflow-hidden`}>
				<div ref={listRef}>
					{children}
				</div>
			</animated.div>
		</div>
	)
}
