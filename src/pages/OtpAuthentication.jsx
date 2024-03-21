import { useEffect, useState } from 'react';
// import { useRouter } from "next/router";
// import { useAxios } from "src/utills/axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
// import CircularSpinner from 'src/componets/circularLoader';
// import { ErrorDispaly } from './admin/property';
import { useNavigate } from 'react-router-dom';
import { useAxios } from '../utils/axios';
import { CircularProgress } from '@mui/material';


const TermsAndConditions = () => {
    const [agreed, setAgreed] = useState(false);

    const handleAgree = () => {
        setAgreed(true);
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
                <div className="h-40 overflow-y-scroll mb-4">
                    {/* Replace this with your actual terms and conditions content */}
                    <p className="text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet posuere elit. Nulla quis tristique sapien. Integer sodales nisl eu felis ultrices, ac iaculis purus eleifend. Nulla facilisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Fusce vel orci sit amet augue vestibulum consectetur. Duis cursus auctor orci, in dictum dolor facilisis non. Vestibulum eu diam nec dui rhoncus fringilla. Vivamus nec sem eu mauris consequat malesuada.
                        {/* Continue with more content */}
                    </p>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="agreeCheckbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        checked={agreed}
                        onChange={handleAgree}
                    />
                    <label htmlFor="agreeCheckbox" className="ml-2 text-gray-700">
                        I agree to the Terms and Conditions
                    </label>
                </div>
                <button
                    className={`mt-4 py-2 px-4 rounded-md ${agreed ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer' : 'bg-gray-400 text-gray-600 cursor-not-allowed'}`}
                    disabled={!agreed}
                >
                    Continue
                </button>
            </div>
        </div>
    );
};


