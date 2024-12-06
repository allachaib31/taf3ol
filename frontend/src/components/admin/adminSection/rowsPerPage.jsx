import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function RowsPerPage() {
    return (
        <div className='flex justify-end items-center gap-[1rem]'>
            <h1 className='sm:block hidden'>Rows per page.</h1>
            <select className="select select-bordered w-full max-w-[5rem]">
                <option>5</option>
                <option>10</option>
                <option>15</option>
                <option>All</option>
            </select>
            <h1>1-10 of 682</h1>
            <div className="join grid grid-cols-2">
                <button className="join-item btn btn-outline"><FontAwesomeIcon icon={faArrowRight} /></button>
                <button className="join-item btn btn-outline"><FontAwesomeIcon icon={faArrowLeft} /></button>
            </div>
        </div>
    )
}

export default RowsPerPage