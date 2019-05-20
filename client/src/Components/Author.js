import React from 'react'
import Globe from '../img/example.svg'

const Author = () => {


	return(
		<div className='author'>
			<svg className='author__globe'>
				<use xlinkHref={`${Globe}#globe`}></use>
			</svg>
			<a href='https://www.michalantczak.com' className='author__btn'>Visit my website</a>
		</div>
		)
		
		
}

export default Author;