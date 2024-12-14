import { faCircleExclamation, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import OrderStatistics from '../charts/orderStatistics'
import SalesOverview from '../charts/salesOverview'
import CustomerGrowth from '../charts/customerGrowth'
import RevenueBreakdown from '../charts/revenueBreakdown'

function ReportsInformations() {
  return (
    <div>
      <h1 className='text-3xl font-[900]'>الارصدة</h1>
      <div className='flex flex-wrap lg:flex-nowrap gap-[1rem] justify-center items-center'>
        <div className="stats lg:w-1/4 w-full md:w-[45%] shadow">
          <div className="stat flex justify-between">
            <div>
              <div className="stat-title text-xl xl:text-2xl"> رصيد الزبائن dollar</div>
              <div className="stat-value">89,400</div>
            </div>
          </div>
        </div>
        <div className="stats lg:w-1/4 w-full md:w-[45%] shadow">
          <div className="stat flex justify-between">
            <div>
              <div className="stat-title text-xl xl:text-2xl">إجمالي النفقات</div>
              <div className="stat-value">89400</div>
            </div>
          </div>
        </div>
        <div className="stats lg:w-1/4 w-full md:w-[45%] shadow">
          <div className="stat flex justify-between">
            <div>
              <div className="stat-title text-xl xl:text-2xl">مبيعات اليوم</div>
              <div className="stat-value">89,400$</div>
            </div>
          </div>
        </div>
        <div className="stats lg:w-1/4 w-full md:w-[45%] shadow">
          <div className="stat flex justify-between">
            <div>
              <div className="stat-title text-xl xl:text-2xl">إجمالي الطلب اليوم</div>
              <div className="stat-value">89400</div>
            </div>
          </div>
        </div>
      </div>
      <h1 className='text-3xl font-[900]'>الطلبات</h1>
      <div className='mt-[1rem] flex flex-wrap lg:flex-nowrap gap-[1rem] justify-center items-center'>
        <div className="stats lg:w-1/4 w-full md:w-[45%] shadow">
          <div className="stat flex justify-between">
            <div>
              <div className="stat-title text-xl xl:text-2xl">عدد الطلبات</div>
              <div className="stat-value">89,400</div>
            </div>
          </div>
        </div>
        <div className="stats lg:w-1/4 w-full md:w-[45%] shadow">
          <div className="stat flex justify-between">
            <div>
              <div className="stat-title text-xl xl:text-2xl">طلبات اليوم</div>
              <div className="stat-value">89,400</div>
            </div>
          </div>
        </div>
        <div className="stats lg:w-1/4 w-full md:w-[45%] shadow">
          <div className="stat flex justify-between">
            <div>
              <div className="stat-title text-xl xl:text-2xl">طلبات الملغاة</div>
              <div className="stat-value">89,400</div>
            </div>
          </div>
        </div>
        <div className="stats lg:w-1/4 w-full md:w-[45%] shadow">
          <div className="stat flex justify-between">
            <div>
              <div className="stat-title text-xl xl:text-2xl">طلبات قيد التنفيذ</div>
              <div className="stat-value">89,400</div>
            </div>
          </div>
        </div>
      </div>
      <h1 className='text-3xl font-[900]'>الحسابات</h1>
      <div className='mt-[1rem] flex flex-wrap lg:flex-nowrap gap-[1rem] justify-center items-center'>
        <div className="stats lg:w-1/4 w-full md:w-[45%] shadow">
          <div className="stat flex justify-between">
            <div>
              <div className="stat-title text-xl xl:text-2xl">عدد المستخدمين</div>
              <div className="stat-value">89,400</div>
            </div>
          </div>
        </div>
        <div className="stats lg:w-1/4 w-full md:w-[45%] shadow">
          <div className="stat flex justify-between">
            <div>
              <div className="stat-title text-xl xl:text-2xl">المستخدمون النشطون</div>
              <div className="stat-value">89,400</div>
            </div>
          </div>
        </div>
        <div className="stats lg:w-1/4 w-full md:w-[45%] shadow">
          <div className="stat flex justify-between">
            <div>
              <div className="stat-title text-xl xl:text-2xl">المستخدمين الغير نشطين</div>
              <div className="stat-value">89,400</div>
            </div>
          </div>
        </div>
        <div className="stats lg:w-1/4 w-full md:w-[45%] shadow">
          <div className="stat flex justify-between">
            <div>
              <div className="stat-title text-xl xl:text-2xl">عدد المستخدمين المتوقفين</div>
              <div className="stat-value">89,400</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 p-4">
        <div className="border rounded-lg p-4 flex-1">
          <h2 className="text-lg font-semibold">Order Statistics</h2>
          <OrderStatistics />
        </div>
        <div className="border rounded-lg p-4 flex-1">
          <h2 className="text-lg font-semibold">Sales Overview</h2>
          <SalesOverview />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 p-4">
        <div className="border rounded-lg p-4 flex-1">
          <h2 className="text-lg font-semibold">Customer Growth</h2>
          <CustomerGrowth />
        </div>
        <div className="border rounded-lg p-4 flex-1">
          <h2 className="text-lg font-semibold">Revenue Breakdown</h2>
          <RevenueBreakdown />
        </div>
      </div>
    </div>
  )
}

export default ReportsInformations