import React, { useEffect, useState } from 'react'
import RowsPerPage from '../rowsPerPage'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useSocket } from '../../../../screens/admin/homeAdmin';
import { getMethode } from '../../../../utils/apiFetchs';
import { getItemStockAvailableRoute } from '../../../../utils/apiRoutes';
import LoadingScreen from '../../../loadingScreen';
import { handleSelectAll, handleSelectItem } from '../../../../utils/constants';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DeleteItemStock } from '../modal';

function AvailableInStock() {
  const navigate = useNavigate();
  const socket = useSocket();
  const stockInfo = useOutletContext();
  const [loading, setLoading] = useState(false);
  const [availableItems, setAvailableItems] = useState(false);
  const [listAvailableItemsSelected, setListAvailableItemsSelected] = useState([]);
  const [totalAvailable, setTotalAvailable] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    getMethode(`${getItemStockAvailableRoute}?page=${page}&limit=${limit}&idStock=${stockInfo._id}`).then((response) => {
      const { availableItems, total, totalPages } = response.data;

      setAvailableItems(availableItems);
      setTotalAvailable(total);
      setTotalPages(totalPages);
    }).catch((err) => {
      if (err.response.status == 401 || err.response.status == 403) {
        navigate("/admin/auth")
      }
    }).finally(() => {
      setLoading(false);
    })
  }, [page, limit]);
  return (
    <div>
      <LoadingScreen loading={loading} component={
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className='text-[1.1rem]'>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" onChange={(event) => {
                      handleSelectAll(event, setListAvailableItemsSelected, availableItems)
                    }} />
                  </label>
                </th>
                <th>البيانات</th>
                <th>تاريخ الانشاء</th>
                <th>ملاحظة </th>
              </tr>
            </thead>
            <tbody className='text-[1.1rem]'>
              {
                availableItems && availableItems.map((availableItem) => {
                  return (
                    <tr>
                      <td>
                        <label>
                          <input type="checkbox" className="checkbox" checked={listAvailableItemsSelected.includes(availableItem._id)}
                            onChange={() => handleSelectItem(availableItem._id, setListAvailableItemsSelected)} />
                        </label>
                      </td>
                      <td>{availableItem.item}</td>
                      <td>{availableItem.createdAt}</td>
                      <td>{availableItem.note}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      } />
      <div className='mt-[1rem] flex justify-between'>
        <button className='btn btn-error text-white' onClick={() => {
          if (listAvailableItemsSelected.length > 0) document.getElementById('deleteItemStocks').showModal()
        }}><FontAwesomeIcon icon={faTrash} /></button>
        <div className='w-full'>
          <RowsPerPage age={page} setPage={setPage} limit={limit} setLimit={setLimit} totalPages={totalPages} setTotalPages={setTotalPages} totalItem={totalAvailable} />
        </div>
      </div>
      <DeleteItemStock listAvailableItemsSelected={listAvailableItemsSelected} availableItems={availableItems} setAvailableItems={setAvailableItems}/>
    </div>
  )
}

export default AvailableInStock