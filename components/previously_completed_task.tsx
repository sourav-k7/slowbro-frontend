import React,{useEffect,useState,useRef} from 'react'
import useDragDrop from '../hooks/drag_drop_hook'
import { useAppDispatch, useAppSelector } from '../hooks/redux_hooks';
import { selectTask } from '../redux/task/task';
import { getAllPreviouslyCompletedTask } from '../redux/task/taskServices';
import { ListType, SelectTaskPayloadType } from '../redux/task/taskTypes';
import ToggleTaskList from './layout/toggle_list'
import TaskTitleTile from './task_title_tile'

export default function PreviouslyCompletedTask() {
	const [setDragId, handleDrop] = useDragDrop(ListType.previous);
	const dispatch = useAppDispatch();
	// const lastElementRef = useRef() as React.MutableRefObject<HTMLInputElement>;
	const previouslyCompletedTask = useAppSelector(state => state.task.previouslyCompletedTask);
	const selectedProject = useAppSelector(state => state.task.selectedProject);
	// const [lastElementVisible, setLastElementVisible] = useState<boolean>();

	// useEffect(() => {
	// 	const observer = new IntersectionObserver((entries) => {
	// 	  const entry = entries[0];
	// 	  setLastElementVisible(entry.isIntersecting);
	// 	});
	// 	observer.observe(lastElementRef.current);
	//   }, []);
	
	  useEffect(() => {
		  dispatch<any>(getAllPreviouslyCompletedTask(previouslyCompletedTask.length));
	  }, []);



	return (
		<ToggleTaskList title={'Previously completed task'}>
		
			{previouslyCompletedTask
				.filter(tk => tk.project == selectedProject?._id)
				.map((tk) =>
					<TaskTitleTile
						title={tk.task}
						id={tk._id}
						key={tk._id}
						point={tk.point}
						handleClick={() => dispatch(selectTask({ id: tk._id, type: ListType.today } as SelectTaskPayloadType))}
						handleDrag={() => { setDragId(tk._id) }}
						handleDrop={() => { handleDrop(tk._id) }}
					/>
				)}
				
		</ToggleTaskList>
	)
}
