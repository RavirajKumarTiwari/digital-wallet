import React from "react";
import { Wallet, Bell, Settings, User } from "lucide-react";

export function Appbar() {
    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-auto mx-auto px-4 sm:px-6 lg:px-0">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Wallet className="h-8 w-8 text-blue-600" />
                        <span className="ml-2 text-xl font-bold text-gray-900">
                            PayWallet
                        </span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="p-2 rounded-full hover:bg-gray-100">
                            <Bell className="h-6 w-6 text-gray-600" />
                        </button>
                        <button className="p-2 rounded-full hover:bg-gray-100">
                            <Settings className="h-6 w-6 text-gray-600" />
                        </button>
                        <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100">
                            <User className="h-6 w-6 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
