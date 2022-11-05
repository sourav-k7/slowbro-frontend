import { PriorityType } from "../model/task";
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { TbEqual } from 'react-icons/tb';

function priorityIcon(priority: PriorityType | undefined) {
	switch (priority) {
		case PriorityType.high:
			return <IoIosArrowUp className='text-red-400' />
		case PriorityType.medium:
			return <TbEqual className='text-blue-300' />
		case PriorityType.low:
			return <IoIosArrowDown className='text-yellow-300' />
	}
}

export default priorityIcon;