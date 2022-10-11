import React from 'react'

interface PropType {
	question:String,
	answer:String,
}

export default function QuestionTile({question,answer}:PropType) {
  return (
	<div className='bg-slate-600 mb-1 p-3 rounded'>
		<div className='text-red-400'>{question}</div>
		<div>{answer}</div>
	</div>
  )
}
