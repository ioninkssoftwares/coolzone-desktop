import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import { BiMedal } from 'react-icons/bi';
import { useAxios } from '../utils/axios';
import { useCookies } from 'react-cookie';
import { Grid } from 'react-loader-spinner';

const MembershipPage = () => {
    const instance = useAxios()
    const [cookies, setCookies] = useCookies(["token"]);
    const [token, setToken] = useState("");
    const [membership, setMembership] = useState(false);
    const [membershipOffers, setMembershipOffers] = useState([]);
    const [userMembership, setUserMembership] = useState({});
    const [loading, setLoading] = useState(false)

    const getMembershipOffers = async () => {
        setLoading(true)
        try {
            const response = await instance.get('/mebershipoffers');
            console.log(response.data.membership, "rekdfjkd")
            setMembershipOffers(response.data.membership)
            setLoading(false)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMembershipOffers()
    }, [])



    useEffect(() => {
        if (cookies && cookies.token) {
            console.log(cookies.token, "dslfjadslk")
            setToken(cookies.token);
        }
    }, [cookies]);



    const getUserDetails = async (token) => {
        const instances = useAxios(token);
        try {
            const response = await instances.get("/me")
            console.log(response.data.user, "userDetails")
            setUserMembership(response.data.user)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (token) {
            // console.log(token,"fjkdsfjkd")
            getUserDetails(token)
        }

    }, [token])


    const getColorClass = (membName) => {
        switch (membName.toLowerCase()) {
            case 'gold':
                return 'bg-[#ffd700]';
            case 'silver':
                return 'bg-[#77c2ff]';
            case 'platinum':
                return 'bg-[#ff6c86]';
            default:
                return '';
        }
    };



    const handleMembership = async (e) => {
        console.log(e, "dfklsdlfjh")
        setUserMembership(e)
        const instances = useAxios(token)
        try {
            const response = await instances.put(`/membership/addmembership/${e._id}`)
            console.log(response.data)
            setMembership(true)
        } catch (error) {
            console.log(error)

        }

    }


    return (
        <div>
            <Navbar />
            {loading === true ? (
                <div className=' flex items-center justify-center h-[600px]'>
                    <Grid
                        height="80"
                        width="80"
                        color="rgb(79, 70, 229) "
                        ariaLabel="grid-loading"
                        radius="12.5"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>) : null}
            {membership === true ?  <section className="pt-5 mb-5">
                <div className="max-w-7xl mx-auto px-5 md:px-10 ">
                    <p style={{ margin: "0 auto" }} className='font-semibold text-4xl w-fit'>Membership Section</p>
                    <div className='flex justify-center items-center my-8'>
                        <div className='flex bg-[#ffd700] gap-2 flex-col justify-center items-center border-2 py-4 px-10 rounded-lg ' >
                            <p className='font-bold text-3xl text-white'>{userMembership?.memb_name} Membership  </p>
                            <p className='text-sm font-bold text-white'>Valid till - 31-09-2023</p>
                        </div>
                    </div>

                    <p className='font-semibold mb-3 mt-9'>Date Added:06 Nov 2023</p>

                    <div className='flex p-6 items-center justify-between border-b-2 border-t-2 '>
                        <div className='flex flex-col gap-6'>
                            <p className='font-semibold '>Product Name</p>
                            <div className='flex gap-5 items-center '>
                                <div className='w-[80px] h-[60px]'>
                                    <img className='w-full h-full object-cover' src="https://cdn.pixabay.com/photo/2021/09/08/07/20/air-conditioner-6605973_1280.jpg" alt="" />
                                </div>
                                <p>Voltas Vectra 4 in 1 Convertible 1.5 ton</p>
                            </div>

                        </div>
                        <div className='flex flex-col gap-6'>
                            <p className='font-semibold'>Expiry Date</p>
                            <p>05-Nov-2026</p>
                        </div>
                        <div className='flex flex-col gap-6'>
                            <p className='font-semibold'>SKU No</p>
                            <p>KS944RUR</p>
                        </div>
                        <div className='flex flex-col gap-6'>
                            <p className='font-semibold'>View Details</p>
                            <button className='p-2 rounded-lg bg-primary-blue text-white'>View Details</button>
                        </div>
                    </div>

                    <p className='font-semibold mb-3 mt-9'>Date Added:06 Nov 2023</p>

                    <div className='flex p-6 items-center justify-between border-b-2 border-t-2 '>
                        <div className='flex flex-col gap-6'>
                            <p className='font-semibold '>Product Name</p>
                            <div className='flex gap-5 items-center '>
                                <div className='w-[80px] h-[60px]'>
                                    <img className='w-full h-full object-cover' src="https://cdn.pixabay.com/photo/2021/09/08/07/20/air-conditioner-6605973_1280.jpg" alt="" />
                                </div>
                                <p>Voltas Vectra 4 in 1 Convertible 1.5 ton</p>
                            </div>

                        </div>
                        <div className='flex flex-col gap-6'>
                            <p className='font-semibold'>Expiry Date</p>
                            <p>05-Nov-2026</p>
                        </div>
                        <div className='flex flex-col gap-6'>
                            <p className='font-semibold'>SKU No</p>
                            <p>KS944RUR</p>
                        </div>
                        <div className='flex flex-col gap-6'>
                            <p className='font-semibold'>View Details</p>
                            <button className='p-2 rounded-lg bg-primary-blue text-white'>View Details</button>
                        </div>
                    </div>

                    <p className='font-semibold mb-3 mt-9'>Date Added:06 Nov 2023</p>

                    <div className='flex p-6 items-center justify-between border-b-2 border-t-2 '>
                        <div className='flex flex-col gap-6'>
                            <p className='font-semibold '>Product Name</p>
                            <div className='flex gap-5 items-center '>
                                <div className='w-[80px] h-[60px]'>
                                    <img className='w-full h-full object-cover' src="https://cdn.pixabay.com/photo/2021/09/08/07/20/air-conditioner-6605973_1280.jpg" alt="" />
                                </div>
                                <p>Voltas Vectra 4 in 1 Convertible 1.5 ton</p>
                            </div>

                        </div>
                        <div className='flex flex-col gap-6'>
                            <p className='font-semibold'>Expiry Date</p>
                            <p>05-Nov-2026</p>
                        </div>
                        <div className='flex flex-col gap-6'>
                            <p className='font-semibold'>SKU No</p>
                            <p>KS944RUR</p>
                        </div>
                        <div className='flex flex-col gap-6'>
                            <p className='font-semibold'>View Details</p>
                            <button className='p-2 rounded-lg bg-primary-blue text-white'>View Details</button>
                        </div>
                    </div>

                    <p className='font-semibold mb-3 mt-9'>Date Added:06 Nov 2023</p>

                    <div className='flex p-6 items-center justify-between border-b-2 border-t-2 '>
                        <div className='flex flex-col gap-6'>
                            <p className='font-semibold '>Product Name</p>
                            <div className='flex gap-5 items-center '>
                                <div className='w-[80px] h-[60px]'>
                                    <img className='w-full h-full object-cover' src="https://cdn.pixabay.com/photo/2021/09/08/07/20/air-conditioner-6605973_1280.jpg" alt="" />
                                </div>
                                <p>Voltas Vectra 4 in 1 Convertible 1.5 ton</p>
                            </div>

                        </div>
                        <div className='flex flex-col gap-6'>
                            <p className='font-semibold'>Expiry Date</p>
                            <p>05-Nov-2026</p>
                        </div>
                        <div className='flex flex-col gap-6'>
                            <p className='font-semibold'>SKU No</p>
                            <p>KS944RUR</p>
                        </div>
                        <div className='flex flex-col gap-6'>
                            <p className='font-semibold'>View Details</p>
                            <button className='p-2 rounded-lg bg-primary-blue text-white'>View Details</button>
                        </div>
                    </div>

                </div>
            </section> : <div style={{border:"2px solid red"}} className='pt-5 mb-5'>

                <div className="max-w-7xl mx-auto px-5 md:px-10 ">
                    <p style={{ margin: "0 auto" }} className='font-semibold text-4xl w-fit'> Select Membership</p>
                    {membershipOffers.length > 0 && membershipOffers.map((curElem) => {
                        return (
                            <div className={`flex justify-center items-center my-8 `}>
                                <div onClick={() => handleMembership(curElem)} className={`flex gap-2 flex-col justify-center ${getColorClass(curElem.memb_name)} cursor-pointer items-center border-2 py-4 px-12 rounded-lg`}>
                                    <p className='font-bold text-3xl text-white'>{curElem.memb_name.toUpperCase()}</p>
                                    <p className='font-bold text-xl capitalize text-white'>{curElem.description}</p>
                                    <p className='font-bold text-3xl text-white'>₹{curElem.price}</p>
                                    <p className='text-sm font-bold text-white'>Valid till - 31-09-2023</p>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>}
            <Footer />
        </div>
    )
}

export default MembershipPage