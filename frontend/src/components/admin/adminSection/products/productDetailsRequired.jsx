import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useOutletContext } from 'react-router-dom';
import { AddProductRequirement } from '../modal';

function ProductDetailsRequired() {
    const { productDetails } = useOutletContext();
    return (
        <div>
            <div className='mt-[1rem]'>
                <h1 className='text-[1.2rem]'>نوعية الكمية </h1>
                <div className='flex items-center gap-[1rem] sm:gap-[3rem]'>
                    <div className='flex flex-col gap-[1rem]'>
                        <div className='flex items-center gap-[0.5rem]'>
                            <input type="radio" name="quantityQuality" className="radio" checked={productDetails.quantityQuality == "بدون"} /> <span className='text-[1.1rem] font-bold'>بدون</span>
                        </div>
                        <div className='flex items-center gap-[0.5rem]'>
                            <input type="radio" name="quantityQuality" className="radio" checked={productDetails.quantityQuality == "كمية"} /> <span className='text-[1.1rem] font-bold'>كمية</span>
                        </div>
                        <div className='flex items-center gap-[0.5rem]'>
                            <input type="radio" name="quantityQuality" className="radio" checked={productDetails.quantityQuality == "عداد"} /> <span className='text-[1.1rem] font-bold'>عداد</span>
                        </div>
                    </div>
                    {
                        productDetails.quantityQuality == "كمية" || productDetails.quantityQuality == "عداد" ? <div className='w-full'>
                            <label className="input input-bordered w-full flex items-center gap-2">
                                اقل كمية
                                <input type="number" className="grow" value={productDetails.minimumQuantity}/>
                            </label>
                            <label className="mt-[1rem] input input-bordered w-full flex items-center gap-2">
                                اكبر كمية
                                <input type="number" className="grow" value={productDetails.maximumQuantity} />
                            </label>
                        </div> : ""
                    }
                </div>
                <button className='mt-[1rem] btn btn-secondary' onClick={()=>document.getElementById('addProductRequirement').showModal()}><FontAwesomeIcon icon={faPlus} /></button>
                <button className='btn btn-primary w-full mt-[1rem]'>حفظ</button>
            </div>
            <AddProductRequirement />
        </div>
    )
}

export default ProductDetailsRequired