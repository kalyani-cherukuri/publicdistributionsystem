import { useEffect, useState } from "react";

import axios from "axios";

import DashboardLayout
from "../layouts/DashboardLayout";

function InventoryManagement() {

    const token = localStorage.getItem("token");

    const [inventory, setInventory]
        = useState([]);

    const [items, setItems]
        = useState([]);

    const [managers, setManagers]
        = useState([]);

    const [formData, setFormData] = useState({
        rationItemId: "",
        quantityAvailable: "",
        managedById: ""
    });

    // Fetch inventory
    const fetchInventory = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/api/inventory",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setInventory(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    // Fetch ration items
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

    // Fetch shop managers
    const fetchManagers = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/api/users",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            const filtered =
                response.data.filter(
                    user =>
                        user.role === "SHOP_MANAGER"
                );

            setManagers(filtered);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchInventory();

        fetchItems();

        fetchManagers();

    }, []);

    // Handle input
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Save inventory
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:8080/api/inventory",
                formData,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            alert("Inventory Updated");

            fetchInventory();

            setFormData({
                rationItemId: "",
                quantityAvailable: "",
                managedById: ""
            });

        } catch (error) {

            alert(
                error.response?.data?.message
                || "Error"
            );
        }
    };

    // Badge colors
    const getStatusColor = (status) => {

        if (status === "AVAILABLE") {

            return "bg-green-100 text-green-700";
        }

        if (status === "LOW_STOCK") {

            return "bg-yellow-100 text-yellow-700";
        }

        return "bg-red-100 text-red-700";
    };

    return (

        <DashboardLayout>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Form */}
                <div className="bg-white p-6 rounded-2xl shadow">

                    <h2 className="text-2xl font-bold mb-4">
                        Update Inventory
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >

                        {/* Ration Item */}
                        <select
                            name="rationItemId"
                            value={formData.rationItemId}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                            required
                        >

                            <option value="">
                                Select Item
                            </option>

                            {
                                items.map(item => (

                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.itemName}
                                    </option>
                                ))
                            }

                        </select>

                        {/* Quantity */}
                        <input
                            type="number"
                            name="quantityAvailable"
                            placeholder="Quantity"
                            value={formData.quantityAvailable}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                            required
                        />

                        {/* Manager */}
                        <select
                            name="managedById"
                            value={formData.managedById}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                            required
                        >

                            <option value="">
                                Select Manager
                            </option>

                            {
                                managers.map(manager => (

                                    <option
                                        key={manager.id}
                                        value={manager.id}
                                    >
                                        {manager.name}
                                    </option>
                                ))
                            }

                        </select>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
                        >
                            Save Inventory
                        </button>

                    </form>
                </div>

                {/* Inventory Table */}
                <div className="bg-white p-6 rounded-2xl shadow overflow-auto">

                    <h2 className="text-2xl font-bold mb-4">
                        Inventory List
                    </h2>

                    <table className="w-full border-collapse">

                        <thead>

                            <tr className="bg-gray-200">

                                <th className="p-3 text-left">
                                    Item
                                </th>

                                <th className="p-3 text-left">
                                    Quantity
                                </th>

                                <th className="p-3 text-left">
                                    Manager
                                </th>

                                <th className="p-3 text-left">
                                    Status
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                inventory.map(inv => (

                                    <tr
                                        key={inv.id}
                                        className="border-b"
                                    >

                                        <td className="p-3">
                                            {inv.rationItem?.itemName}
                                        </td>

                                        <td className="p-3">
                                            {inv.quantityAvailable}
                                        </td>

                                        <td className="p-3">
                                            {inv.managedBy?.name}
                                        </td>

                                        <td className="p-3">

                                            <span
                                                className={`px-3 py-1 rounded-full text-sm ${getStatusColor(inv.status)}`}
                                            >

                                                {inv.status}

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

export default InventoryManagement;