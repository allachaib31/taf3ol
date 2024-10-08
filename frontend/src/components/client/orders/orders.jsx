import React from 'react'
import { useOutletContext } from 'react-router-dom';

function Orders() {
  const { t, i18n } = useOutletContext();
  return (
    <div className='relative z-50'>
      <div className='flex sm:flex-row flex-col gap-5 sm:gap-0 justify-between'>
        <select className="select select-bordered text-[1rem] font-bold bg-black text-white w-full sm:max-w-xs">
          <option selected disabled>{t('select_1_option_1_orders')}</option>
          <option value="">{t('select_1_option_2_orders')}</option>
          <option value="">{t('select_1_option_3_orders')}</option>
          <option value="">{t('select_1_option_4_orders')}</option>
          <option value="">{t('select_1_option_5_orders')}</option>
          <option value="">{t('select_1_option_6_orders')}</option>
          <option value="">{t('select_1_option_7_orders')}</option>
          <option value="">{t('select_1_option_8_orders')}</option>
        </select>
        <div className="join ">
          <div>
            <div>
              <input className="input input-bordered join-item" placeholder={t('placeholder_1_orders')} />
            </div>
          </div>
          <div className="indicator">
            <button className="btn btn-primary join-item font-bold text-[1rem]">{t('button_1_orders')}</button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto mt-[2rem]">
        <table className="table table-zebra">
          {/* head */}
          <thead className='bg-primary text-black text-[1rem]'>
            <tr>
              <th><input type="checkbox" className="checkbox" /></th>
              <th>{t('table_1_th_1_orders')}</th>
              <th>{t('table_1_th_2_orders')}</th>
              <th>{t('table_1_th_3_orders')}</th>
              <th>{t('table_1_th_4_orders')}</th>
              <th>{t('table_1_th_5_orders')}</th>
              <th>{t('table_1_th_6_orders')}</th>
              <th>{t('table_1_th_7_orders')}</th>
              <th>{t('table_1_th_8_orders')}</th>
              <th>{t('table_1_th_9_orders')}</th>
              <th>{t('table_1_th_10_orders')}</th>
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
              <td></td>
              <td></td>
              <td></td>
              <td></td>
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
              <td></td>
              <td></td>
              <td></td>
              <td></td>
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
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th><input type="checkbox" className="checkbox" /></th>
              <td>4</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th><input type="checkbox" className="checkbox" /></th>
              <td>5</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Orders