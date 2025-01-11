import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useRef, useState } from 'react'
import { handleFileChange, handleFileClick } from '../../../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../../screens/admin/homeAdmin';
import { postMethode, putMethode } from '../../../../../utils/apiFetchs';
import { addPaymentGatewayRoute, getFileRoute, updatePaymentGatewayRoute } from '../../../../../utils/apiRoutes';
import Alert from '../../../../alert';
import Loading from '../../../../loading';

function PaymentGatewayModel({ paymentsGateway, setPaymentsGateway, inputs, setInputs, titleModel }) {
  const navigate = useNavigate();
  const socket = useSocket();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    display: false,
  });
  const fileInputRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({
      display: false,
    });
    try {
      const form = new FormData();
      form.append("name", inputs.name);
      form.append("typePaymentGateway", inputs.typePaymentGateway);
      form.append("link", inputs.link);
      form.append("token", inputs.token);
      form.append("image", inputs.image);
      const response = await postMethode(addPaymentGatewayRoute, form);
      setAlert({
        display: true,
        status: true,
        text: response.data.msg
      });
      setPaymentsGateway((prevPaymentsGateway) => {
        return [...prevPaymentsGateway, response.data.paymentGateway]
      })
      socket.emit('broadcast-notification', {
        msg: response.data.notificationMsg,
        name: "add Payment gateway",
      });
    } catch (err) {
      if (err.response.status == 401 || err.response.status == 403) {
        return navigate("/admin/auth")
      }
      setAlert({
        display: true,
        status: false,
        text: err.response.data.msg
      });
    } finally {
      setLoading(false);
    }
  }
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({
      display: false,
    });
    try {
      const form = new FormData();
      form.append("name", inputs.name);
      form.append("typePaymentGateway", inputs.typePaymentGateway);
      form.append("link", inputs.link);
      form.append("token", inputs.token);
      form.append("image", inputs.image);
      const response = await putMethode(`${updatePaymentGatewayRoute}?id=${inputs._id}`, form);
      setAlert({
        display: true,
        status: true,
        text: response.data.msg
      });
      setInputs((prev) => {
        return {
          ...prev,
          image: response.data.paymentGateway.image
        }
      });
      setPaymentsGateway((prev) => 
        prev.map((gateway) =>
          gateway._id === inputs._id
            ? { ...gateway, ...response.data.paymentGateway }
            : gateway
        )
      );
      socket.emit('broadcast-notification', {
        msg: response.data.contentNotification,
        name: "update payment gateway",
      });
    } catch (err) {
      if (err.response.status == 401 || err.response.status == 403) {
        return navigate("/admin/auth")
      }
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
    <dialog id="PaymentGatewayModel" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{titleModel}</h3>
        <hr />
        <div className='flex flex-col gap-[1rem] mt-[1rem]'>
          {alert.display && <Alert msg={alert} />}
          <label className="input input-bordered flex items-center gap-2">
            اسم
            <input type="text" className="grow" value={inputs.name} onChange={(event) => {
              setInputs((prevInputs) => {
                return {
                  ...prevInputs,
                  name: event.target.value
                }
              })
            }} />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            رابط
            <input type="text" className="grow" value={inputs.link} onChange={(event) => {
              setInputs((prevInputs) => {
                return {
                  ...prevInputs,
                  link: event.target.value
                }
              })
            }} />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            الرمز المميز
            <input type="text" className="grow" value={inputs.token} onChange={(event) => {
              setInputs((prevInputs) => {
                return {
                  ...prevInputs,
                  token: event.target.value
                }
              })
            }} />
          </label>
          <button className='btn btn-secondary w-full' type="button" onClick={() => handleFileClick(fileInputRef)}>
            <FontAwesomeIcon icon={faUpload} /> تحميل صورة
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={(event) => handleFileChange(event, setInputs)}
            accept="image/png, image/gif, image/jpeg"
          />
        </div>
        {titleModel == "تحديث بوابة الدفع" && <img src={`${getFileRoute}${inputs.image}`} alt="" crossOrigin="anonymous" />}
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn ml-[0.5rem]">اغلاق</button>
            {titleModel == "إضافة بوابة الدفع" ?
              <button disabled={loading} className='btn btn-primary' onClick={handleSubmit}>{loading ? <Loading /> : 'ارسال'}</button> :
              <button disabled={loading} className='btn btn-primary' onClick={handleUpdate}>{loading ? <Loading /> : 'تحديث'}</button>
            }
          </form>
        </div>
      </div>
    </dialog>
  )
}

export default PaymentGatewayModel