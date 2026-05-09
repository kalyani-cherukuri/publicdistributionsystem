import { useEffect, useState } from "react";

import axios from "axios";

import DashboardLayout
from "../layouts/DashboardLayout";

function RationCardManagement() {

    const token = localStorage.getItem("token");

    const [beneficiaries, setBeneficiaries]
        = useState([]);

    const [cards, setCards]
        = useState([]);

    const [formData, setFormData] = useState({
        beneficiaryId: "",
        familySize: "",
        cardType: "APL"
    });

    // Fetch beneficiaries
    const fetchBeneficiaries = async () => {

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
                        user.role === "BENEFICIARY"
                );

            setBeneficiaries(filtered);

        } catch (error) {

            console.log(error);
        }
    };

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

    useEffect(() => {

        fetchBeneficiaries();

        fetchCards();

    }, []);

    // Handle input
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Create ration card
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:8080/api/ration-cards",
                formData,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            alert("Ration Card Created");

            fetchCards();

            setFormData({
                beneficiaryId: "",
                familySize: "",
                cardType: "APL"
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
                        Issue Ration Card
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >

                        {/* Beneficiary */}
                        <select
                            name="beneficiaryId"
                            value={formData.beneficiaryId}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                            required
                        >

                            <option value="">
                                Select Beneficiary
                            </option>

                            {
                                beneficiaries.map(user => (

                                    <option
                                        key={user.id}
                                        value={user.id}
                                    >
                                        {user.name}
                                    </option>
                                ))
                            }

                        </select>

                        {/* Family Size */}
                        <input
                            type="number"
                            name="familySize"
                            placeholder="Family Size"
                            value={formData.familySize}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                            required
                        />

                        {/* Card Type */}
                        <select
                            name="cardType"
                            value={formData.cardType}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                        >

                            <option value="APL">
                                APL
                            </option>

                            <option value="BPL">
                                BPL
                            </option>

                            <option value="AAY">
                                AAY
                            </option>

                        </select>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
                        >
                            Create Card
                        </button>

                    </form>
                </div>

                {/* Table */}
                <div className="bg-white p-6 rounded-2xl shadow overflow-auto">

                    <h2 className="text-2xl font-bold mb-4">
                        Ration Cards
                    </h2>

                    <table className="w-full border-collapse">

                        <thead>

                            <tr className="bg-gray-200">

                                <th className="p-3 text-left">
                                    Card No
                                </th>

                                <th className="p-3 text-left">
                                    Beneficiary
                                </th>

                                <th className="p-3 text-left">
                                    Type
                                </th>

                                <th className="p-3 text-left">
                                    Status
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                cards.map(card => (

                                    <tr
                                        key={card.id}
                                        className="border-b"
                                    >

                                        <td className="p-3">
                                            {card.cardNumber}
                                        </td>

                                        <td className="p-3">
                                            {card.beneficiary?.name}
                                        </td>

                                        <td className="p-3">
                                            {card.cardType}
                                        </td>

                                        <td className="p-3">

                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                                                {card.status}

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

export default RationCardManagement;