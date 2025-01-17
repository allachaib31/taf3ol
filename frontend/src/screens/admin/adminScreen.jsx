import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import LoadingScreen from '../../components/loadingScreen'
import { getMethode } from '../../utils/apiFetchs';
import { isValidateTokenRoute } from '../../utils/apiRoutes';

function AdminScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [accountInfo, setAccountInfo] = useState(false);
  useEffect(() => {
    setLoading(true)
    const validateToken = async () => {
      try {
        const response = await getMethode(isValidateTokenRoute);
        setAccountInfo(response.data.admin)
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
      <div dir="rtl" lang="ar" data-theme={"myTheme"} className='fontZain min-h-screen'>
        <Outlet context={{accountInfo}}/>
      </div>
    } />
  )
}

export default AdminScreen