import React, { useEffect, useState } from 'react'
import axios from "axios";

const FormInput = () => {
    const Url = process.env.NEXT_PUBLIC_Fetch_Form_API
    const [Fetch_Form_API_Results, setFetch_Form_API_Results] = useState(null)
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [occupationsError, setOccupationError] = useState('');
    const [statesError, setStatesError] = useState('');

    // Get Request 

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
                <option placeholder={occupation} key={occupation}>{occupation}</option>
            )
        })

    }

    if (Fetch_Form_API_Results) {
        theStates = Fetch_Form_API_Results.states.map(states => {
            return (
                <option placeholder={states.name} key={states.name} value={JSON.stringify({ name: states.name, abbreviation: states.abbreviation })}>{states.name} {states.abbreviation}</option>
            )
        })
    }

    const handleChange = (e) => {
        if (e.target.name === 'state') {
            const value = e.target.value.trim();
            if (value) {
                try {
                    const parsedValue = JSON.parse(value);
                    setData({ ...data, [e.target.name]: parsedValue });
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            }
        } else {
            setData({ ...data, [e.target.name]: e.target.value });
        }
    }
    const [Posted, isPosted] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.name.length < 3) {
            setNameError('Please enter a valid name');
            return;
        } else {
            setNameError('');
        }

        if (data.email.length < 3) {
            setEmailError('Email is too short');
            return;
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            setEmailError('Please enter a valid email. Example: joe@gmail.com');
            return;
        } else {
            setEmailError('');
        }
        

        if (!data.password || data.password.trim().length < 8) {
            setPasswordError('Password must be at least 8 characters');
            return;
        } else {
            setPasswordError('');
        }
        

        if (!data.occupation) {
            setOccupationError('Please select an occupation');
            return;
        } else {
            setOccupationError('');
        }
        

        if(!data.state){
            setStatesError('Please select a State')
            return
        } else{
            setStatesError('')
        }



        try {
            const response = await axios.post(`${Url}`, data);
            if (response.status === 201) {
                isPosted(true);
            }
        } catch (error) {
            // console.log("Error:", error);
        }
    };

  

    const INITIAL_STATE = {
        name: "",
        email: "",
        password: "",
        occupation: "",
        state: []
    }

    const [data, setData] = useState(INITIAL_STATE);



    return (
        <div className="flex md:w-1/2 justify-center py-10 items-center  mybackground" >
            {/*if the posted is false it will display the form but as soon as it becomes true it will display the h2. At the place of the h2 I can add a component. the component will show success */}

            {/*if the posted is false it will display the form but as soon as it becomes true it will display the h2. At the place of the h2 I can add a component. the component will show success */}
            {
                !Posted ?
                    <form onSubmit={handleSubmit} data-cy='form-input'>
                        <h1 data-cy='heading1-forminput' className="text-black font-bold text-2xl mb-1">Hi There!</h1>
                        <p data-cy='paragraph1-forminput' className="text-sm font-normal text-black mb-7">Welcome</p>
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 border-black">
                            <svg data-cy='svg1-forminput' xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                    clipRule="evenodd" />
                            </svg>
                            <label htmlFor="fullname" />
                            <input data-cy='input-forminput-name' id='fullname' onChange={handleChange} className="pl-2 outline-none border-none bg-transparent text-black" type="text" name="name" value={data.name} placeholder="Full name"/>
                        </div>
                        <p data-cy='error-forminput-name' className='text-red-500 text-sm'>{nameError}</p>
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 border-black">
                            <svg data-cy='svg2-forminput' xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                            <label htmlFor="email" />
                            <input data-cy='input-forminput-email' id='email' onChange={handleChange} className="pl-2 outline-none border-none bg-transparent text-black" type="text" name="email" value={data.email} placeholder="Email Address"/>
                        </div>
                        <p data-cy='error-forminput-email' className='text-red-500 text-sm'>{emailError}</p>
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 border-black">
                            <svg data-cy='svg3-forminput' xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fillRule="evenodd"
                                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                    clipRule="evenodd" />
                            </svg>
                            <label htmlFor="password" />
                            <input data-cy='input-forminput-password' id='password' onChange={handleChange} className="pl-2 outline-none border-none bg-transparent text-black" type="text" name="password" value={data.password} placeholder="Password"/>
                        </div>
                        <p data-cy='error-forminput-password' className='text-red-500 text-sm'>{passwordError}</p>
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 border-black">
                            <svg data-cy='svg4-forminput' xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M5,22H19a3,3,0,0,0,3-3V9a3,3,0,0,0-3-3H17V4a2,2,0,0,0-2-2H9A2,2,0,0,0,7,4V6H5A3,3,0,0,0,2,9V19A3,3,0,0,0,5,22ZM9,4h6V6H9ZM4,9A1,1,0,0,1,5,8H19a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1Zm2,3a1,1,0,0,1,1-1H17a1,1,0,0,1,0,2H7A1,1,0,0,1,6,12Zm0,4a1,1,0,0,1,1-1H17a1,1,0,0,1,0,2H7A1,1,0,0,1,6,16Z" />
                            </svg>

                            <select data-cy='select-forminput-occupation' title='occupations' onChange={handleChange} className="pl-2 outline-none border-none bg-transparent text-black" type="text" name="occupation" value={data.occupation} placeholder="Occupation">
                                {theOccupations}
                            </select>
                        </div>
                        <p data-cy='error-forminput-occupation' className='text-red-500 text-sm'>{occupationsError}</p>
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 border-black">
                            <svg data-cy='svg5-forminput' xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M11.3856 23.789L11.3831 23.7871L11.3769 23.7822L11.355 23.765C11.3362 23.7501 11.3091 23.7287 11.2742 23.7008C11.2046 23.6451 11.1039 23.5637 10.9767 23.4587C10.7224 23.2488 10.3615 22.944 9.92939 22.5599C9.06662 21.793 7.91329 20.7041 6.75671 19.419C5.60303 18.1371 4.42693 16.639 3.53467 15.0528C2.64762 13.4758 2 11.7393 2 10C2 7.34784 3.05357 4.8043 4.92893 2.92893C6.8043 1.05357 9.34784 0 12 0C14.6522 0 17.1957 1.05357 19.0711 2.92893C20.9464 4.8043 22 7.34784 22 10C22 11.7393 21.3524 13.4758 20.4653 15.0528C19.5731 16.639 18.397 18.1371 17.2433 19.419C16.0867 20.7041 14.9334 21.793 14.0706 22.5599C13.6385 22.944 13.2776 23.2488 13.0233 23.4587C12.8961 23.5637 12.7954 23.6451 12.7258 23.7008C12.6909 23.7287 12.6638 23.7501 12.645 23.765L12.6231 23.7822L12.6169 23.7871L12.615 23.7885C12.615 23.7885 12.6139 23.7894 12 23L12.6139 23.7894C12.2528 24.0702 11.7467 24.0699 11.3856 23.789ZM12 23L11.3856 23.789C11.3856 23.789 11.3861 23.7894 12 23ZM15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10Z" />
                            </svg>

                            <select data-cy='select-forminput-states' title='states' onChange={handleChange} className="pl-2 outline-none border-none bg-transparent text-black" type="text" name="state" value={data.state[0]} placeholder="State">
                                {theStates}
                            </select>
                        </div>
                        <p data-cy='error-forminput-state' className='text-red-500 text-sm'>{statesError}</p>
                        <button data-cy='button-forminput-submit' type="submit" className="transition delay-150 duration-300 ease-in-out block w-full bg-indigo-600 hover:bg-black mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Submit</button>
                    </form>
                    : <h2 data-cy='heading2-forminput-success'>Thanks for your Submittion</h2>
            }

        </div>
    )
}

export default FormInput 