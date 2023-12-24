import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [gender, setGender] = useState('')
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const Register = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5000/users`, {
                name: name,
                email: email,
                gender: gender,
                password: password,
                confirmPassword: confirmPassword
            });
            navigate('/');
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (
        <section className=' bg-gray-100 text-gray-800 antialiased px-4 py-6 flex flex-col justify-center sm:py-12'>
            <div className='relative py-3 font-poppins sm:max-w-xl sm:mx-auto text-center'>
                <span className='text-2xl font-light'>Login Admin</span>
                <div className='mt-4 bg-white shadow-md sm:rounded-lg text-left'>
                    <div className='h-2 bg-indigo-400 rounded-t-md'></div>
                    <form onSubmit={Register} className=''>
                        <a className='text-light text-bold'>{msg}</a>
                        <div className='px-8 py-2 pb-2'>
                            <label className='block font-semibold '> Name </label>
                            <input type='text' className='border w-full h-5 px-3 py-5 mt-2 rounded-lg hover:outline-none focus:outline-none focus:ring-1 focus:ring-border-indigo-600' placeholder='Your Name'
                                value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='px-8 py-2'>
                            <label className='block font-semibold '> Email </label>
                            <input type='email' className='border w-full h-5 px-3 py-5 mt-2 rounded-lg hover:outline-none focus:outline-none focus:ring-1 focus:ring-border-indigo-600' placeholder='Email'
                                value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='px-8 py-2'>
                            <label className='block font-semibold '> Password </label>
                            <input type='password' className='border w-full h-5 px-3 py-5 mt-2 rounded-lg hover:outline-none focus:outline-none focus:ring-1 focus:ring-border-indigo-600' placeholder='Password'
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='px-8 py-2'>
                            <label className='block font-semibold '> Confirm Password </label>
                            <input type='password' className='border w-full h-5 px-3 py-5 mt-2 rounded-lg hover:outline-none focus:outline-none focus:ring-1 focus:ring-border-indigo-600' placeholder='Confirm Password'
                                value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} />
                        </div>
                        <div className='px-8 -my-2 pt-3' value={gender} onChange={(e) => setGender(e.target.value)}>
                            <label className='block font-semibold '> Gender </label>
                            <input id="male" className="peer/male mr-2" type="radio" name="gender" value="Male"/>
                            <label htmlFor="male" className="peer-checked/male:text-sky-500 mr-3">Male</label>
                            <input id="female" className="peer/female mr-2" type="radio" name="gender" value="Female" />
                            <label htmlFor="female" className="peer-checked/female:text-sky-500">Female</label>
                        </div>
                        <div className='px-8 py-5 flex justify-between items-baseline'>
                            <button type='submit' className='mr-1 mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline'>Register</button>
                            <a href='/' className='text-sm text-light hover:underline hover:text-indigo-400 mr-2'> Have a Account? Login </a>
                        </div>
                    </form>
                </div>

            </div>

        </section>

    )
}

export default Register;