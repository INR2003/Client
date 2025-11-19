import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Info as InfoIcon, Plus, Users, X } from "lucide-react";

import Withdraw from "./Withdraw";
import DepositModal from "./DepositModal";
import TradesModal from "./TradesModal";
import SettingsModal from "./SettingsModal";

// ✔ InfoBox Component
function InfoBox({ label, value }) {
  return (
    <div className="border border-yellow-400 p-3 rounded-md bg-[#1a1a1a]">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

export default function MamDashboard() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [mamAccounts, setMamAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const [activeTab, setActiveTab] = useState("cheesepay");
  const [selectedDepositAccount, setSelectedDepositAccount] = useState(null);

  const [form, setForm] = useState({
    account_name: "",
    profit_percentage: "",
    risk_level: "Medium",
    leverage: "500x",
    payout_frequency: "Weekly",
    master_password: "",
    investor_password: "",
  });

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(name + "=")) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        }
      }
    }
    return cookieValue;
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    if (savedToken) setAccessToken(savedToken);

    const savedAccounts = localStorage.getItem("mamAccounts");
    if (savedAccounts) setMamAccounts(JSON.parse(savedAccounts));
  }, []);

  const [accessToken, setAccessToken] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  const csrf = getCookie("csrftoken");

  // FIX 1: Read the correct token
  const token = localStorage.getItem("accessToken");

  if (!token) {
    alert("You must log in again — token missing.");
    return;
  }

  try {
    const response = await fetch("/mam-accounts/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        // FIX 2: CSRF required by Django
        "X-CSRFToken": csrf,

        // FIX 3: Correct JWT header for IsAuthenticated
        Authorization: `Bearer ${token}`,
      },

      // FIX 4: Required so Django can read session + CSRF cookies
      credentials: "include",

      body: JSON.stringify(form),
    });

    // Backend returns 401 → wrong token OR token not sent
    if (!response.ok) {
      const err = await response.json();
      alert("Error: " + JSON.stringify(err));
      return;
    }

    const data = await response.json();

    alert("MAM Account Created Successfully!");

    // Convert backend snake_case → camelCase for React table
    const formatted = {
      id: data.mam_account.id,
      accountName: data.mam_account.account_name,
      profitPercentage: data.mam_account.profit_percentage,
      leverage: data.mam_account.leverage,
      enabled: data.mam_account.is_enabled,
    };

    // Update table
    setMamAccounts((prev) => [...prev, formatted]);

    // Close modal
    setShowModal(false);
  } catch (error) {
    console.error("Create MAM error:", error);
    alert("Something went wrong. Check console.");
  }
};


  return (
    <div className="w-full flex flex-col items-center text-white p-6">

      <h2 className="text-2xl font-bold mb-2 text-center">
        Multi-Account Manager
      </h2>

      <div className="flex w-full justify-end gap-1 px-10 text-sm mb-4">
        <InfoIcon className="w-4 h-4 text-blue-400" />
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="text-blue-400 hover:underline"
        >
          Know what it is?
        </button>
      </div>

      {showInfo && (
        <div className="mb-6 bg-gray-900/70 p-6 rounded-md text-gray-300 max-w-3xl w-[90%] text-left">
          <h3 className="text-lg font-semibold mb-2 text-yellow-400">
            Understanding MAM Accounts
          </h3>

          <p className="text-sm">Auto-copied trades system explained...</p>
        </div>
      )}

      {/* ACTION BUTTONS */}
      <div className="flex flex-wrap justify-center gap-6 mb-6 max-w-5xl">
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#FFD700] text-black font-semibold py-3 px-5 rounded-md hover:bg-yellow-400 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Create New MAM Manager Account
        </button>

        <button
          onClick={() => navigate("/MAMInvestments")}
          className="bg-[#FFD700] text-black font-semibold py-3 px-14 rounded-md hover:bg-yellow-400 flex items-center gap-2"
        >
          <Users className="w-4 h-4" /> Invest in a MAM Account
        </button>
      </div>

      {/* ACCOUNTS TABLE */}
      {!selectedAccount && mamAccounts.length > 0 && (
        <div className="overflow-x-auto w-[90%] max-w-6xl mb-6">
          <table className="min-w-full text-left">
            <thead className="bg-gray-800 text-yellow-400">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Account Name</th>
                <th className="px-4 py-2">Profit Sharing</th>
                <th className="px-4 py-2">Leverage</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {mamAccounts.map((acc) => (
                <tr
                  key={acc.id}
                  className="bg-[#1a1a1a] hover:bg-gray-700 transition"
                >
                  <td className="px-4 py-2">{acc.id}</td>
                  <td className="px-4 py-2">{acc.accountName}</td>
                  <td className="px-4 py-2">{acc.profitPercentage}%</td>
                  <td className="px-4 py-2">{acc.leverage}</td>
                  <td
                    className={`px-4 py-2 font-semibold ${
                      acc.enabled ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {acc.enabled ? "Enabled" : "Disabled"}
                  </td>

                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                      onClick={() => setSelectedAccount(acc)}
                    >
                      View
                    </button>

                    {/* ⭐ FIXED: OPEN DEPOSIT MODAL */}
                    <button
                      onClick={() => {
                        setShowDepositModal(true);
                        setActiveTab("cheesepay");
                        setSelectedDepositAccount(acc);
                      }}
                      className="bg-gold text-black px-3 py-1 rounded hover:bg-white transition"
                    >
                      Deposit
                    </button>

                    {/* ⭐ FIXED: OPEN WITHDRAW MODAL */}
                    <button
                      onClick={() => {
                        setSelectedAccount(acc);
                        setShowWithdrawModal(true);
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400 transition"
                    >
                      Withdraw
                    </button>

                    <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-white transition">
                Investors
              </button>

              <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-white transition">
                Settings
              </button>

              <button
                onClick={() => handleToggleStatus(selectedAccount.id)}
                className={`px-3 py-1 rounded text-sm ${
                  selectedAccount.enabled
                    ? "bg-yellow-500 hover:bg-yellow-400"
                    : "bg-red-500 hover:bg-red-400"
                }`}
              >
                {selectedAccount.enabled ? "Disable" : "Enable"}
              </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* VIEW ACCOUNT */}
      {selectedAccount && (
        <div className="mt-6 w-[90%] max-w-5xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-yellow-400">
              Account Details
            </h3>

            <button
              onClick={() => setSelectedAccount(null)}
              className="text-yellow-400 border border-yellow-400 px-4 py-1 rounded hover:bg-yellow-400 hover:text-black transition"
            >
              ← Back
            </button>
          </div>

          <div className="bg-[#111] border border-yellow-400 rounded-lg p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <InfoBox label="Account ID" value={selectedAccount.id} />
              <InfoBox label="Account Name" value={selectedAccount.accountName} />
              <InfoBox label="Profit Sharing" value={selectedAccount.profitPercentage + "%"} />
              <InfoBox label="Leverage" value={selectedAccount.leverage} />
              <InfoBox label="Status" value={selectedAccount.enabled ? "Enabled" : "Disabled"} />
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap justify-center gap-4 pt-4">

              {/* ⭐ VIEW PAGE DEPOSIT */}
              <button
                className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-white transition"
                onClick={() => setShowDepositModal(true)}
              >
                Deposit
              </button>

              {/* ⭐ VIEW PAGE WITHDRAW */}
              <button
                className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-white transition"
                onClick={() => setShowWithdrawModal(true)}
              >
                Withdraw
              </button>

              <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-white transition">
                Investors
              </button>

              <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-white transition">
                Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ⭐ DEPOSIT MODAL */}
      {showDepositModal && (
        <DepositModal
          account={selectedDepositAccount}
          onClose={() => setShowDepositModal(false)}
        />
      )}

      {/* ⭐ WITHDRAW MODAL */}
      {showWithdrawModal && (
        <Withdraw
          account={selectedAccount}
          onClose={() => setShowWithdrawModal(false)}
        />
      )}

      {/* CREATE MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-yellow-400">
                Create New MAM Account
              </h2>
              <X
                className="w-6 h-6 cursor-pointer text-gray-400 hover:text-yellow-400"
                onClick={() => setShowModal(false)}
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Account Name</label>
                <input
                  type="text"
                  id="account_name"
                  value={form.account_name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 rounded bg-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Profit Sharing (%)</label>
                <input
                  type="number"
                  id="profit_percentage"
                  value={form.profit_percentage}
                  onChange={handleChange}
                  required
                  className="w-full p-2 rounded bg-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Risk Level</label>
                <select
                  id="risk_level"
                  value={form.risk_level}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1">Leverage</label>
                <select
                  id="leverage"
                  value={form.leverage}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800"
                >
                  <option>50x</option>
                  <option>100x</option>
                  <option>200x</option>
                  <option>500x</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1">Payout Frequency</label>
                <select
                  id="payout_frequency"
                  value={form.payout_frequency}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800"
                >
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Quarterly</option>
                  <option>Half-Yearly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1">Master Password</label>
                <input
                  type="password"
                  id="master_password"
                  value={form.master_password}
                  onChange={handleChange}
                  required
                  className="w-full p-2 rounded bg-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Investor Password</label>
                <input
                  type="password"
                  id="investor_password"
                  value={form.investor_password}
                  onChange={handleChange}
                  required
                  className="w-full p-2 rounded bg-gray-800"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-yellow-500 px-4 py-2 rounded text-black font-semibold"
                >
                  Create Account
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}
