import { PriorityType } from "../../model/task";
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { TbEqual } from 'react-icons/tb';

function priorityIcon(priority: PriorityType | undefined) {
	switch (priority) {
		case PriorityType.high:
			return <IoIosArrowUp  />
		case PriorityType.medium:
			return <TbEqual  />
		case PriorityType.low:
			return <IoIosArrowDown />
	}
}

export default priorityIcon;