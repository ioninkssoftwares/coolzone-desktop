import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const [cookies, setCookies] = useCookies(["adminToken"]);
    const navigate = useNavigate();


    useEffect(() => {
        if (cookies.adminToken === undefined) {
          toast.error("Please Login")
          navigate('/login')
        }
      }, [])
  return (
    <div>
        <p className='text-center font-bold text-4xl'>Admin Dashboard</p>
        <Link to={"/admin/product-form"}>Add Product</Link>

    </div>
  )
}

export default AdminDashboard