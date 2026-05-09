import { useState } from "react";
import axios from "axios";

function LoginPage() {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        const response = await axios.post(
            "http://localhost:8080/api/auth/login",
            formData
        );

        // Save token
        localStorage.setItem(
            "token",
            response.data.token
        );

        // Save role
        localStorage.setItem(
            "role",
            response.data.role
        );

        // Redirect based on role
        const role = response.data.role;

        if (role === "ADMIN") {

            window.location.href = "/admin";

        } else if (role === "SHOP_MANAGER") {

            window.location.href = "/manager";

        } else {

            window.location.href = "/beneficiary";
        }

    } catch (error) {

        setMessage(
            error.response?.data?.message
            || "Login Failed"
        );
    }
};

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

                <h1 className="text-3xl font-bold text-center mb-6">
                    PDS Login
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <div>
                        <label className="block mb-1">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                            placeholder="Enter email"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
                    >
                        Login
                    </button>

                </form>

                {
                    message && (
                        <p className="mt-4 text-center text-red-500">
                            {message}
                        </p>
                    )
                }

            </div>
        </div>
    );
}

export default LoginPage;