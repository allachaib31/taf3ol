import React from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';

function ProductDetailsApi() {
  const navigate = useNavigate()
  const { productDetails } = useOutletContext();
  return (
    <div>
      <button className='btn btn-primary'>ربط API</button>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className='text-[1rem]'>
            <tr>
              <th>المقدم</th>
              <th>التطبيق</th>
              <th>السعر</th>
              <th>متوفر</th>
              <th>خيارات</th>
            </tr>
          </thead>
          <tbody className='text-[1rem]'>
            {
              productDetails && productDetails.provider.map((providerData) => {
                return (
                  <tr>
                    <td>{providerData.name}</td>
                    <td>{providerData.nameProduct}</td>
                    <td>{providerData.costPrice}</td>
                    <td>{providerData.isAvailable}</td>
                    <td className='flex gap-[0.5rem]'>
                      <button className='btn btn-secondary' disabled={providerData.isActive}>تفعيل</button>
                      <button className='btn btn-error' disabled={providerData.isActive}>حذف</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductDetailsApi