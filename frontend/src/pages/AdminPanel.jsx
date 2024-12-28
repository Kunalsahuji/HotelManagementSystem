import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

const AdminPanel = () => {
    const isAdmin = useSelector(store => store.user?.user?.isAdmin)
    console.log(`isAdmin ${isAdmin}`);
    const navigate = useNavigate()
    return (
        <div className="relative flex bg-zinc-50 px-20 pt-28 pb-10 min-h-screen">
            {/* Sidebar */}
            <aside className="top-[16vh] sticky bg-white shadow-xl rounded-xl w-[25%] h-[80vh]">
                <div className="mt-auto p-4">
                    <div className="flex items-center">
                        <img
                            className="rounded-full w-12 h-12"
                            src="https://avatars.githubusercontent.com/u/91369458?s=96&v=4"
                            alt="User"
                        />
                        <div className="ml-4">
                            <p className="font-medium text-gray-700">
                                {isAdmin.username ? isAdmin.username : 'Kunal Sahu'}
                            </p>
                            <p className="text-gray-500 text-sm">
                                {isAdmin.email ? isAdmin.email : 'Kunal@gmail.com'}
                            </p>
                        </div>
                    </div>
                </div>
                <nav className="mt-6 px-1 w-full">
                    <ul className="flex flex-col gap-1 w-full">
                        <NavLink to={'/admin-panel/users'} className={(e) => e.isActive ? " px-4 py-2 bg-zinc-500 w-full" : "w-full px-4 py-2 hover:bg-zinc-100"}>
                            Users
                        </NavLink>
                        <NavLink to={'/admin-panel/properties'} className={(e) => e.isActive ? " px-4 py-2 bg-zinc-500 w-full" : "w-full px-4 py-2 hover:bg-zinc-100"}>
                            Properties
                        </NavLink>
                        <NavLink to={'/admin-panel/bookings'} className={(e) => e.isActive ? " px-4 py-2 bg-zinc-500 w-full" : "w-full px-4 py-2 hover:bg-zinc-100"}>
                            Bookings
                        </NavLink>
                        <NavLink to={'/admin-panel/payments'} className={(e) => e.isActive ? " px-4 py-2 bg-zinc-500 w-full" : "w-full px-4 py-2 hover:bg-zinc-100"}>
                            Payments
                        </NavLink>

                    </ul>
                </nav>

            </aside>

            {/* Main Content */}
            <div className="w-full h-fit">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminPanel;