import { useEffect, useState } from "react";

import axios from "axios";

import DashboardLayout
from "../layouts/DashboardLayout";

function UserManagement() {

    const [users, setUsers] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "BENEFICIARY"
    });

    const token = localStorage.getItem("token");

    // Fetch users
    const fetchUsers = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/api/users",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setUsers(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchUsers();

    }, []);

    // Handle form input
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Create user
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:8080/api/users",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("User Created");

            fetchUsers();

            setFormData({
                name: "",
                email: "",
                phoneNumber: "",
                password: "",
                role: "BENEFICIARY"
            });

        } catch (error) {

            alert(
                error.response?.data?.message
                || "Error"
            );
        }
    };

    return (

        <DashboardLayout>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Form */}
                <div className="bg-white p-6 rounded-2xl shadow">

                    <h2 className="text-2xl font-bold mb-4">
                        Create User
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >

                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                            required
                        />

                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                            required
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                            required
                        />

                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                        >

                            <option value="BENEFICIARY">
                                BENEFICIARY
                            </option>

                            <option value="SHOP_MANAGER">
                                SHOP_MANAGER
                            </option>

                            <option value="ADMIN">
                                ADMIN
                            </option>

                        </select>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
                        >
                            Create User
                        </button>

                    </form>
                </div>

                {/* Users Table */}
                <div className="bg-white p-6 rounded-2xl shadow overflow-auto">

                    <h2 className="text-2xl font-bold mb-4">
                        Users List
                    </h2>

                    <table className="w-full border-collapse">

                        <thead>

                            <tr className="bg-gray-200">

                                <th className="p-3 text-left">
                                    Name
                                </th>

                                <th className="p-3 text-left">
                                    Email
                                </th>

                                <th className="p-3 text-left">
                                    Role
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                users.map((user) => (

                                    <tr
                                        key={user.id}
                                        className="border-b"
                                    >

                                        <td className="p-3">
                                            {user.name}
                                        </td>

                                        <td className="p-3">
                                            {user.email}
                                        </td>

                                        <td className="p-3">

                                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">

                                                {user.role}

                                            </span>

                                        </td>

                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default UserManagement;