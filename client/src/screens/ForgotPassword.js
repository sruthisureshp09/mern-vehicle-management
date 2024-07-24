import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Link, useNavigate } from 'react-router-dom'
import { getLinkAction } from '../actions/adminActions'

const ForgotPassword = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')

    const handleClick = () => {
        if (!email) {
            window.alert("Please enter your registered email")
        } else {
            dispatch(getLinkAction(email))
            window.alert('Reset password link has been sent to your email')
        }
    }
    return (
        <div>
            <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 mt-16">
                <div class="mx-auto max-w-lg">
                    <h1 class="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                        RESET PASSWORD
                    </h1>
                    <form
                        class="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8" >
                        <p class="text-center text-lg font-medium">Get Link</p>

                        <div>
                            <label for="email" class="sr-only">Email</label>

                            <div class="relative">
                                <input
                                    type="email"
                                    class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter email"
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}
                                />

                                <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-4 w-4 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handleClick}
                            class="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                        >
                            Get Link
                        </button>

                        <p class="text-center text-sm text-gray-500">
                            Go Back
                            <Link to="/login"> <a class="underline">Login</a></Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword