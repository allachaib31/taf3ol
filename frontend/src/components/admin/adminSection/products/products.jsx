import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../screens/admin/homeAdmin';
import { getMethode, patchMethode, putMethode } from '../../../../utils/apiFetchs';
import { getCategoriesRoute, getFileRoute, getProductsRoute, getTypeServicesRoute, updatePriceCategorieRoute, updateProductPriceRoute, updateProductsShowAvailableRoute } from '../../../../utils/apiRoutes';
import LoadingScreen from '../../../loadingScreen';
import Alert from '../../../alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleCheck, faMagnifyingGlass, faMoneyBill, faPen, faPercent, faTrash } from '@fortawesome/free-solid-svg-icons';
import { handleSelectAll, handleSelectItem, randomColor } from '../../../../utils/constants';
import RowsPerPage from '../rowsPerPage';
import Loading from '../../../loading';
import { ChangeTypeServiceModel, DeleteProducts } from '../modal';

function Products() {
  const navigate = useNavigate();
  const socket = useSocket();
  const [loading, setLoading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [listProductsSelected, setListProductsSelected] = useState([]);
  const [listProductsShowSelected, setListProductsShowSelected] = useState([]);
  const [listProductsAvailableSelected, setListProductsAvailableSelected] = useState([]);
  const [updateProducts, setUpdateProducts] = useState(false);
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
  const [startTyping, setStartTyping] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [alert, setAlert] = useState({
    display: false,
  });

  const saveUpdate = async () => {
    setLoadingSave(true);
    setAlert({
      display: false,
    });
    try {
      const response = await patchMethode(updateProductsShowAvailableRoute, {
        productIdsShow: listProductsShowSelected,
        productIdsAvailable: listProductsAvailableSelected,
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
    getMethode(`${getProductsRoute}?idCategorie=${idCategorie}&page=${page}&limit=${limit}&searchText=${searchText}`).then((response) => {
      const { products, groupMoney, total, totalPages } = response.data;
      let listProductsShow = [];
      let listProductsAvailable = [];
      for (let i = 0; i < products.length; i++) {
        if (products[i].show) listProductsShow.push(products[i]._id);
        if (products[i].availableQuantity) listProductsAvailable.push(products[i]._id);

      }
      setListProductsShowSelected(listProductsShow);
      setListProductsAvailableSelected(listProductsAvailable);
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

  const updateProductPrice = async (productPrice) => {
    setAlert({
      display: false,
    });
    try {
      const response = await putMethode(updateProductPriceRoute, productPrice);
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
    }
  }

  const updatePriceCategorie = async (data) => {
    setAlert({
      display: false,
    });
    try {
      const response = await putMethode(updatePriceCategorieRoute, {
        ...data,
        products,
      });
      setAlert({
        display: true,
        status: true,
        text: response.data.msg
      });
      setProducts(response.data.products);
    } catch (err) {
      if (err.response.status == 401 || err.response.status == 403) {
        return navigate("/admin/auth")
      }
      setAlert({
        display: true,
        status: false,
        text: err.response.data.msg
      });
    }
  }
  useEffect(() => {
    // Debounce effect to delay search until user stops typing
    const delayDebounce = setTimeout(() => {
        if (startTyping) {
            getProducts();// Function to fetch all users
        }
    }, 500); // Delay time in ms

    return () => clearTimeout(delayDebounce); // Clean up the timeout
}, [searchText]);

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
      <div className="join mt-[1rem]">
        <div>
          <div>
            <input className="input bg-black text-white input-bordered join-item" placeholder="بحث"
              value={searchText}
              onChange={(e) => {
                setStartTyping(true);
                setSearchText(e.target.value)
              }} />
          </div>
        </div>
        <div className="indicator">
          <button className="btn join-item"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
        </div>
      </div>
      {alert.display && <Alert msg={alert} />}
      <LoadingScreen loading={loading} component={
        <div className="overflow-x-auto">
          <table className="table w-[2200px]">
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
                    let value;
                    return (
                      <th>
                        <div className='w-fit flex gap-[0.5rem]'>
                          <label className="w-[200px] input input-sm input-bordered flex items-center gap-2">
                            {item.name} {item.pricingType == "Increase" ? <FontAwesomeIcon icon={faMoneyBill} /> : <FontAwesomeIcon icon={faPercent} />}
                            <input type="number" className="w-[70px] grow font-[900]" onChange={(event) => value = event.target.value} />
                          </label>
                          <button className='btn btn-secondary btn-sm' onClick={() => updatePriceCategorie({
                            value,
                            groupMoney: item
                          })}><FontAwesomeIcon icon={faCheck} /></button>
                        </div>
                      </th>
                    )
                  })
                }
                <th>تفاصيل API</th>
                <th>
                  <div className="form-control">
                    <label className="label cursor-pointer w-fit gap-[0.5rem]">
                      <input type="checkbox" className="checkbox"
                        onChange={(event) => {
                          setUpdateProducts(true);
                          handleSelectAll(event, setListProductsShowSelected, products)
                        }} />
                      <span className="label-text">الظهور</span>
                    </label>
                  </div>
                </th>
                <th>
                  <div className="form-control">
                    <label className="label cursor-pointer w-fit gap-[0.5rem]">
                      <input type="checkbox" className="checkbox"
                        onChange={(event) => {
                          setUpdateProducts(true);
                          handleSelectAll(event, setListProductsAvailableSelected, products)
                        }} />
                      <span className="label-text">متوفر</span>
                    </label>
                  </div>
                </th>
                <th>السعر API</th>
              </tr>
            </thead>
            <tbody className='text-[1rem]'>
              {
                products && products.map((product, indexProducts) => {
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
                      <td>{product.costPrice.toFixed(5)}</td>
                      {
                        product.productsPrice && product.productsPrice.map((item, indexProductsPrice) => {
                          let price, priceNegative, agentProfit;
                          if (groupMoney[indexProductsPrice].pricingType == "Increase") {
                            price = item.value + product.costPrice;
                            priceNegative = item.negativeBalance + product.costPrice;
                            agentProfit = ((item.agentRatio / 100) * item.value);
                          } else {
                            price = ((item.value / 100) * product.costPrice) + product.costPrice;
                            priceNegative = ((item.negativeBalance / 100) * product.costPrice) + product.costPrice;
                            agentProfit = ((item.agentRatio / 100) * (price - product.costPrice));
                          }
                          return (
                            <td>
                              <div className='w-fit flex flex-col gap-[0.5rem]'>
                                <label className="w-[200px] input input-sm input-bordered flex items-center gap-2">
                                  {groupMoney[indexProductsPrice].pricingType == "Increase" ? "مبلغ الربح" : "نسبة الربح"}
                                  <input type="number" className="w-[70px] grow font-[900]" value={products[indexProducts].productsPrice[indexProductsPrice].value} onChange={(event) => {
                                    let newListProducts = [...products];
                                    newListProducts[indexProducts].productsPrice[indexProductsPrice].value = Number(event.target.value);
                                    setProducts(newListProducts)
                                  }} />
                                </label>
                                <label className="w-[200px] input input-sm input-bordered flex items-center gap-2">
                                  السعر
                                  <input type="number" className="w-[70px] grow font-[900]" value={price.toFixed(5)} disabled />
                                </label>
                                <label className="w-[200px] input input-sm input-bordered flex items-center gap-2">
                                  {groupMoney[indexProductsPrice].pricingType == "Increase" ? "مبلغ الرصيد السالب" : "نسبة الرصيد السالب"}
                                  <input type="number" className="w-[50px] grow font-[900]" value={products[indexProducts].productsPrice[indexProductsPrice].negativeBalance} onChange={(event) => {
                                    let newListProducts = [...products];
                                    newListProducts[indexProducts].productsPrice[indexProductsPrice].negativeBalance = Number(event.target.value);
                                    setProducts(newListProducts)
                                  }} />
                                </label>
                                <label className="w-[200px] input input-sm input-bordered flex items-center gap-2">
                                  السعر
                                  <input type="number" className="w-[70px] grow font-[900]" value={priceNegative.toFixed(5)} disabled />
                                </label>
                                <label className="w-[200px] input input-sm input-bordered flex items-center gap-2">
                                  نسبة الوكيل
                                  <input type="number" className="w-[70px] grow font-[900]" value={products[indexProducts].productsPrice[indexProductsPrice].agentRatio} onChange={(event) => {
                                    let newListProducts = [...products];
                                    newListProducts[indexProducts].productsPrice[indexProductsPrice].agentRatio = Number(event.target.value);
                                    setProducts(newListProducts)
                                  }} />
                                </label>
                                <label className="w-[200px] input input-sm input-bordered flex items-center gap-2">
                                  ربح الوكيل
                                  <input type="number" className="w-[70px] grow font-[900]" value={agentProfit.toFixed(7)} disabled />
                                </label>
                                <div className='flex justify-center mt-[0.5rem]'>
                                  <button className='btn btn-secondary' onClick={() => updateProductPrice(products[indexProducts].productsPrice[indexProductsPrice])}><FontAwesomeIcon icon={faCheck} /></button>
                                </div>
                              </div>
                            </td>
                          )
                        })
                      }
                      <td>{product.provider.map((item) => {
                        if (item.isActive) return (<>{item.name}</>)
                      })}</td>
                      <td>
                        <input type="checkbox" className="checkbox" checked={listProductsShowSelected.includes(product._id)}
                          onChange={() => {
                            setUpdateProducts(true)
                            handleSelectItem(product._id, setListProductsShowSelected)
                          }} />
                      </td>
                      <td>
                        <input type="checkbox" className="checkbox" checked={listProductsAvailableSelected.includes(product._id)}
                          onChange={() => {
                            setUpdateProducts(true)
                            handleSelectItem(product._id, setListProductsAvailableSelected)
                          }} />
                      </td>
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
        updateProducts && <button className='btn btn-primary w-full mt-[1rem]' disabled={loadingSave} onClick={saveUpdate}>{loadingSave ? <Loading /> : "حفظ"}</button>
      }
      <div className='mt-[1rem] flex justify-between'>
        <button className='btn btn-error text-white' onClick={() => {
          if (listProductsSelected.length > 0) document.getElementById('deleteProducts').showModal()
        }}><FontAwesomeIcon icon={faTrash} /></button>
        <button className='btn btn-warning text-white mr-[0.5rem]' onClick={() => {
          if (listProductsSelected.length > 0) document.getElementById('changeTypeServiceModel').showModal()
        }}><FontAwesomeIcon icon={faPen} /></button>
        <div className='w-full'>
          <RowsPerPage page={page} setPage={setPage} limit={limit} setLimit={setLimit} totalPages={totalPages} setTotalPages={setTotalPages} totalItem={totalProducts} />
        </div>
      </div>
      <ChangeTypeServiceModel listProductsSelected={listProductsSelected} listeTypeService={listeTypeService} getProducts={getProducts} />
      <DeleteProducts listProductsSelected={listProductsSelected} getProducts={getProducts} />
    </div>
  )
}

export default Products