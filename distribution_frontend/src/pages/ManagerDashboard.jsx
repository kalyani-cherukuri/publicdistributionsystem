import { useEffect, useState } from "react";

import axios from "axios";

import DashboardLayout
from "../layouts/DashboardLayout";

function ManagerDashboard() {

    const token = localStorage.getItem("token");

    const [stats, setStats] = useState({
        inventory: 0,
        transactions: 0,
        lowStock: 0
    });

    useEffect(() => {

        fetchData();

    }, []);

    const fetchData = async () => {

        try {

            const headers = {
                Authorization: `Bearer ${token}`
            };

            const [
                inventoryRes,
                transactionsRes
            ] = await Promise.all([

                axios.get(
                    "http://localhost:8080/api/inventory",
                    { headers }
                ),

                axios.get(
                    "http://localhost:8080/api/distributions",
                    { headers }
                )
            ]);

            const inventory =
                inventoryRes.data;

            const lowStock =
                inventory.filter(
                    item =>
                        item.status === "LOW_STOCK"
                ).length;

            setStats({
                inventory: inventory.length,
                transactions:
                    transactionsRes.data.length,
                lowStock
            });

        } catch (error) {

            console.log(error);
        }
    };

    const Card = ({ title, value }) => (

        <div className="bg-white p-6 rounded-2xl shadow">

            <h2 className="text-gray-500 text-lg">
                {title}
            </h2>

            <p className="text-4xl font-bold mt-2">
                {value}
            </p>

        </div>
    );

    return (

        <DashboardLayout>

            <h1 className="text-3xl font-bold mb-6">
                Shop Manager Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <Card
                    title="Inventory Items"
                    value={stats.inventory}
                />

                <Card
                    title="Transactions"
                    value={stats.transactions}
                />

                <Card
                    title="Low Stock Alerts"
                    value={stats.lowStock}
                />

            </div>

        </DashboardLayout>
    );
}

export default ManagerDashboard;