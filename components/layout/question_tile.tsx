import React, { useState } from 'react'

interface PropType {
	question:String,
	answer:any,
}

export default function QuestionTile({question,answer}:PropType) {
	const [inputAnswer,setInputAnswer] = useState(answer);
  return (
	<div className='bg-slate-600 mb-1 p-3 rounded'>
		<div className=''>{question}</div>
		<textarea 
		className={`multiline-input-field w-full`}
		value={inputAnswer} 
		onChange={()=>{}}
		/>
	</div>
  )
}
