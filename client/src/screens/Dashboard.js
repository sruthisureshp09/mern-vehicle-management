import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVehicle, fetchVehicles } from '../actions/adminActions'
import { Link, useNavigate } from 'react-router-dom'
import { loginSuccess } from '../features/loginSlice'


const Dashboard = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [search, setSearch] = useState('')
    const { loading, vehicles, error } = useSelector(state => state.fetchVehicles)
    console.log(vehicles);

    const { userInfo } = useSelector(state => state.login)

    const filteredVehicles = vehicles.filter((vehicle) =>
        vehicle.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleClick = (vehicleId) => {
        dispatch(fetchVehicle(vehicleId))
        navigate('/details')
    }

    useEffect(() => {
        dispatch(fetchVehicles())
    }, [])

    useEffect(() => {
        if (userInfo == null) {
            navigate('/login')
        }
    }, [userInfo])

    const handleLogout = () => {
        localStorage.removeItem("userInfo");
        dispatch(loginSuccess(null))
        navigate('/login')
    }

    return (
        <>
            <div class="bg-gray-900 min-h-screen flex items-center justify-center">
                <div class="bg-gray-800 flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10 max-w-6xl sm:p-6 sm:my-2 sm:mx-4 sm:rounded-2xl">
                    <div class="bg-gray-900 px-2 lg:px-4 py-2 lg:py-10 sm:rounded-xl flex lg:flex-col justify-between">
                        <nav class="flex items-center flex-row space-x-2 lg:space-x-0 lg:flex-col lg:space-y-2">
                            <a class="text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-gray-800 hover:text-white smooth-hover" href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                            </a>

                            <a onClick={handleLogout} class="text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-gray-800 hover:text-white smooth-hover" href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clip-rule="evenodd" />
                                </svg>
                            </a>
                        </nav>
                    </div>
                    {/* <!-- Content --> */}
                    <div class="flex-1 px-2 sm:px-0">
                        <div class="flex justify-between items-center">
                            <h3 class="text-3xl font-extralight text-white/50">Vehicles</h3>
                            <div class="inline-flex items-center space-x-2">
                                <div class="pt-2 relative mx-auto flex gap-2 text-gray-600">
                                    <input class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                        type="search"
                                        onChange={(e) => {
                                            setSearch(e.target.value)
                                        }}
                                        name="search" placeholder="Search" />
                                </div>
                            </div>
                        </div>
                        <div class="mb-10 sm:mb-0 mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            <div class="group bg-gray-900/30 py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/40 hover:smooth-hover">
                                <Link to="/add"> <a class="bg-gray-900/70 text-white/50 group-hover:text-white group-hover:smooth-hover flex w-20 h-20 rounded-full items-center justify-center" href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </a></Link>
                                <a class="text-white/50 group-hover:text-white group-hover:smooth-hover text-center" href="#">Add New</a>
                            </div>

                            {filteredVehicles.map((vehicle, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        handleClick(vehicle._id)
                                    }}
                                    className="relative group bg-gray-900 py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover">
                                    <img
                                        className="w-20 h-20 object-cover object-center rounded-full"
                                        src={`https://techfrairbackend.onrender.com/assets/images/${vehicle.primaryImage}`}
                                        alt="Vehicle"
                                    />
                                    <h4 className="text-white text-2xl font-bold capitalize text-center">
                                        {vehicle.name}
                                    </h4>
                                    <p className="text-white/50">Price: {vehicle.price}</p>
                                    <p className="text-white/50">Quantity: {vehicle.availableQuantity}</p>
                                    <p className="absolute top-2 text-white/20 inline-flex items-center text-xs">
                                        View <span className="ml-2 w-2 h-2 block bg-green-500 rounded-full group-hover:animate-pulse"></span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard