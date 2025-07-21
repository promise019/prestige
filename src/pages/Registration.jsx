import { NavLink, Outlet } from "react-router";

export default function Registraion(){
    
    return (
        <div className="bg-green-600 p-2 h-screen md:px-40 lg:px-50 xl:px-100 2xl:px-200">
            <nav className="grid grid-cols-2 text-center">
                <NavLink to='login' className={({isActive})=>`registration-navigation ${isActive ? 'border-b-3 border-white' : ''} `}>Login</NavLink>
                <NavLink to='signup' className={({isActive})=>`registration-navigation ${isActive ? 'border-b-3 border-white' : ''} `}>Signup</NavLink>
            </nav>
            <Outlet/>
        </div>
    )
}