import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from "axios";
import FormInput from './FormInput'





const Form = () => {

    return (
        // the Container for the page
        <div className="h-screen md:flex">
            <div
                className="relative overflow-hidden md:flex w-1/2 i justify-around items-center hidden">
                <div>
                    <h1 className="text-white font-bold text-4xl font-sans">Fetchrewards</h1>
                    <p className="text-white mt-1">Snap receipts, earn rewards and
                        connect with friends in the Fetch app!</p>
                        {/* the Link brings you to the landing page of fetch Rewards */}
                    <Link href={`https://fetch.com/`} target='_blank'>
                        <button className="transition delay-150 duration-300 ease-in-out block w-28 bg-white hover:bg-yellow-400 text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">Learn More</button>
                    </Link>
                </div>
                {/* small figures on top */}
                <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            </div>

            {/* container for the Form */}
          <FormInput/>
        </div>

    )
}

export default Form