import React from 'react'
import logo from "../../../images/Logo.png";
import { useOutletContext } from 'react-router-dom';
function Services() {
  const { t, i18n } = useOutletContext();
  return (
    <div className='relative z-50'>
      <div className='flex sm:flex-row flex-col gap-5 sm:gap-0 justify-between'>
        <select className="select select-bordered text-[1rem] font-bold bg-black text-white w-full sm:max-w-xs">
          <option selected disabled>{t('select_1_option_1_services')}</option>
          <option value="">{t('select_1_option_2_services')}</option>
          <option value="">{t('select_1_option_3_services')}</option>
          <option value="">{t('select_1_option_4_services')}</option>
        </select>
        <div className="join ">
          <div>
            <div>
              <input className="input input-bordered join-item" placeholder={t('placeholder_1_services')} />
            </div>
          </div>
          <div className="indicator">
            <button className="btn btn-primary join-item font-bold text-[1rem]">{t('button_1_services')}</button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto mt-[2rem]">
        <table className="table table-zebra">
          {/* head */}
          <thead className='bg-primary text-black text-[1rem]'>
            <tr>
              <th><input type="checkbox" className="checkbox" /></th>
              <th>{t('table_1_th_1_services')} </th>
              <th>{t('table_1_th_2_services')}</th>
              <th>{t('table_1_th_3_services')}</th>
              <th>{t('table_1_th_4_services')}</th>
              <th>{t('table_1_th_5_services')}</th>
              <th>{t('table_1_th_6_services')}</th>
              <th>{t('table_1_th_7_services')}</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th><input type="checkbox" className="checkbox" /></th>
              <td>1</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><button onClick={() => document.getElementById('serviceDetail').showModal()} className='btn btn-primary'>{t('table_1_button')}</button></td>
            </tr>
            {/* row 2 */}
            <tr>
              <th><input type="checkbox" className="checkbox" /></th>
              <td>2</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><button onClick={() => document.getElementById('serviceDetail').showModal()} className='btn btn-primary'>{t('table_1_button')}</button></td>
            </tr>
            {/* row 3 */}
            <tr>
              <th><input type="checkbox" className="checkbox" /></th>
              <td>3</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><button onClick={() => document.getElementById('serviceDetail').showModal()} className='btn btn-primary'>{t('table_1_button')}</button></td>
            </tr>
            <tr>
              <th><input type="checkbox" className="checkbox" /></th>
              <td>4</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><button onClick={() => document.getElementById('serviceDetail').showModal()} className='btn btn-primary'>{t('table_1_button')}</button></td>
            </tr>
            <tr>
              <th><input type="checkbox" className="checkbox" /></th>
              <td>5</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><button onClick={() => document.getElementById('serviceDetail').showModal()} className='btn btn-primary'>{t('table_1_button')}</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <dialog id="serviceDetail" className="modal">
        <div className="modal-box max-w-[70rem] p-0">
          <div className='bg-black flex justify-center py-[1rem]'>
            <img src={logo} className='w-[107px] sm:w-[168px] sm:h-auto h-[50px]' alt="" />
          </div>
          <div className='p-[1rem]'>
            <p className='text-center'>{t('modal_1_title_services')}</p>
            <div className='mt-[1rem]'>
              <div className='flex flex-wrap gap-2 sm:gap-0 justify-center sm:justify-around'>
                <div>
                  <div className='w-32 sm:w-44 md:w-56 text-center bg-black text-primary p-[1rem] text-[0.8rem] sm:text-xl md:text-2xl font-bold mb-[1rem]'>
                    {t('modal_1_placeholder_1_services')}
                  </div>
                  2 دقيقة
                </div>
                <div>
                  <div className='w-32 sm:w-44 md:w-56 text-center bg-black text-primary p-[1rem] text-[0.8rem] sm:text-xl md:text-2xl font-bold mb-[1rem]'>
                    {t('modal_1_placeholder_2_services')}
                  </div>

                </div>
                <div>
                  <div className='w-32 sm:w-44 md:w-56 text-center bg-black text-primary p-[1rem] text-[0.8rem] sm:text-xl md:text-2xl font-bold mb-[1rem]'>
                    {t('modal_1_placeholder_3_services')}
                  </div>

                </div>
              </div>
              <div className='mt-[1rem] flex flex-wrap gap-2 sm:gap-0 justify-center sm:justify-around'>
                <div>
                  <div className='w-32 sm:w-44 md:w-56 text-center bg-black text-primary p-[1rem] text-[0.8rem] sm:text-xl md:text-2xl font-bold mb-[1rem]'>
                    {t('modal_1_placeholder_4_services')}
                  </div>

                </div>
                <div>
                  <div className='w-32 sm:w-44 md:w-56 text-center bg-black text-primary p-[1rem] text-[0.8rem] sm:text-xl md:text-2xl font-bold mb-[1rem]'>
                    {t('modal_1_placeholder_5_services')}
                  </div>

                </div>
                <div>
                  <div className='w-32 sm:w-44 md:w-56 text-center bg-black text-primary p-[1rem] text-[0.8rem] sm:text-xl md:text-2xl font-bold mb-[1rem]'>
                    {t('modal_1_placeholder_6_services')}
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div className="modal-action m-[1rem]">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">{t('modal_1_button_1_services')}</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default Services