import { useEffect, useState } from "react";

import axios from "axios";

import DashboardLayout
from "../layouts/DashboardLayout";

function MyAllocations() {

    const token = localStorage.getItem("token");

    const [allocations, setAllocations]
        = useState([]);

    useEffect(() => {

        fetchAllocations();

    }, []);

    const fetchAllocations = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/api/beneficiary/my-allocations",
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

    const getStatusColor = (status) => {

        if (status === "ALLOCATED") {

            return "bg-blue-100 text-blue-700";
        }

        if (status === "PARTIALLY_DISTRIBUTED") {

            return "bg-yellow-100 text-yellow-700";
        }

        return "bg-green-100 text-green-700";
    };

    return (

        <DashboardLayout>

            <div className="bg-white p-6 rounded-2xl shadow">

                <h1 className="text-3xl font-bold mb-6">
                    My Allocations
                </h1>

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
                                Month
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
                                        {
                                            allocation.rationItem
                                            ?.itemName
                                        }
                                    </td>

                                    <td className="p-3">
                                        {
                                            allocation.allocatedQuantity
                                        }
                                    </td>

                                    <td className="p-3">
                                        {
                                            allocation.allocationMonth
                                        }
                                        /
                                        {
                                            allocation.allocationYear
                                        }
                                    </td>

                                    <td className="p-3">

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${getStatusColor(allocation.allocationStatus)}`}
                                        >

                                            {
                                                allocation.allocationStatus
                                            }

                                        </span>

                                    </td>

                                </tr>
                            ))
                        }

                    </tbody>

                </table>

            </div>

        </DashboardLayout>
    );
}

export default MyAllocations;