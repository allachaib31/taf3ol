import React, { useRef, useState } from 'react'
import Alert from '../../../../alert'
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../../screens/admin/homeAdmin';
import { handleFileChange, handleFileClick } from '../../../../../utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import Loading from '../../../../loading';

function CardsTitleModel() {
    const navigate = useNavigate();
    const socket = useSocket();
    const fileInputRef = useRef(null);
    const [inputs, setInputs] = useState({
        name: "",
        image: "",
    })
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({
        display: false,
    });

    const handleSubmit = async (e) => {

    }
    return (
        <dialog id="cardsTitleModel" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-[0.5rem]">انشاء مجموعة البطاقات</h3>
                <hr />
                <form action="" className="flex flex-col gap-[1rem] mt-[1rem]">
                    {alert.display && <Alert msg={alert} />}
                    <label className="input input-bordered flex items-center gap-2">
                    الاسم
                        <input type="text" className="grow" onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    name: event.target.value
                                }
                            })
                        }} />
                    </label>
                    <button
                        className="btn btn-secondary w-full"
                        type="button"
                        onClick={() => handleFileClick(fileInputRef)}
                    >
                        <FontAwesomeIcon icon={faUpload} /> تحميل صورة
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={(event) => handleFileChange(event,setInputs)}
                        accept="image/png, image/gif, image/jpeg"
                    />
                </form>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn ml-[0.5rem]">اغلاق</button>
                        <button disabled={loading} className='btn btn-primary' onClick={handleSubmit}>{loading ? <Loading /> : 'ارسال'}</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default CardsTitleModel