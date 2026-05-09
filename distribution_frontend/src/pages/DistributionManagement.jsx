import { useEffect, useState } from "react";

import axios from "axios";

import DashboardLayout
from "../layouts/DashboardLayout";

function DistributionManagement() {

    const token = localStorage.getItem("token");

    const [allocations, setAllocations]
        = useState([]);

    const [transactions, setTransactions]
        = useState([]);

    const [formData, setFormData] = useState({
        allocationId: "",
        distributedQuantity: ""
    });

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

    // Fetch transactions
    const fetchTransactions = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/api/distributions",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setTransactions(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchAllocations();

        fetchTransactions();

    }, []);

    // Handle input
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Create distribution
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:8080/api/distributions",
                formData,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            alert("Distribution Successful");

            fetchTransactions();

            fetchAllocations();

            setFormData({
                allocationId: "",
                distributedQuantity: ""
            });

        } catch (error) {

            alert(
                error.response?.data?.message
                || "Error"
            );
        }
    };

    // Status badge colors
    const getStatusColor = (status) => {

        if (status === "SUCCESS") {

            return "bg-green-100 text-green-700";
        }

        if (status === "FAILED") {

            return "bg-red-100 text-red-700";
        }

        return "bg-yellow-100 text-yellow-700";
    };

    return (

        <DashboardLayout>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Form */}
                <div className="bg-white p-6 rounded-2xl shadow">

                    <h2 className="text-2xl font-bold mb-4">
                        Distribute Ration
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >

                        {/* Allocation */}
                        <select
                            name="allocationId"
                            value={formData.allocationId}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                            required
                        >

                            <option value="">
                                Select Allocation
                            </option>

                            {
                                allocations.map(allocation => (

                                    <option
                                        key={allocation.id}
                                        value={allocation.id}
                                    >
                                        {allocation.rationCard?.cardNumber}
                                        {" - "}
                                        {allocation.rationItem?.itemName}
                                        {" ("}
                                        {allocation.allocatedQuantity}
                                        {")"}
                                    </option>
                                ))
                            }

                        </select>

                        {/* Quantity */}
                        <input
                            type="number"
                            name="distributedQuantity"
                            placeholder="Distributed Quantity"
                            value={formData.distributedQuantity}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                            required
                        />

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
                        >
                            Distribute
                        </button>

                    </form>
                </div>

                {/* Transactions Table */}
                <div className="bg-white p-6 rounded-2xl shadow overflow-auto">

                    <h2 className="text-2xl font-bold mb-4">
                        Distribution Transactions
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
                                transactions.map(transaction => (

                                    <tr
                                        key={transaction.id}
                                        className="border-b"
                                    >

                                        <td className="p-3">
                                            {
                                                transaction.allocation
                                                ?.rationCard
                                                ?.cardNumber
                                            }
                                        </td>

                                        <td className="p-3">
                                            {
                                                transaction.allocation
                                                ?.rationItem
                                                ?.itemName
                                            }
                                        </td>

                                        <td className="p-3">
                                            {
                                                transaction.distributedQuantity
                                            }
                                        </td>

                                        <td className="p-3">

                                            <span
                                                className={`px-3 py-1 rounded-full text-sm ${getStatusColor(transaction.transactionStatus)}`}
                                            >

                                                {
                                                    transaction.transactionStatus
                                                }

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

export default DistributionManagement;