import React, { ReactNode, useRef } from 'react'

interface PropType {
	content: string;
	children: ReactNode;
}

export default function Tooltip({ content, children }: PropType) {
	const tooltipRef = useRef<HTMLSpanElement>(null);
	const container = useRef<HTMLDivElement>(null);
	return (
		<div ref={container}
		onMouseEnter={({clientX})=>{
			if(!tooltipRef.current || !container.current) return;
			const {left} = container.current.getBoundingClientRect();
			tooltipRef.current.style.left = (clientX-left) +"px";
		}} className='group relative '>
			{children}
			<span ref={tooltipRef}
				className={`hidden absolute  z-10 group-hover:block opacity-0
				group-hover:opacity-100 transition rouneded -bottom-20
				whitespace-nowrap text-slate-900 bg-slate-400 p-2 rounded`}>
				{content}
			</span>
		</div>
	)
}
