import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from "axios";
import FormInput from './FormInput'





const Form = () => {

    const Url = process.env.NEXT_PUBLIC_Fetch_Form_API
    const [Fetch_Form_API_Results, setFetch_Form_API_Results] = useState(null)

//    Get Request 

useEffect(() => {

        axios.get(`${Url}`,)
            .then(response => {
                setFetch_Form_API_Results(response.data)

            })
    }, [Url]);

    let theOccupations
    let theStates

    if (Fetch_Form_API_Results) {
        theOccupations = Fetch_Form_API_Results.occupations.map(occupation => {
            return (
                <option key={occupation}>{occupation}</option>
            )
        })

    }

    if (Fetch_Form_API_Results) {
        theStates = Fetch_Form_API_Results.states.map(states => {
            return (
                <option key={states.name} value={JSON.stringify({name: states.name, abbreviation: states.abbreviation})}>{states.name} {states.abbreviation}</option>
            )
        })
}

const handleChange = (e) => {
        if(e.target.name === 'state') {
            setData({ ...data, [e.target.name]: JSON.parse(e.target.value) })
        } else {
            setData({ ...data, [e.target.name]: e.target.value })
        }
}
    // Post Request

    const [Posted, isPosted] = useState(false)

    const INITIAL_STATE = {

        name: "",
        email: "",
        password: "",
        occupation: "",
        state: []

    }

    const [data, setData] = useState(INITIAL_STATE)





    const handleSubmit = async (e) => {
    // prevent multiple post request
    e.preventDefault();
    isPosted(false)
    
    try {
    const response = await axios.post(`${Url}`, data)
    if (response.status === 201) {
        isPosted(true)
    }
    } catch (error) {
    //   console.log("Error:", error)
    }
    }



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