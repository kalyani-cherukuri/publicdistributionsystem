import { useEffect, useState } from "react";

import axios from "axios";

import DashboardLayout
from "../layouts/DashboardLayout";

function AdminDashboard() {

    const token = localStorage.getItem("token");

    const [stats, setStats] = useState({
        users: 0,
        cards: 0,
        items: 0,
        allocations: 0
    });

    useEffect(() => {

        fetchDashboardData();

    }, []);

    const fetchDashboardData = async () => {

        try {

            const headers = {
                Authorization: `Bearer ${token}`
            };

            const [
                usersRes,
                cardsRes,
                itemsRes,
                allocationsRes
            ] = await Promise.all([

                axios.get(
                    "http://localhost:8080/api/users",
                    { headers }
                ),

                axios.get(
                    "http://localhost:8080/api/ration-cards",
                    { headers }
                ),

                axios.get(
                    "http://localhost:8080/api/ration-items",
                    { headers }
                ),

                axios.get(
                    "http://localhost:8080/api/allocations",
                    { headers }
                )
            ]);

            setStats({
                users: usersRes.data.length,
                cards: cardsRes.data.length,
                items: itemsRes.data.length,
                allocations:
                    allocationsRes.data.length
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
                Admin Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <Card
                    title="Total Users"
                    value={stats.users}
                />

                <Card
                    title="Ration Cards"
                    value={stats.cards}
                />

                <Card
                    title="Ration Items"
                    value={stats.items}
                />

                <Card
                    title="Allocations"
                    value={stats.allocations}
                />

            </div>

        </DashboardLayout>
    );
}

export default AdminDashboard;