const OtpAuthentication = () => {
    // const router = useRouter();
    const router = useNavigate()
    const instance = useAxios();
    const [cookies, setCookies] = useCookies(["token"]);
    const [registerFormData, setRegisterFormData] = useState({
        name: '',
        email: '',
        password: '',
        mobileNumber: '',
    });
    const [showLogin, setShowLogin] = useState(true);
    const [showVerify, setShowVerify] = useState(false);
    const [showLoginVerify, setShowLoginVerify] = useState(false);
    const [otpValue, setOtpValue] = useState('');
    const [loginValue, setLoginValue] = useState('');
    const [loginOtp, setLoginOtp] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isVerifyLoading, setIsVerifyLoading] = useState(true);
    const [registerLoading, setRegisterLoading] = useState(true);
    const [registerVerify, setRegisterVerify] = useState(true);
    const [showTerms, setShowTerms] = useState(false);
    const [termsChecked, setTermsChecked] = useState(false);
    const [registerTermsChecked, setRegisterTermsChecked] = useState(false);

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleRegisterClick = () => {
        setShowLogin(false);
    };

    useEffect(() => {
        if (cookies && cookies.token) {
            router("/")
        }
    }, [cookies]);


    // For Login
    const handleLoginSubmit = async () => {
        setIsLoading(false)
        event.preventDefault();
        console.log(loginValue, "login value");
        try {
            // setLoading(true);
            const mobileNo = {
                mobileNo: loginValue,
            };
            const res = await instance.post("/otpLogin", mobileNo);
            if (res.data) {
                toast.success("Otp send Successfully");
                setShowLoginVerify(true)
                setIsLoading(false)
                //   setLoading(false);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast("Mobile number is not registered. Please register first.")
                setShowLogin(false)
                //    setShowLoginVerify(true)
                setIsLoading(true)
                //   router.push("/signup");

            }

            console.log(error);
            setIsLoading(true)
            toast.error("Multiple time login, wait for some time")
            router("/")
        }


    };
    const handleOtpLoginSubmit = async () => {
        setIsVerifyLoading(false)
        console.log(loginValue, "login value");

        try {
            // setLoading(true);
            const data = {
                mobileNo: loginValue,
                otp: loginOtp,
            };
            const res = await instance.post("/verifyLoginOtp", data);
            if (res.data) {
                setCookies("token", res.data.token);
                localStorage.setItem("isAdmin", false);
                localStorage.setItem("userId", res.data.user._id);
                localStorage.setItem("token", res.data.token);
                router("/")
                toast.success("Otp fetch Successfully");
                //   setLoading(false);
            }
        } catch (e) {
            // setLoading(false);
            // ErrorDispaly(e);
            toast.error("Incorrect Otp, Please try again");
            setTimeout(() => {
                router("/");
            }, 2000);



        }

    };


    // For Registraiotn

    const handleRegisterChange = () => {
        const { name, value } = event.target;
        setRegisterFormData((prevData) => ({ ...prevData, [name]: value }));
        console.log(registerFormData, "register");

    };

    const handleRegisterSubmit = async () => {
        setRegisterLoading(false)
        try {
            // setLoading(true);
            const mobileNo = {
                mobileNo: registerFormData.mobileNumber,
            };
            const res = await instance.post("/otpRegister", mobileNo);
            if (res.data) {
                setRegisterLoading(false)
                toast.success("Otp send Successfully");
                setShowVerify(true);
                //   setLoading(false);
            }
        } catch (error) {
            // setLoading(false);
            if (error.response && error.response.status === 400) {
                const errorMessage = error.response.data.message || "User Already Registered, Try Login ";
                toast.error(errorMessage);
                setRegisterLoading(true)
                router("/otp/login")
            } else {
                toast.error("An error occurred. Please try again later.");
            }
        }

    };

    //   For Otp Verification
    const handleOtpSubmit = async () => {
        setRegisterVerify(false)
        event.preventDefault();
        console.log('OTP verified:', otpValue);
        try {
            // setLoading(true);
            const data = {
                name: registerFormData.name,
                email: registerFormData.email,
                mobileNo: registerFormData.mobileNumber,
                otp: otpValue,
            };
            const res = await instance.post("/verifyOtpRegister", data);
            if (res.data) {
                // console.log(res.data.data._id, "reddhh")
                // setCookies("jwtToken", res.data.token);
                // setRegisterVerify(false)
                // localStorage.setItem("isAdmin", false);
                // localStorage.setItem("userId", res.data.data._id);
                console.log(res.data, "res.data")
                setCookies("token", res.data.token);
                localStorage.setItem("isAdmin", false);
                localStorage.setItem("userId", res.data.user._id);
                localStorage.setItem("token", res.data.token);
                router("/")
                toast.success("Otp fetch Successfully");

                //   setLoading(false);
            }
        } catch (e) {
            // setLoading(false);
            // ErrorDispaly(e);
            toast.error("Incorrect Otp, Please try again");
            setTimeout(() => {
                router("/");
            }, 2000);

        }
        setRegisterFormData({
            name: '',
            email: '',
            password: '',
            mobileNumber: '',
        });
        // setShowLogin(true);

    };

    return <>

        {showLogin ? !showLoginVerify ? <>


            {/* <div className='flex space-x-4 justify-center mb-2'>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-6 rounded focus:outline-none focus:shadow-outline' style={{ display: "block" }} onClick={handleLoginClick}>Login</button>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-6 rounded focus:outline-none focus:shadow-outline' style={{ display: "block" }} onClick={handleRegisterClick}>Register</button>
                    </div> */}

            {/* <h1 className="text-2xl font-bold mb-6">Login</h1> */}


            {isLoading ? <div className=" w-screen h-screen flex items-center justify-center bg-white ">


                <form onSubmit={handleLoginSubmit}>
                    <div className="mb-3   ">
                        <label className="block text-gray-400 md:text-lg  font-bold mb-2" htmlFor="otp">
                            Enter your mobile number to get started.
                        </label>
                        <div style={{ height: "50px", margin: "0 0" }}
                            className={`group bg-white focus-within:border-blue-500 border w-full space-x-4 flex justify-center items-center px-4 jj bd  `}
                        >
                            <input
                                // style={{width:"100%"}}
                                className=" appearance-none border-none outline-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                type="text"
                                id="otp"
                                name="otp"
                                value={loginValue}
                                onChange={(e) => setLoginValue(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="">
                        <label className="flex gap-2 justify-center items-center text-gray-400 md:text-lg font-bold mb-2 ">
                            <input
                                type="checkbox"
                                className="mr-2 leading-tight"
                                checked={termsChecked}
                                onChange={() => setTermsChecked(!termsChecked)}
                            />
                            I agree to the terms and conditions
                        </label>
                    </div>

                    <div className="  flex items-center justify-center">
                        <button
                            disabled={!termsChecked}
                            className=" w-full  bg-primary-blue hover:bg-blue-600 text-white font-bold py-4 px-4 rounded-2xl focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Get Otp
                        </button>
                    </div>
                    <div className='px-14 flex justify-center mt-6'>
                        <p className='md:text-md '>If not registered click <span onClick={handleRegisterClick} style={{ color: "blue", fontSize: "20px", fontWeight: "bold", marginLeft: "7px" }}>Sign Up</span></p>
                    </div>
                </form>      </div> : <div className=" w-screen h-screen flex items-center justify-center bg-white  ">
                <CircularProgress />
            </div>}

        </> : <>
            {isVerifyLoading ? <div className=" w-screen h-screen flex items-center justify-center bg-white shadow-md rounded ">
                {/* <h1 className="text-2xl font-bold mb-6">Login</h1> */}

                <form onSubmit={handleOtpLoginSubmit}>
                    <div className="mb-4">
                        <label cla ssName="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
                            Enter Otp
                        </label>
                        <div style={{ height: "50px", margin: "0 0" }}
                            className={`group bg-white focus-within:border-blue-500 border w-full space-x-4 flex justify-center items-center px-4 jj bd  `}
                        >
                            <input
                                className=" appearance-none border-none outline-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                type="text"
                                id="otp"
                                name="otp"
                                value={loginOtp}
                                onChange={(e) => setLoginOtp(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Verify Login
                        </button>
                    </div>
                </form>
            </div> : <div className="w-screen h-screen flex items-center justify-center bg-white ">
                <CircularProgress />
            </div>}

        </> : !showVerify ? <>
            {registerLoading ? <div>
                <div className=" w-screen h-screen flex items-center justify-center bg-white  ">
                    {/* <div className="min-h-screen flex items-center justify-center bg-gray-100">
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md"> */}
                    {/* <div className='flex space-x-4 justify-center mb-2'>
                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-6 rounded focus:outline-none focus:shadow-outline' style={{ display: "block" }} onClick={handleLoginClick}>Login</button>
                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-6 rounded focus:outline-none focus:shadow-outline' style={{ display: "block" }} onClick={handleRegisterClick}>Register</button>
                        </div> */}

                    <form onSubmit={handleRegisterSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <div style={{ height: "50px", margin: "0 0" }}
                                className={`group bg-white focus-within:border-blue-500 border w-full space-x-4 flex justify-center items-center px-4 jj bd  `}
                            >
                                <input
                                    className=" appearance-none border-none outline-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={registerFormData.name}
                                    onChange={handleRegisterChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <div style={{ height: "50px", margin: "0 0" }}
                                className={`group bg-white focus-within:border-blue-500 border w-full space-x-4 flex justify-center items-center px-4 jj bd  `}
                            >
                                <input
                                    className=" appearance-none border-none outline-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={registerFormData.email}
                                    onChange={handleRegisterChange}
                                    required
                                />
                            </div>
                        </div>
                        {/* <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <div style={{ height: "50px", margin: "0 0" }}
                                className={`group bg-white focus-within:border-blue-500 border w-full space-x-4 flex justify-center items-center px-4 jj bd  `}
                            >
                                <input
                                    className=" appearance-none border-none outline-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={registerFormData.password}
                                    onChange={handleRegisterChange}
                                    required
                                />
                            </div>
                        </div> */}
                        <div className="mb-4 ">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobileNumber">
                                Mobile Number
                            </label>
                            <div style={{ height: "50px", margin: "0 0" }}
                                className={`group bg-white focus-within:border-blue-500 border w-full space-x-4 flex justify-center items-center px-4 jj bd  `}
                            >
                                <input
                                    className=" appearance-none border-none outline-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                    type="text"
                                    id="mobileNumber"
                                    name="mobileNumber"
                                    value={registerFormData.mobileNumber}
                                    onChange={handleRegisterChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="px-14">
                            <label className="flex align-middle text-gray-400 text-sm font-bold mb-2 ">
                                <input
                                    type="checkbox"
                                    className="mr-2 leading-tight"
                                    checked={registerTermsChecked}
                                    onChange={() => setRegisterTermsChecked(!registerTermsChecked)}
                                />
                                I agree to the terms and conditions
                            </label>
                        </div>

                        <div className="flex items-center justify-center">
                            <button
                                disabled={!registerTermsChecked}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Register
                            </button>
                            <button
                                className="mx-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline"
                                onClick={handleLoginClick}
                            >
                                Back to Login
                            </button>
                        </div>
                    </form>
                </div>
            </div> : <div className="w-screen h-screen flex items-center justify-center bg-white ">
                <CircularProgress />
            </div>}


        </> : <>
            {registerVerify ? <div className=" w-screen h-screen flex items-center justify-center bg-white shadow-md rounded ">
                {/* <h1 className="text-2xl font-bold mb-6">Verify Mobile No.</h1> */}
                <form onSubmit={handleOtpSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
                            Enter OTP
                        </label>
                        <div style={{ height: "50px", margin: "0 0" }}
                            className={`group bg-white focus-within:border-blue-500 border w-full space-x-4 flex justify-center items-center px-4 jj bd  `}
                        >
                            <input
                                className=" appearance-none border-none outline-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                type="text"
                                id="otp"
                                name="otp"
                                value={otpValue}
                                onChange={(e) => setOtpValue(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Verify
                        </button>
                    </div>
                </form>
            </div> : <div className="w-screen h-screen flex items-center justify-center bg-white ">
                <CircularProgress />
            </div>}

        </>

        }

    </>
};

export default OtpAuthentication;
