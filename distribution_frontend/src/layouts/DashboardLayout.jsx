import { Link } from "react-router-dom";

function DashboardLayout({ children }) {

    const role = localStorage.getItem("role");

    const handleLogout = () => {

        localStorage.clear();

        window.location.href = "/";
    };

    return (

        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar */}
            <div className="w-64 bg-blue-900 text-white p-5">

                <h1 className="text-2xl font-bold mb-8">
                    PDS System
                </h1>

                <nav className="space-y-4">

                    {
                        role === "ADMIN" && (
                            <>
                                <Link
                                    to="/admin"
                                    className="block hover:text-yellow-300"
                                >
                                    Dashboard
                                </Link>

                                <Link
                                    to="/users"
                                    className="block hover:text-yellow-300"
                                >
                                    Users
                                </Link>

                                <Link
                                    to="/ration-cards"
                                    className="block hover:text-yellow-300"
                                >
                                    Ration Cards
                                </Link>

                                <Link
                                    to="/ration-items"
                                    className="block hover:text-yellow-300"
                                >
                                    Ration Items
                                </Link>

                                <Link
                                    to="/allocations"
                                    className="block hover:text-yellow-300"
                                >
                                    Allocations
                                </Link>
                            </>
                        )
                    }

                    {
                        role === "SHOP_MANAGER" && (
                            <>
                                <Link
                                    to="/manager"
                                    className="block hover:text-yellow-300"
                                >
                                    Dashboard
                                </Link>

                                <Link
                                    to="/inventory"
                                    className="block hover:text-yellow-300"
                                >
                                    Inventory
                                </Link>

                                <Link
                                    to="/distributions"
                                    className="block hover:text-yellow-300"
                                >
                                    Distributions
                                </Link>
                            </>
                        )
                    }

                    {
                        role === "BENEFICIARY" && (
                            <>
                                <Link
                                    to="/beneficiary"
                                    className="block hover:text-yellow-300"
                                >
                                    Dashboard
                                </Link>

                                <Link
                                    to="/my-card"
                                    className="block hover:text-yellow-300"
                                >
                                    My Card
                                </Link>

                                <Link
                                    to="/my-allocations"
                                    className="block hover:text-yellow-300"
                                >
                                    My Allocations
                                </Link>
                            </>
                        )
                    }

                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1">

                {/* Navbar */}
                <div className="bg-white shadow p-4 flex justify-between items-center">

                    <h2 className="text-xl font-semibold">
                        Dashboard
                    </h2>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>

                {/* Page Content */}
                <div className="p-6">

                    {children}

                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;