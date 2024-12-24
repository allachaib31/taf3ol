import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../screens/admin/homeAdmin';
import { CardsTitleModel } from '../modal';

function CardTitles() {
    const navigate = useNavigate();
    const socket = useSocket();
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [startTyping, setStartTyping] = useState(false);

    return (
        <div>
            <div className='flex sm:flex-row flex-col gap-[1rem] justify-between'>
                <button className='btn btn-primary shadow-sm
     shadow-gray-400' onClick={() => document.getElementById('cardsTitleModel').showModal()}>انشاء مجموعة البطاقات</button>
                <div className="join">
                    <div>
                        <div>
                            <input className="input bg-black text-white input-bordered join-item" placeholder="أبحث عن مجموعة البطاقات"
                                value={query}
                                onChange={(e) => {
                                    setStartTyping(true);
                                    setQuery(e.target.value)
                                }} />
                        </div>
                    </div>
                    <div className="indicator">
                        <button className="btn join-item"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                    </div>
                </div>
            </div>
            <div id='table' className="overflow-x-auto mt-[1rem]">
                <table className="table bg-white">
                    <thead className='text-[1rem]'>
                        <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </th>
                        <th>المعرف</th>
                        <th>الاسم</th>
                        <th>تم إنشاؤه</th>
                        <th>تم إنشاؤه بواسطة</th>
                    </thead>
                </table>
            </div>
            <CardsTitleModel />
        </div>
    )
}

export default CardTitles