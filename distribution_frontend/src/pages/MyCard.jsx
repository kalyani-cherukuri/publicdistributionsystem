import { useEffect, useState } from "react";

import axios from "axios";

import DashboardLayout
from "../layouts/DashboardLayout";

function MyCard() {

    const token = localStorage.getItem("token");

    const [card, setCard] = useState(null);

    useEffect(() => {

        fetchCard();

    }, []);

    const fetchCard = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/api/beneficiary/my-card",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setCard(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <DashboardLayout>

            <div className="bg-white p-8 rounded-2xl shadow max-w-2xl">

                <h1 className="text-3xl font-bold mb-6">
                    My Ration Card
                </h1>

                {
                    card && (

                        <div className="space-y-4">

                            <div>

                                <p className="text-gray-500">
                                    Card Number
                                </p>

                                <h2 className="text-xl font-semibold">
                                    {card.cardNumber}
                                </h2>

                            </div>

                            <div>

                                <p className="text-gray-500">
                                    Card Type
                                </p>

                                <h2 className="text-xl font-semibold">
                                    {card.cardType}
                                </h2>

                            </div>

                            <div>

                                <p className="text-gray-500">
                                    Family Size
                                </p>

                                <h2 className="text-xl font-semibold">
                                    {card.familySize}
                                </h2>

                            </div>

                            <div>

                                <p className="text-gray-500">
                                    Status
                                </p>

                                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">

                                    {card.status}

                                </span>

                            </div>

                        </div>
                    )
                }

            </div>

        </DashboardLayout>
    );
}

export default MyCard;