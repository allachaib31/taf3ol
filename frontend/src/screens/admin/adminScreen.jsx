import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import LoadingScreen from '../../components/loadingScreen'
import { getMethode } from '../../utils/apiFetchs';
import { isValidateTokenRoute } from '../../utils/apiRoutes';

function AdminScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    const validateToken = async () => {
      try {
        const response = await getMethode(isValidateTokenRoute);
      } catch (error) {
        navigate("/admin/auth");

      } finally {
        setLoading(false);
      }
    };

    validateToken(); // Call the async function
  }, []);
  return (
    <LoadingScreen loading={loading} component={
      <div dir="rtl" lang="ar" className='fontZain min-h-screen'>
        <Outlet />
      </div>
    } />
  )
}

export default AdminScreen