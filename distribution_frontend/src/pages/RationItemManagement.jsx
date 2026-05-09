import { useEffect, useState } from "react";

import axios from "axios";

import DashboardLayout
from "../layouts/DashboardLayout";

function RationItemManagement() {

    const token = localStorage.getItem("token");

    const [items, setItems] = useState([]);

    const [formData, setFormData] = useState({
        itemName: "",
        unitType: "KG",
        pricePerUnit: ""
    });

    // Fetch items
    const fetchItems = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/api/ration-items",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setItems(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchItems();

    }, []);

    // Handle input
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Add item
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:8080/api/ration-items",
                formData,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            alert("Item Added");

            fetchItems();

            setFormData({
                itemName: "",
                unitType: "KG",
                pricePerUnit: ""
            });

        } catch (error) {

            alert(
                error.response?.data?.message
                || "Error"
            );
        }
    };

    // Update price
    const updatePrice = async (id) => {

        const newPrice =
            prompt("Enter new price");

        if (!newPrice) return;

        try {

            await axios.put(
                `http://localhost:8080/api/ration-items/${id}`,
                {
                    pricePerUnit: newPrice
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            alert("Price Updated");

            fetchItems();

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <DashboardLayout>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Form */}
                <div className="bg-white p-6 rounded-2xl shadow">

                    <h2 className="text-2xl font-bold mb-4">
                        Add Ration Item
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >

                        <input
                            type="text"
                            name="itemName"
                            placeholder="Item Name"
                            value={formData.itemName}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                            required
                        />

                        <select
                            name="unitType"
                            value={formData.unitType}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                        >

                            <option value="KG">
                                KG
                            </option>

                            <option value="LITRE">
                                LITRE
                            </option>

                            <option value="PACK">
                                PACK
                            </option>

                        </select>

                        <input
                            type="number"
                            name="pricePerUnit"
                            placeholder="Price Per Unit"
                            value={formData.pricePerUnit}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                            required
                        />

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
                        >
                            Add Item
                        </button>

                    </form>
                </div>

                {/* Table */}
                <div className="bg-white p-6 rounded-2xl shadow overflow-auto">

                    <h2 className="text-2xl font-bold mb-4">
                        Ration Items
                    </h2>

                    <table className="w-full border-collapse">

                        <thead>

                            <tr className="bg-gray-200">

                                <th className="p-3 text-left">
                                    Item
                                </th>

                                <th className="p-3 text-left">
                                    Unit
                                </th>

                                <th className="p-3 text-left">
                                    Price
                                </th>

                                <th className="p-3 text-left">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                items.map(item => (

                                    <tr
                                        key={item.id}
                                        className="border-b"
                                    >

                                        <td className="p-3">
                                            {item.itemName}
                                        </td>

                                        <td className="p-3">
                                            {item.unitType}
                                        </td>

                                        <td className="p-3">
                                            ₹ {item.pricePerUnit}
                                        </td>

                                        <td className="p-3">

                                            <button
                                                onClick={() =>
                                                    updatePrice(item.id)
                                                }
                                                className="bg-yellow-400 px-3 py-1 rounded-lg"
                                            >
                                                Update Price
                                            </button>

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

export default RationItemManagement;