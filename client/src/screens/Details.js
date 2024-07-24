import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { deleteVehicle } from '../actions/adminActions'

const Details = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, error, vehicleDetails } = useSelector((state) => state.fetchVehicle)

    const handleDelete = async (vehicleId) => {
        await dispatch(deleteVehicle(vehicleId))
        navigate("/")
    }

    return (
        <>
            <div class="bg-gray-900 min-h-screen flex items-center justify-center">
                <div class="bg-gray-800 flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10 max-w-6xl sm:p-6 sm:my-2 sm:mx-4 sm:rounded-2xl">
                    <div class="bg-gray-900 px-2 lg:px-4 py-2 lg:py-10 sm:rounded-xl flex lg:flex-col justify-between">
                        <nav class="flex items-center flex-row space-x-2 lg:space-x-0 lg:flex-col lg:space-y-2">
                          <Link to="/">  <a class="text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-gray-800 hover:text-white smooth-hover" href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                            </a></Link>
                            {/* <!-- Active: bg-gray-800 text-white, Not active: text-white/50 --> */}
                        </nav>
                      
                    </div>
                    {/* <!-- Content --> */}
                    <div class="flex-1 px-2 sm:px-0">
                        <div class="flex justify-between items-center">
                            <h3 class="text-sm font-bold text-white/50 cursor-pointer" onClick={() => {
                                navigate(-1); // Go back to the previous page
                            }}>GO BACK</h3>
                            <h6 class="text-sm font-bold text-white/50 cursor-pointer" onClick={() => {
                                handleDelete(vehicleDetails._id)
                            }}>DELETE</h6>
                        </div>
                        <div class="mt-4">
                            <div class="flex items-center justify-center">
                                <div class="grid grid-cols-12 gap-2 gap-y-4 max-w-6xl">
                                    {vehicleDetails?.secondaryImages?.map((secondaryImage, index) => (
                                        <div key={index} className="col-span-12 sm:col-span-6 md:col-span-3">
                                            <div className="w-full flex flex-col">
                                                <div className="relative">
                                                    <a href="#">
                                                        <img
                                                            src={`https://techfrairbackend.onrender.com/assets/images/${secondaryImage}`}
                                                            className="w-96 h-48 rounded"
                                                            alt={`Secondary Vehicle ${index + 1}`}
                                                        />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div class="max-w-4xl px-10 my-4 py-6 rounded-lg">
                                <div class="flex justify-between items-center">
                                    {/* <span class="font-light text-gray-600">mar 10, 2019</span> */}
                                    <a class="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500" href="#">{vehicleDetails?.name}</a>
                                </div>
                                <div class="mt-2">
                                    <a class="text-2xl text-gray-400 font-bold hover:text-gray-600" href="#">Manufacturer: {vehicleDetails?.manufacturer}</a>
                                    <p class="mt-2 text-gray-300">Description: {vehicleDetails?.description}</p>
                                    <p class="mt-2 text-gray-300">Quantity: {vehicleDetails?.availableQuantity}</p>
                                </div>
                                {/* <div class="flex justify-between items-center mt-4">
                                    <a class="text-blue-600 hover:underline" href="#">Read more</a>
                                    <div>
                                        <a class="flex items-center" href="#">
                                            <img class="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block" src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=373&q=80" alt="avatar"/>
                                                <h1 class="text-gray-700 font-bold">Khatab wedaa</h1>
                                        </a>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Details