import React, { useState } from 'react';
import 'core-js/features/symbol';
import ethereumIcon from "../../../images/ethereumIcon.png";
import stripeIcon from "../../../images/stripeIcon.png"
import dashIcon from "../../../images/dashIcon.png";
import usdtIcon from "../../../images/usdtIcon.png";
import paytmIcon from "../../../images/paytmIcon.png";
import bankIcon from "../../../images/bankIcon.png";
import btcIcon from "../../../images/btcIcon.png";
import applePayIcon from "../../../images/applePayIcon.png";
import googlePayIcon from "../../../images/googlePayIcon.png";
import paypalIcon from "../../../images/paypalIcon.png";
import skrillIcon from "../../../images/skrillIcon.png";
import carteCreditIcon from "../../../images/carteCreditIcon.png";
import { Link, useOutletContext } from 'react-router-dom';
import PayeerPayment from '../payments/payeerPayment';
import PerfectMoneyPayment from '../payments/perfectMoneyPayment';
import GooglePayButton from "@google-pay/button-react"
import PayPalPayment from '../payments/PayPalPayment';
//import CryptomusPayment from '../payments/cryptomusPayment';
function AddMoney() {
  const { t, i18n } = useOutletContext();
  const [activeTab, setActiveTab] = useState('addMoney');
  const [checkout, setCheckOut] = useState(false);
  return (
    <div className="relative z-50 ">
      <div className="flex sm:flex-row flex-col sm:gap-0 gap-[1rem] sm:mb-0 mb-[1rem]">
        <button
          className={`py-2 px-4 text-lg font-bold sm:rounded-t-[10px] ${activeTab === 'addMoney' ? 'bg-primary text-black border' : 'bg-black text-white'
            }`}
          onClick={() => setActiveTab('addMoney')}
        >
          {t('title_addCredit_tab_1')}
        </button>
        <button
          className={`py-2 px-4 text-lg font-bold sm:rounded-t-[10px] ${activeTab === 'payBook' ? 'bg-primary text-black border' : 'bg-black text-white'
            }`}
          onClick={() => setActiveTab('payBook')}
        >
          {t('title_addCredit_tab_2')}
        </button>
      </div>
      <div className="border-2 p-[1rem]">
        {
          activeTab == "addMoney" && (
            <div className="grid grid-cols-1">
              <div className='flex flex-col gap-[1rem]'>
                <h1>{t('lable_1_addCredit_tabContent_1')}</h1>
                <select className='select select-bordered'>
                  <option selected disabled>{t('placeholder_1_addCredit_tabContent_1')}</option>
                </select>
                <h1>{t('lable_2_addCredit_tabContent_1')}</h1>
                <div className='bg-[#f1f1f1] py-[2rem] rounded-[14px]'>
                  <h1 className='text-center' dangerouslySetInnerHTML={{ __html: t('content_1_addCredit_tabContent_1') }}></h1>
                </div>
              </div>

            </div>
          )
        }
        {
          activeTab == "payBook" && (
            <div className="grid grid-cols-1">
              <div className="overflow-x-auto mt-[2rem]">
                <table className="table table-zebra">
                  <thead className='bg-primary text-[1rem] text-black'>
                    <tr>
                      <th><input type="checkbox" className="checkbox" /></th>
                      <th>{t('table_1_th_1_addCredit_tabContent_2')} </th>
                      <th>{t('table_1_th_2_addCredit_tabContent_2')}</th>
                      <th>{t('table_1_th_3_addCredit_tabContent_2')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th><input type="checkbox" className="checkbox" /></th>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <th><input type="checkbox" className="checkbox" /></th>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <th><input type="checkbox" className="checkbox" /></th>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <th><input type="checkbox" className="checkbox" /></th>
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
      </div>
      <div className='container mx-auto'>
        <h1 className='font-bold text-3xl my-[1.3rem]'>{t('title_1_addCredit')}</h1>
        <div className='flex justify-center items-center flex-wrap gap-[1.5rem] xl:gap-x-[7rem] gap-y-[2rem]'>
          <div className='border rounded-full flex justify-center items-center p-[1.3rem]'>
            <img src={ethereumIcon} alt="" className='sm:w-[100px] sm:h-[100px] w-[80px] h-[80px]' />
          </div>
          <div className='border rounded-full flex justify-center items-center p-[1.3rem]'>
            <img src={stripeIcon} alt="" className='sm:w-[100px] sm:h-[100px] w-[80px] h-[80px]' />
          </div>
          <div className='border rounded-full flex justify-center items-center p-[1.3rem]'>
            <img src={dashIcon} alt="" className='sm:w-[100px] sm:h-[100px] w-[80px] h-[80px]' />
          </div>
          <div className='border rounded-full flex justify-center items-center p-[1.3rem]'>
            <img src={usdtIcon} alt="" className='sm:w-[100px] sm:h-[100px] w-[80px] h-[80px]' />
          </div>
          <div className='border rounded-full flex justify-center items-center p-[1.3rem]'>
            <img src={paytmIcon} alt="" className='sm:w-[100px] sm:h-[100px] w-[80px] h-[80px]' />
          </div>
          <div className='border rounded-full flex justify-center items-center p-[1.3rem]'>
            <img src={bankIcon} alt="" className='sm:w-[100px] sm:h-[100px] w-[80px] h-[80px]' />
          </div>
          <div className='border rounded-full flex justify-center items-center p-[1.3rem]'>
            <img src={btcIcon} alt="" className='sm:w-[100px] sm:h-[100px] w-[80px] h-[80px]' />
          </div>
          <div className='border rounded-full flex justify-center items-center p-[1.3rem]'>
            <img src={applePayIcon} alt="" className='sm:w-[100px] sm:h-[100px] w-[80px] h-[80px]' />
          </div>
          <div className='border rounded-full flex justify-center items-center p-[1.3rem]'>
            <img src={googlePayIcon} alt="" className='sm:w-[100px] sm:h-[100px] w-[80px] h-[80px]' />
          </div>
          <div className='border rounded-full flex justify-center items-center p-[1.3rem]'>
            <img src={paypalIcon} alt="" className='sm:w-[100px] sm:h-[100px] w-[80px] h-[80px]' />
          </div>
          <div className='border rounded-full flex justify-center items-center p-[1.3rem]'>
            <img src={skrillIcon} alt="" className='sm:w-[100px] sm:h-[100px] w-[80px] h-[80px]' />
          </div>
          <div className='border rounded-full flex justify-center items-center p-[1.3rem]'>
            <img src={carteCreditIcon} alt="" className='sm:w-[100px] sm:h-[100px] w-[80px] h-[80px]' />
          </div>
        </div>
      </div>
      <PayeerPayment />
      <PerfectMoneyPayment />
      <GooglePayButton
        environment="TEST"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: 'CARD',
              parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['MASTERCARD', 'VISA'],
              },
              tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                  gateway: 'example',
                  gatewayMerchantId: 'exampleGatewayMerchantId',
                },
              },
            },
          ],
          merchantInfo: {
            merchantId: '12345678901234567890',
            merchantName: 'Demo Merchant',
          },
          transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPriceLabel: 'Total',
            totalPrice: '100.00',
            currencyCode: 'USD',
            countryCode: 'US',
          },
        }}
        onLoadPaymentData={paymentRequest => {
          console.log('load payment data', paymentRequest);
        }}
      />
      <br />
      <PayPalPayment />
    </div>
  )
}

export default AddMoney