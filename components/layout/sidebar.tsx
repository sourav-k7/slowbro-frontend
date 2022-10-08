import React,{useState} from 'react'
import { animated, useSpring } from 'react-spring'

interface PropTypes {
	isSidebarOpen:boolean
	
}

export default function Sidebar({isSidebarOpen}:PropTypes) {
	let sidebarWidth = 300;
	
	if(typeof window !=='undefined'){
		sidebarWidth=(2*window.innerWidth)/5;
	}
	const sidebarStyle = useSpring({
	  width:isSidebarOpen?sidebarWidth:0
	});

  return (
	<animated.div style={sidebarStyle} className={`overflow-x-hidden  `}>
			<div className='h-full bg-gray-900'>

			</div>
	</animated.div>
  )
}
