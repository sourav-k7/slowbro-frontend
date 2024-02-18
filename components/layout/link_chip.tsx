import React from 'react'
import { Link } from '../../model/task'
import { MdCancel } from "react-icons/md";

interface PropType {
	link: Link
	onRemove: (link: Link) => void,
	bgColor: string,
}

export default function LinkChip({ link, onRemove, bgColor  }: PropType) {
	return (
		<span className={`${bgColor} px-3 py-2 rounded-full`}>

		<a href={link.path} target='_blank' rel='noreferrer'
			className=''>
			{link.title}
			&ensp;
		</a>
			<MdCancel className='inline cursor-pointer' size={17} onClick={() => onRemove(link)} />
				</span>
	)
}
