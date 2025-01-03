import { CreditCard, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useState, useEffect } from 'react';
import axios from 'axios';

export const Dashboard = () => {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                setBalance(response.data.balance);
            } catch (error) {
                console.error("Error details:", error.response || error);
            }
        };

        fetchBalance();
    }, []);
    return (
        <div className="bg-gray-50 min-h-screen m-5">
            <Appbar />

                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <Balance value={(Math.round(balance * 100) / 100).toFixed(2)} />
                            </div>
                            <CreditCard className="h-8 w-8" />
                        </div>
                        <div className="flex space-x-4">
                            <button className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition">
                                <ArrowUpRight className="h-5 w-5" />
                                <span>Send</span>
                            </button>
                            <button className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition">
                                <ArrowDownLeft className="h-5 w-5" />
                                <span>Request</span>
                            </button>
                        </div>
                    </div>

                <Users />
        </div>
    );
};
