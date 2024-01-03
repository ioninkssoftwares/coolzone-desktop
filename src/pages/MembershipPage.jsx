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
    const [productFlag, setProductFlag] = useState(false)
    const [productName, setProductName] = useState("")
    const [productSku, setProductSku] = useState("")
    const [matchedMembership, setMatchedMembership] = useState(null);


    if (matchedMembership) {
        console.log(matchedMembership, "sdahjfaksfgdfdgdffdj")
    }

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
            window.location.reload();
        } catch (error) {
            console.log(error)

        }

    }

    const handleProductIntoMembership = async () => {
        const instances = useAxios(token)
        try {
            const product = [{
                name: productName,
                skuid: productSku
            }]
            const response = await instances.put(`/membership/addProductToMemberShip/`, product)
            setProductName("")
            setProductSku("")
            setProductFlag(true)
            window.location.reload();
            console.log(response.data)
            // setMembership(true)
        } catch (error) {
            console.log(error)

        }

    }



    // useEffect(() => {
    //     if (userMembership && membershipOffers?.length > 0) {
    //         console.log("yehhhhhhhhhhh")
    //       const matchedMembership = membershipOffers?.find(
    //         (membership) => membership._id === userMembership?.user_Membership[0]
    //       );
    //       setMatchedMembership(matchedMembership);
    //     }
    //   }, [userMembership, membershipOffers]);

    useEffect(() => {
        if (userMembership && userMembership.user_Membership && membershipOffers?.length > 0) {
            console.log("yehhhhhhhhhhh");
            const userMembershipId = userMembership.user_Membership[0];

            // Check if the userMembershipId is defined before attempting to find it in membershipOffers
            if (userMembershipId !== undefined) {
                const matchedMembership = membershipOffers.find((membership) => membership._id === userMembershipId);

                // Check if the matchedMembership is not undefined before setting the state
                if (matchedMembership !== undefined) {
                    setMatchedMembership(matchedMembership);
                }
            }
        }
    }, [userMembership, membershipOffers]);


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
            {userMembership && userMembership.user_Membership?.length > 0 ? <section className="pt-5 mb-5">
                <div className="max-w-7xl mx-auto px-5 md:px-10 ">
                    <p style={{ margin: "0 auto" }} className='font-semibold text-4xl w-fit'>Membership Section</p>
                    <div className='flex justify-center items-center my-8'>
                        <div className='flex bg-[#ffd700] gap-2 flex-col justify-center items-center border-2 py-4 px-10 rounded-lg ' >
                            <p className='font-bold text-3xl text-white'>{matchedMembership?.memb_name} Membership  </p>
                            <p className='font-bold text-3xl text-center text-white'>{matchedMembership?.description}   </p>
                            <p className='text-sm font-bold text-white'>Valid till - 31-09-2023</p>
                        </div>
                    </div>

                    {<div>
                        <div className='flex flex-col md:flex-row justify-center items-center gap-4'>
                            <input onChange={(e) => setProductName(e.target.value)} type="text" placeholder='Product Name' />
                            <input onChange={(e) => setProductSku(e.target.value)} type="text" placeholder='SKU No' />
                            <button onClick={handleProductIntoMembership} className='bg-primary-blue text-white px-8 py-2 rounded-lg'>Add Product</button>
                        </div>
                        <div>

                            {/* product membership card above one */}
                            {userMembership && userMembership.user_Membership_product?.length > 0 ? (
                                userMembership.user_Membership_product.map((curElem, index) => {
                                    if (curElem) {
                                        return (
                                            <div key={index}>
                                                <p className='font-semibold mb-3 mt-9'>Date Added: 06 Nov 2023</p>
                                                <div className='flex p-6 items-center justify-between border-b-2 border-t-2 '>
                                                    <div className='flex flex-col gap-6'>
                                                        <p className='font-semibold '>{curElem?.name}</p>
                                                        <div className='flex gap-5 items-center '>
                                                            <div className='w-[80px] h-[60px]'>
                                                                <img className='w-full h-full object-cover' src="https://cdn.pixabay.com/photo/2021/09/08/07/20/air-conditioner-6605973_1280.jpg" alt="" />
                                                            </div>
                                                            {/* <p>Voltas Vectra 4 in 1 Convertible 1.5 ton</p> */}
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-col gap-6'>
                                                        <p className='font-semibold'>Expiry Date</p>
                                                        <p>05-Nov-2026</p>
                                                    </div>
                                                    <div className='flex flex-col gap-6'>
                                                        <p className='font-semibold'>SKU No</p>
                                                        <p>{curElem?.skuid}</p>
                                                    </div>
                                                    <div className=' flex-col gap-6 hidden md:flex'>
                                                        <p className='font-semibold'>View Details</p>
                                                        <button className='p-2 rounded-lg bg-primary-blue text-white'>View Details</button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    } else {
                                        return null; // Skip rendering if the element is null
                                    }
                                })
                            ) : (
                                <p>No user membership data available</p>
                            )}


                        </div>
                    </div>
                    }
                </div>
            </section> : <div className='pt-5 mb-5'>

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






// import React, { useState } from 'react';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';




// import Switch from '@mui/material/Switch';

// const ApplianceSwitches = () => {
//   // Appliance types
//   const washingMachineTypes = ["Top Load Agitator", "Top Load Impeller", "Front Load", "Fully Automatic Front Load"];
//   const airConditionerTypes = ["Window A/C", "Split A/C", "Inverter Split A/C", "Cooling Casette", "Column A/C"];
//   const microwaveHouseholdTypes = ["Microwave", "O.T.G", "Convection Oven"];
//   const microwaveCommercialTypes = ["Standard Oven", "Pizza Oven", "Conveyor Oven", "Rotisserie Oven"];
//   const mixedTypes = ["Juicer", "Mixer Grinder", "Water Purifier"];

//   // Initialize states for switches
//   const [washingMachineState, setWashingMachineState] = useState(
//     washingMachineTypes.reduce((acc, type) => {
//       acc[type] = true;
//       return acc;
//     }, {})
//   );

//   const [airConditionerState, setAirConditionerState] = useState(
//     airConditionerTypes.reduce((acc, type) => {
//       acc[type] = true;
//       return acc;
//     }, {})
//   );

//   const [microwaveHouseholdState, setMicrowaveHouseholdState] = useState(
//     microwaveHouseholdTypes.reduce((acc, type) => {
//       acc[type] = true;
//       return acc;
//     }, {})
//   );

//   const [microwaveCommercialState, setMicrowaveCommercialState] = useState(
//     microwaveCommercialTypes.reduce((acc, type) => {
//       acc[type] = true;
//       return acc;
//     }, {})
//   );

//   const [mixedTypesState, setMixedTypesState] = useState(
//     mixedTypes.reduce((acc, type) => {
//       acc[type] = true;
//       return acc;
//     }, {})
//   );

//   const handleSwitch = (type, appliance) => {
//     switch (appliance) {
//       case 'washingMachine':
//         setWashingMachineState((prevState) => ({
//           ...prevState,
//           [type]: !prevState[type],
//         }));
//         break;
//       case 'airConditioner':
//         setAirConditionerState((prevState) => ({
//           ...prevState,
//           [type]: !prevState[type],
//         }));
//         break;
//       case 'microwaveHousehold':
//         setMicrowaveHouseholdState((prevState) => ({
//           ...prevState,
//           [type]: !prevState[type],
//         }));
//         break;
//       case 'microwaveCommercial':
//         setMicrowaveCommercialState((prevState) => ({
//           ...prevState,
//           [type]: !prevState[type],
//         }));
//         break;
//       case 'mixedTypes':
//         setMixedTypesState((prevState) => ({
//           ...prevState,
//           [type]: !prevState[type],
//         }));
//         break;
//       // Add cases for other appliances if needed
//       default:
//         break;
//     }
//   };

//   return (
//     <>
//       <div className="mt-16">
//         <p className="my-4 text-xl font-semibold">Washing Machine</p>
//         <div className="flex gap-12">
//           {washingMachineTypes.map((type) => (
//             <FormControlLabel
//               key={type}
//               label={type}
//               control={
//                 <Switch
//                   checked={washingMachineState[type]}
//                   onChange={() => handleSwitch(type, 'washingMachine')}
//                 />
//               }
//               className="mr-4"
//             />
//           ))}
//         </div>
//       </div>

//       <div className="mt-16">
//         <p className="my-4 text-xl font-semibold">Air Conditioner</p>
//         <div className="flex gap-12">
//           {airConditionerTypes.map((type) => (
//             <FormControlLabel
//               key={type}
//               label={type}
//               control={
//                 <Switch
//                   checked={airConditionerState[type]}
//                   onChange={() => handleSwitch(type, 'airConditioner')}
//                 />
//               }
//               className="mr-4"
//             />
//           ))}
//         </div>
//       </div>

//       <div className="mt-16">
//         <p className="my-4 text-xl font-semibold">Microwave</p>
//         <p className="mb-4 text-xl font-semibold">HouseHold </p>
//         <div className="flex gap-12">
//           {microwaveHouseholdTypes.map((type) => (
//             <FormControlLabel
//               key={type}
//               label={type}
//               control={
//                 <Switch
//                   checked={microwaveHouseholdState[type]}
//                   onChange={() => handleSwitch(type, 'microwaveHousehold')}
//                 />
//               }
//               className="mr-4"
//             />
//           ))}
//         </div>
//         <p className="my-4 text-xl font-semibold">Commercial </p>
//         <div className="flex gap-12">
//           {microwaveCommercialTypes.map((type) => (
//             <FormControlLabel
//               key={type}
//               label={type}
//               control={
//                 <Switch
//                   checked={microwaveCommercialState[type]}
//                   onChange={() => handleSwitch(type, 'microwaveCommercial')}
//                 />
//               }
//               className="mr-4"
//             />
//           ))}
//         </div>
//       </div>

//       <div className="mt-16">
//         <p className="my-4 text-xl font-semibold">Mixed Types</p>
//         <div className="flex gap-12">
//           {mixedTypes.map((type) => (
//             <FormControlLabel
//               key={type}
//               label={type}
//               control={
//                 <Switch
//                   checked={mixedTypesState[type]}
//                   onChange={() => handleSwitch(type, 'mixedTypes')}
//                 />
//               }
//               className="mr-4"
//             />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ApplianceSwitches;
