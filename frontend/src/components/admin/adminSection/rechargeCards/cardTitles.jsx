import { faMagnifyingGlass, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../screens/admin/homeAdmin';
import { CardsTitleModel, DeleteCardsTitleModel } from '../modal';
import { getGroupCardsRoute } from '../../../../utils/apiRoutes';
import { getMethode } from '../../../../utils/apiFetchs';
import LoadingScreen from '../../../loadingScreen';

function CardTitles() {
    const navigate = useNavigate();
    const socket = useSocket();
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [startTyping, setStartTyping] = useState(false);
    const [cardTitles, setCardTitles] = useState([]);
    const [idCardGroupe, setIdCardGroupe] = useState(false);

    // Fetch card titles
    const fetchCardTitles = async () => {
        setLoading(true);
        try {
            const response = await getMethode(`${getGroupCardsRoute}?query=${query}`);
            setCardTitles(response.data.cardGroups);
        } catch (err) {
            if (err.response.status === 401 || err.response.status === 403) {
                return navigate("/admin/auth");
            }
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        // Debounce effect to delay search until user stops typing
        const delayDebounce = setTimeout(() => {
            if (startTyping) {
                fetchCardTitles(query); // Function to fetch all users
            }
        }, 500); // Delay time in ms

        return () => clearTimeout(delayDebounce); // Clean up the timeout
    }, [query]);
    useEffect(() => {
        fetchCardTitles();
    }, [query]);

    return (
        <div>
            <div className='flex sm:flex-row flex-col gap-[1rem] justify-between'>
                <button
                    className='btn btn-primary shadow-sm shadow-gray-400'
                    onClick={() => document.getElementById('cardsTitleModel').showModal()}
                >
                    انشاء مجموعة البطاقات
                </button>
                <div className="join">
                    <div>
                        <div>
                            <input
                                className="input bg-black text-white input-bordered join-item"
                                placeholder="أبحث عن مجموعة البطاقات"
                                value={query}
                                onChange={(e) => {
                                    setStartTyping(true);
                                    setQuery(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="indicator">
                        <button className="btn join-item" onClick={fetchCardTitles}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </div>
            </div>
            <LoadingScreen loading={loading} component={
                <div id='table' className="overflow-x-auto mt-[1rem]">
                    <table className="table bg-white">
                        <thead className='text-[1rem]'>
                            <tr>
                                <th>المعرف</th>
                                <th>الاسم</th>
                                <th>تم إنشاؤه</th>
                                <th>تم إنشاؤه بواسطة</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className='text-[1rem]'>
                            {cardTitles.length > 0 ? (
                                cardTitles.map((card, index) => (
                                    <tr key={card._id}>
                                        <td>{card.id}</td>
                                        <td>{card.name}</td>
                                        <td>{card.createdAt}</td>
                                        <td>{card.createdBy?.username || "غير معروف"}</td>
                                        <td><button className='btn btn-error text-white' onClick={() => {
                                            setIdCardGroupe(card._id);
                                            document.getElementById('deleteCardsTitleModel').showModal()
                                        }}><FontAwesomeIcon icon={faTrash} /></button></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">لا توجد بيانات</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            } />
            <CardsTitleModel setCardTitles={setCardTitles} />
            <DeleteCardsTitleModel idCardGroupe={idCardGroupe} setCardTitles={setCardTitles}/>
        </div>
    );
}

export default CardTitles;
