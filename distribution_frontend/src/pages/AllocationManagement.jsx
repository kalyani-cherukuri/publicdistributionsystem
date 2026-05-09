import { useEffect, useState } from "react";

import axios from "axios";

import DashboardLayout
from "../layouts/DashboardLayout";

function AllocationManagement() {

    const token = localStorage.getItem("token");

    const [cards, setCards] = useState([]);

    const [items, setItems] = useState([]);

    const [allocations, setAllocations]
        = useState([]);

    const [formData, setFormData] = useState({
        rationCardId: "",
        rationItemId: ""
    });

    // Fetch cards
    const fetchCards = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/api/ration-cards",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setCards(response.data);

        } catch (error) {

            console.log(error);
        }
    };

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

    // Fetch allocations
    const fetchAllocations = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/api/allocations",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setAllocations(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchCards();

        fetchItems();

        fetchAllocations();

    }, []);

    // Handle input
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Create allocation
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:8080/api/allocations",
                formData,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            alert("Allocation Created");

            fetchAllocations();

            setFormData({
                rationCardId: "",
                rationItemId: ""
            });

        } catch (error) {

            alert(
                error.response?.data?.message
                || "Error"
            );
        }
    };

    // Status badge
    const getStatusColor = (status) => {

        if (status === "ALLOCATED") {

            return "bg-blue-100 text-blue-700";
        }

        if (status === "PARTIALLY_DISTRIBUTED") {

            return "bg-yellow-100 text-yellow-700";
        }

        if (status === "DISTRIBUTED") {

            return "bg-green-100 text-green-700";
        }

        return "bg-red-100 text-red-700";
    };

    return (

        <DashboardLayout>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Form */}
                <div className="bg-white p-6 rounded-2xl shadow">

                    <h2 className="text-2xl font-bold mb-4">
                        Create Allocation
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >

                        {/* Card */}
                        <select
                            name="rationCardId"
                            value={formData.rationCardId}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                            required
                        >

                            <option value="">
                                Select Ration Card
                            </option>

                            {
                                cards.map(card => (

                                    <option
                                        key={card.id}
                                        value={card.id}
                                    >
                                        {card.cardNumber}
                                    </option>
                                ))
                            }

                        </select>

                        {/* Item */}
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

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
                        >
                            Create Allocation
                        </button>

                    </form>
                </div>

                {/* Allocation Table */}
                <div className="bg-white p-6 rounded-2xl shadow overflow-auto">

                    <h2 className="text-2xl font-bold mb-4">
                        Allocations
                    </h2>

                    <table className="w-full border-collapse">

                        <thead>

                            <tr className="bg-gray-200">

                                <th className="p-3 text-left">
                                    Card
                                </th>

                                <th className="p-3 text-left">
                                    Item
                                </th>

                                <th className="p-3 text-left">
                                    Quantity
                                </th>

                                <th className="p-3 text-left">
                                    Status
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                allocations.map(allocation => (

                                    <tr
                                        key={allocation.id}
                                        className="border-b"
                                    >

                                        <td className="p-3">
                                            {allocation.rationCard?.cardNumber}
                                        </td>

                                        <td className="p-3">
                                            {allocation.rationItem?.itemName}
                                        </td>

                                        <td className="p-3">
                                            {allocation.allocatedQuantity}
                                        </td>

                                        <td className="p-3">

                                            <span
                                                className={`px-3 py-1 rounded-full text-sm ${getStatusColor(allocation.allocationStatus)}`}
                                            >

                                                {allocation.allocationStatus}

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

export default AllocationManagement;