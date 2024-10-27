import React, { useState } from 'react'
import Loading from '../../../loading';
import Alert from '../../../alert';
import { forgetPasswordAdminRoute } from '../../../../utils/apiRoutes';
import { postMethode } from '../../../../utils/apiFetchs';

function ForgetPassword() {
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState({
        email: ""
    });
    const [alert, setAlert] = useState({
        display: false,
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAlert({
            display: false,
        });
        try {
            const response = await postMethode(forgetPasswordAdminRoute, inputs);
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });
        } catch (err) {
            setAlert({
                display: true,
                status: false,
                text: err.response.data.msg
            });
        } finally {
            setLoading(false);
        }
    }
    return (
        <dialog id="forgetPassword" className="modal">
            <div className='modal-box'>
                <h3 className="font-bold text-lg mb-[0.5rem]">تغيير كلمة المرور</h3>
                <hr />
                {alert.display && <Alert msg={alert} />}
                <input type="email" placeholder='البريد الالكتروني' className='input input-bordered w-full' onChange={(event) => {
                    setInputs({
                        email: event.target.value
                    })
                }} />
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

export default ForgetPassword