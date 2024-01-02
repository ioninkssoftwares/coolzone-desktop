
import React, { ReactElement, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Sidebar from "../../components/sidebar/Sidebar";

const Admin404 = ({ tittle, source }) => {

    return (
        <div>
            <div className='flex h-screen overflow-hidden'>
                <Sidebar />
                <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                    {/* <main> */}
                    <div className="flex items-center justify-center h-screen bg-gray-100">
                        <div className="text-center">
                            <h2 className="text-6xl font-bold text-gray-800 mb-4">404</h2>
                            <p className="text-xl text-gray-600 mb-4">
                                Oops! Page not found.
                            </p>
                            <Link
                                to={source}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-600"
                            >
                                {tittle}
                            </Link>
                        </div>
                    </div>
                </div>
                {/* </main> */}
            </div>
        </div >

        // </div>
    );
};

export default Admin404;
