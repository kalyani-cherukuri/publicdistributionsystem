import { useEffect, useState } from "react";

import axios from "axios";

import DashboardLayout
from "../layouts/DashboardLayout";

function BeneficiaryDashboard() {

    const token = localStorage.getItem("token");

    const [card, setCard] = useState(null);

    const [allocations, setAllocations]
        = useState([]);

    const [transactions, setTransactions]
        = useState([]);

    useEffect(() => {

        fetchData();

    }, []);

    const fetchData = async () => {

        try {

            const headers = {
                Authorization: `Bearer ${token}`
            };

            const [
                cardRes,
                allocationRes,
                transactionRes
            ] = await Promise.all([

                axios.get(
                    "http://localhost:8080/api/beneficiary/my-card",
                    { headers }
                ),

                axios.get(
                    "http://localhost:8080/api/beneficiary/my-allocations",
                    { headers }
                ),

                axios.get(
                    "http://localhost:8080/api/beneficiary/my-distributions",
                    { headers }
                )
            ]);

            setCard(cardRes.data);

            setAllocations(allocationRes.data);

            setTransactions(transactionRes.data);

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <DashboardLayout>

            <h1 className="text-3xl font-bold mb-6">
                Beneficiary Dashboard
            </h1>

            {/* Ration Card */}
            {
                card && (

                    <div className="bg-white p-6 rounded-2xl shadow mb-6">

                        <h2 className="text-2xl font-bold mb-4">
                            My Ration Card
                        </h2>

                        <div className="space-y-2">

                            <p>
                                <strong>Card Number:</strong>
                                {" "}
                                {card.cardNumber}
                            </p>

                            <p>
                                <strong>Card Type:</strong>
                                {" "}
                                {card.cardType}
                            </p>

                            <p>
                                <strong>Status:</strong>
                                {" "}
                                {card.status}
                            </p>

                            <p>
                                <strong>Family Size:</strong>
                                {" "}
                                {card.familySize}
                            </p>

                        </div>
                    </div>
                )
            }

            {/* Allocations */}
            <div className="bg-white p-6 rounded-2xl shadow mb-6">

                <h2 className="text-2xl font-bold mb-4">
                    My Allocations
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
                                            allocation.allocationStatus
                                        }
                                    </td>

                                </tr>
                            ))
                        }

                    </tbody>

                </table>
            </div>

            {/* Transactions */}
            <div className="bg-white p-6 rounded-2xl shadow">

                <h2 className="text-2xl font-bold mb-4">
                    Distribution History
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
                                        {
                                            transaction.transactionStatus
                                        }
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

export default BeneficiaryDashboard;