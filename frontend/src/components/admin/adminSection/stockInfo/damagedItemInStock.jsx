import React, { useEffect, useState } from 'react'
import RowsPerPage from '../rowsPerPage'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useSocket } from '../../../../screens/admin/homeAdmin';
import { getMethode } from '../../../../utils/apiFetchs';
import { getItemStockDamagedRoute } from '../../../../utils/apiRoutes';
import LoadingScreen from '../../../loadingScreen';
function DamagedItemInStock() {
  const navigate = useNavigate();
  const socket = useSocket();
  const {stockInfo} = useOutletContext();
  const [loading, setLoading] = useState(false);
  const [damagedItems, setDamagedItems] = useState(false);
  const [totalDamaged, setTotalDamaged] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    getMethode(`${getItemStockDamagedRoute}?page=${page}&limit=${limit}&idStock=${stockInfo._id}`).then((response) => {
      const { damagedItems, total, totalPages } = response.data;

      setDamagedItems(damagedItems);
      setTotalDamaged(total);
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
                <th></th>
                <th>البيانات</th>
                <th>تاريخ الانشاء</th>
                <th>تاريخ الاتلاف</th>
                <th>رقم الطلب</th>
                <th>ملاحظة </th>
              </tr>
            </thead>
            <tbody className='text-[1.1rem]'>
            {
                damagedItems && damagedItems.map((damagedItem) => {
                  return (
                    <tr>
                      <td></td>
                      <td>{damagedItem.item}</td>
                      <td>{damagedItem.createdAt}</td>
                      <td>{damagedItem.dateOfDamaged}</td>
                      <td>{damagedItem.orderNumber}</td>
                      <td>{damagedItem.note}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      } />
      <div className='mt-[1rem]'>
        <RowsPerPage age={page} setPage={setPage} limit={limit} setLimit={setLimit} totalPages={totalPages} setTotalPages={setTotalPages} totalItem={totalDamaged} />
      </div>
    </div>
  )
}

export default DamagedItemInStock