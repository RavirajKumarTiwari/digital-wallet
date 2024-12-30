import { CreditCard, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export const Dashboard = () => {
    return (
        <div className="bg-gray-50 min-h-screen m-5">
            <Appbar />

                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <Balance value={"10,000"} />
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
