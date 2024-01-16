import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [isShow, setIsShow] = useState(false);

    const onSubmit = (data) => {
        //  form submission here
        console.log(data);
    };

    return (
        <div className='w-full md:w-2/3 mx-auto shadow-md p-8 rounded-md'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
                <div className="mb-4 ">
                    <label htmlFor="email" className="block text-blue-500 text-sm font-bold mb-2">
                        Email:
                    </label>
                    <input
                        {...register('email', { required: 'Email is required' })}
                        type="email"
                        placeholder="email"
                        className={`p-3 border rounded w-full focus:outline-none focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                    <div className="flex justify-between">
                        <label htmlFor="password" className="text-sm mb-2 text-blue-500">
                            Password
                        </label>
                    </div>
                    <input
                        type={isShow ? 'text' : 'password'}
                        name="password"
                        autoComplete="current-password"
                        id="password"
                        required
                        placeholder="*******"
                        {...register('password', { required: 'Password is required' })}
                        className={`p-3 border rounded w-full focus:outline-none focus:border-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>

                {/* ... other form fields ... */}

                <div className="mt-3 flex items-center gap-x-2">
                    <input onClick={() => setIsShow(!isShow)} className="text-2xl" type="checkbox" name="" id="" />
                    <p>Show password</p>
                </div>

                <div className="mt-4">
                    <button
                        type="submit"
                        className="btn btn-outline text-black hover:text-white border-0 border-b-4 hover:border-blue-600 border-blue-600 w-full hover:bg-blue-600"
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
