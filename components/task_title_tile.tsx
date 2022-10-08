import React from 'react'

interface PropTypes {
	title: string,
	id:string,
	handleDrag:(a:any)=>void
	handleDrop:(a:any)=>void
}


export default function TaskTitleTile({ title,handleDrag,handleDrop,id  }: PropTypes) {
	return (

				<div 
				className={`bg-slate-800 p-3 my-1 rounded-md cursor-pointer `}
				draggable={true}
				id={id}
				onDragOver={(ev) => ev.preventDefault()}
				onDragStart={handleDrag}
      onDrop={handleDrop}
				>
					{title}
				</div>
		
	)
}
