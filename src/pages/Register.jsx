import React from 'react';
import { useForm } from 'react-hook-form';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // Your registration logic goes here
        console.log(data);
    };

    return (
        <div className='w-full md:w-2/3 mx-auto shadow-md p-8 rounded-md'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>

                <div className="mb-4">
                    <label htmlFor="name" className="block text-blue-500 text-sm font-bold mb-2">
                        Name:
                    </label>
                    <input
                        {...register('name', { required: 'Name is required' })}
                        type="text"
                        placeholder="Your name"
                        className={`p-3 border rounded w-full focus:outline-none focus:border-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-blue-500 text-sm font-bold mb-2">
                        Email:
                    </label>
                    <input
                        {...register('email', { required: 'Email is required', pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
                        type="email"
                        placeholder="Your email"
                        className={`p-3 border rounded w-full focus:outline-none focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-blue-500 text-sm font-bold mb-2">
                        Password:
                    </label>
                    <input
                        {...register('password', { required: 'Password is required', minLength: 6 })}
                        type="password"
                        placeholder="Your password"
                        className={`p-3 border rounded w-full focus:outline-none focus:border-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>



                <div className="mt-4">
                    <button
                        type="submit"
                        className="btn btn-outline text-black hover:text-white border-0 border-b-4 hover:border-blue-600 border-blue-600 w-full hover:bg-blue-600"
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
