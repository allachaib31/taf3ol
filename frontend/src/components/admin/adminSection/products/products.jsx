import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../screens/admin/homeAdmin';
import { getMethode, patchMethode } from '../../../../utils/apiFetchs';
import { getCategoriesRoute, getFileRoute, getProductsRoute, getTypeServicesRoute, host, updateProductsShowRoute } from '../../../../utils/apiRoutes';
import LoadingScreen from '../../../loadingScreen';
import Alert from '../../../alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faMoneyBill, faPen, faPercent, faTrash } from '@fortawesome/free-solid-svg-icons';
import { handleSelectAll, handleSelectItem, randomColor } from '../../../../utils/constants';
import RowsPerPage from '../rowsPerPage';
import Loading from '../../../loading';
import { DeleteProducts } from '../modal';

function Products() {
  const navigate = useNavigate();
  const socket = useSocket();
  const [loading, setLoading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [listProductsSelected, setListProductsSelected] = useState([]);
  const [listProductsShowSelected, setListProductsShowSelected] = useState([]);
  const [updateProductsShow, setUpdateProductsShow] = useState(false);
  const [loadingCategorie, setLoadingCategorie] = useState(false);
  const [listeTypeService, setListTypeService] = useState([]);
  const [categories, setCategories] = useState(false);
  const [params, setParams] = useState("");
  const [idCategorie, setIdCategorie] = useState("");
  const [products, setProducts] = useState([]);
  const [groupMoney, setGroupMoney] = useState([]);
  const [query, setQuery] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [alert, setAlert] = useState({
    display: false,
  });
  const saveUpdate = async () => {
    setLoadingSave(true);
    setAlert({
      display: false,
    });
    try {
      const response = await patchMethode(updateProductsShowRoute, {
        productIds: listProductsShowSelected,
        idCategorie
      });
      setAlert({
          display: true,
          status: true,
          text: response.data.msg
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
      setLoadingSave(false);
    }
  }
  const getProducts = () => {
    setLoading(true);
    getMethode(`${getProductsRoute}?idCategorie=${idCategorie}&page=${page}&limit=${limit}`).then((response) => {
      const { products, groupMoney, total, totalPages } = response.data;
      let listProductsShow = [];
      for (let i = 0; i < products.length; i++) {
        if (products[i].show) listProductsShow.push(products[i]._id)

      }
      setListProductsShowSelected(listProductsShow)
      setProducts(products);
      setGroupMoney(groupMoney);
      setTotalProducts(total);
      setTotalPages(totalPages);
    }).catch((err) => {
      if (err.response.status == 401 || err.response.status == 403) {
        navigate("/admin/auth")
      }
    }).finally(() => {
      setLoading(false);
    })
  }
  useEffect(() => {
    setLoadingCategorie(true);
    getMethode(`${getCategoriesRoute}?type=${params}&query=${query}`).then((response) => {
      setCategories(response.data);
    }).catch((err) => {
      if (err.response.status == 401 || err.response.status == 403) {
        navigate("/admin/auth")
      }
    }).finally(() => {
      setLoadingCategorie(false);
    })
  }, [params, query]);
  useEffect(() => {
    getMethode(`${getTypeServicesRoute}`).then((response) => {
      setListTypeService(response.data);
    }).catch((err) => {
      if (err.response.status == 401 || err.response.status == 403) {
        navigate("/admin/auth")
      }
    })
  }, []);
  useEffect(() => {
    getProducts();
  }, [idCategorie, page, limit]);
  useEffect(() => {
    if (socket) {
      socket.on('receive-notification', (notification) => {

        if (notification.name == "add Products") {
          if (notification.idCategorie.toString() == idCategorie.toString()) {
            setProducts((prevProducts) => {
              return [...prevProducts, ...notification.products]
            })
          }
        } else if (notification.name == "delete Products") {
          getProducts();
        }

      });
      return () => {
        // Clean up event listeners when component unmounts
        socket.off('receive-notification');
      };
    }
  }, [socket, idCategorie, products]);

  return (
    <div>
      <h1 className='text-3xl font-[900]'>المنتجات</h1>
      <div className='flex sm:flex-row flex-col gap-[1rem] my-[1rem]'>
        <select className="select select-bordered w-full font-bold text-[1rem]" onChange={(event) => {
          setParams(event.target.value)
        }}>
          <option disabled selected>اختار نوع الخدمة</option>
          {
            listeTypeService && listeTypeService.map((item) => {
              return <option value={item._id} key={item._id}>{item.nameAr}</option>
            })
          }
        </select>
        <LoadingScreen loading={loadingCategorie} component={<select className="select select-bordered w-full font-bold text-[1rem]" onChange={(event) => {
          setIdCategorie(event.target.value)
        }}>
          <option selected disabled>اختار الفئة</option>
          {
            categories && categories.map((item, index) => {
              return <option value={item._id} key={item._id}>{item.nameAr}</option>
            })
          }
        </select>} />
      </div>
      {alert.display && <Alert msg={alert} />}
      <LoadingScreen loading={loading} component={
        <div className="overflow-x-auto">
          <table className="table w-[2000px]">
            {/* head */}
            <thead className='text-[1rem]'>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" onChange={(event) => {
                      handleSelectAll(event, setListProductsSelected, products)
                    }} />
                  </label>
                </th>
                <th>الاسم</th>
                <th>العملة</th>
                <th>تسعير لكمية</th>
                <th>الكلفة</th>
                {
                  groupMoney && groupMoney.map((item) => {
                    return (
                      <th>{item.name} {item.pricingType == "Increase" ? <FontAwesomeIcon icon={faMoneyBill} /> : <FontAwesomeIcon icon={faPercent} />}</th>
                    )
                  })
                }
                <th>تفاصيل API</th>
                <th>
                  <div className="form-control">
                    <label className="label cursor-pointer w-fit gap-[0.5rem]">
                      <input type="checkbox" className="checkbox"
                        onChange={(event) => {
                          setUpdateProductsShow(true);
                          handleSelectAll(event, setListProductsShowSelected, products)
                        }} />
                      <span className="label-text">الظهور</span>
                    </label>
                  </div>
                </th>
                <th>متوفر</th>
                <th>السعر API</th>
              </tr>
            </thead>
            <tbody className='text-[1rem]'>
              {
                products && products.map((product) => {
                  return (
                    <tr>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" checked={listProductsSelected.includes(product._id)}
                            onChange={() => handleSelectItem(product._id, setListProductsSelected)} />
                        </label>
                      </th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              {product.image ? (
                                <img
                                  src={`${getFileRoute}${product.image}`}
                                  crossOrigin="anonymous"
                                  alt={product.nameAr}
                                />
                              ) : (
                                <div
                                  className={`h-12 flex justify-center items-center text-white font-bold text-xl`}
                                  style={{ backgroundColor: randomColor }}
                                >
                                  {product.nameAr?.[0]?.toUpperCase() || '?'}
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{product.nameAr}</div>
                          </div>
                        </div>
                      </td>
                      <td>USD</td>
                      <td>{product.forQuantity}</td>
                      <td>{product.costPrice}</td>
                      {
                        groupMoney && groupMoney.map((item) => {
                          let price, agentProfit;
                          if (item.pricingType == "Increase") {
                            price = item.value + product.costPrice;
                            agentProfit = ((item.agentRatio / 100) * item.value);
                          } else {
                            price = ((item.value / 100) * product.costPrice) + product.costPrice;
                            agentProfit = ((item.agentRatio / 100) * (price - product.costPrice));
                          }
                          return (
                            <td>
                              <div className='flex flex-col gap-[0.5rem]'>
                                <label className="input input-sm input-bordered flex items-center gap-2">
                                  {item.pricingType == "Increase" ? "مبلغ الربح" : "نسبة الربح"}
                                  <input type="text" className="grow w-[50%] font-[900]" value={item.value} disabled />
                                </label>
                                <label className="input input-sm input-bordered flex items-center gap-2">
                                  السعر
                                  <input type="text" className="grow w-[50%] font-[900]" value={price} disabled />
                                </label>
                                <label className="input input-sm input-bordered flex items-center gap-2">
                                  ربح الوكيل
                                  <input type="text" className="grow w-[50%] font-[900]" value={agentProfit} disabled />
                                </label>
                              </div>
                            </td>
                          )
                        })
                      }
                      <td>{product.provider.forEach((item) => {
                        if (item.isActive) return item.name
                      })}</td>
                      <td><input type="checkbox" className="checkbox" checked={listProductsShowSelected.includes(product._id)}
                        onChange={() => {
                          setUpdateProductsShow(true)
                          handleSelectItem(product._id, setListProductsShowSelected)
                        }} /></td>
                      <td><input type="checkbox" checked={product.availableQuantity} className="checkbox" /></td>
                      <td><FontAwesomeIcon icon={faCircleCheck} className='text-success mx-1' />{product.costPrice} / {product.forQuantity}</td>
                      <td>
                        <Link to={`/admin/productDetails?id=${product._id}`} className='btn btn-warning text-white'><FontAwesomeIcon icon={faPen} /></Link>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      } />
      {
        updateProductsShow && <button className='btn btn-primary w-full mt-[1rem]' disabled={loadingSave} onClick={saveUpdate}>{loadingSave ? <Loading /> : "حفظ" }</button>
      }
      <div className='mt-[1rem] flex justify-between'>
        <button className='btn btn-error text-white' onClick={() => {
          if (listProductsSelected.length > 0) document.getElementById('deleteProducts').showModal()
        }}><FontAwesomeIcon icon={faTrash} /></button>
        <div className='w-full'>
          <RowsPerPage page={page} setPage={setPage} limit={limit} setLimit={setLimit} totalPages={totalPages} setTotalPages={setTotalPages} totalItem={totalProducts} />
        </div>
      </div>
      <DeleteProducts listProductsSelected={listProductsSelected} getProducts={getProducts} />
    </div>
  )
}

export default Products