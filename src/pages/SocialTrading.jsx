import React from "react";
import { X, Info } from "lucide-react";

const MAMManager = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="bg-[#111] border border-gray-800 rounded-lg shadow-lg max-w-3xl w-full p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-center w-full text-yellow-400">
            Multi-Account Manager
          </h2>
          <button className="flex items-center gap-1 text-pink-500 hover:text-pink-400 absolute right-8 top-8 text-sm">
            <X className="w-4 h-4" />
            Hide MAM Info
          </button>
        </div>

        {/* Info Section */}
        <div className="border border-yellow-400/40 rounded-md p-5 mb-6 bg-gray-900/60">
          <h3 className="text-lg font-semibold mb-3 text-white">
            Understanding MAM Accounts
          </h3>

          <p className="text-sm mb-2">
            <strong>Manager Trades, Auto-Copied:</strong> Trades by the manager
            are automatically replicated in your investment account in real
            time.
          </p>

          <p className="text-sm mb-4">
            <strong>Proportional Lot Sizing:</strong> Lot size adjusts based on
            your account balance relative to the manager's.
          </p>

          <ul className="list-disc list-inside text-sm space-y-1 ml-3">
            <li>
              <strong>Example:</strong> Manager trades 1 lot for $10,000.
            </li>
            <li>$20,000 Investor: Gets 2 lots.</li>
            <li>$5,000 Investor: Gets 0.5 lots.</li>
          </ul>

          <div className="flex items-start gap-2 mt-4 text-green-400 text-sm">
            <span>✅</span>
            <p className="text-white">
              <span className="text-green-400 font-semibold">Important Note:</span>{" "}
              All trades will be copied with a minimum size of 0.01 lot,
              ensuring you participate in every trading opportunity.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button className="bg-yellow-500 text-black font-semibold py-3 px-4 rounded-md w-full sm:w-1/2 hover:bg-yellow-400 transition-all duration-200">
            + Create New MAM Manager Account
          </button>
          <button className="bg-yellow-500 text-black font-semibold py-3 px-4 rounded-md w-full sm:w-1/2 hover:bg-yellow-400 transition-all duration-200">
            + Invest in a MAM Account
          </button>
        </div>

        {/* No Accounts Section */}
        <div className="text-center border-t border-gray-700 pt-3">
          <p className="font-semibold text-[16px] mb-1">
            No MAM Accounts Found
          </p>
          <p className="text-sm text-gray-400">
            Click the{" "}
            <span className="text-yellow-400 font-semibold">
              "Create New MAM Account"
            </span>{" "}
            button to create your first MAM account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MAMManager;
