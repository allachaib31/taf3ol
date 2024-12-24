import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function RowsPerPage({ page, setPage, limit, setLimit, totalPages, setTotalPages, totalItem }) {
    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1);
    };
    const handleLimitChange = (e) => {
        //const value = e.target.value === "All" ? totalItem : parseInt(e.target.value, 10);
        setLimit(e.target.value);
        setPage(1); // Reset to the first page when limit changes
    };
    return (
        <div className='flex justify-end items-center gap-[1rem]'>
            <h1 className='sm:block hidden'>Rows per page.</h1>
            <select
                className="select select-bordered w-full max-w-[5rem]"
                value={limit === totalItem ? "All" : limit}
                onChange={handleLimitChange}
            >
                <option selected value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={"ALL"}>All</option>
            </select>
            <h1>
                {`${(page - 1) * limit + 1}-${Math.min(page * limit, totalItem)} of ${totalItem}`}
            </h1>
            <div className="join grid grid-cols-2">
                <button
                    className="join-item btn btn-outline"
                    onClick={handlePrevPage}
                    disabled={page === 1}
                >
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
                <button
                    className="join-item btn btn-outline"
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                ><FontAwesomeIcon icon={faArrowLeft} />

                </button>
            </div>
        </div>
    )
}

export default RowsPerPage