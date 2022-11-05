import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';

interface PropType {
	question: String,
	answer: any,
	bgColor: string,
	handleRemove: () => void,
	handleAnswerUpdate: (a: string) => void
}

export default function QuestionTile({ question, answer, bgColor, handleRemove, handleAnswerUpdate }: PropType) {
	const [inputAnswer, setInputAnswer] = useState(answer);


	return (
		<div className={`${bgColor} mb-1 p-3 rounded relative`} >
			<AiOutlineClose className='absolute -right-1 -top-1 bg-slate-400 text-slate-900 p-1 rounded-full cursor-pointer'
				size={20} onClick={handleRemove} />
			<div className='mb-1 font-semibold'>Q. {question}</div>
			<textarea
				className={`multiline-input-field w-full `}
				value={inputAnswer}
				onChange={(event) => { setInputAnswer(event.target.value) }}
			/>
			{inputAnswer != answer &&
				<div>
					<button className='bg-slate-500 text-slate-900 mr-2 px-2 rounded'
						onClick={() => handleAnswerUpdate(inputAnswer)}
					>
						Save
					</button>
					<button onClick={() => setInputAnswer(answer)}>Cancel</button>
				</div>
			}
		</div>
	)
}
