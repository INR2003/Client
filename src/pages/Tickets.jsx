import React, { useState, useEffect } from "react";
import { Search, Filter, X, Eye } from "lucide-react";

const Tickets = () => {
  const [activePage, setActivePage] = useState("create");
  const [theme, setTheme] = useState("light");
  const [userId, setUserId] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    dateRange: "",
  });

  useEffect(() => {
    const uid =
      localStorage.getItem("user_id") ||
      localStorage.getItem("username") ||
      "";
    setUserId(uid);
  }, []);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === "THEME_MODE") {
        setTheme(event.data.theme);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const isDark = theme === "dark";

  const pageClasses = (page) =>
    `px-4 py-2 rounded-md font-medium cursor-pointer ${
      activePage === page
        ? "bg-yellow-400 text-gray-900"
        : "bg-gray-200 text-gray-700 hover:bg-yellow-200"
    }`;

  const applyFilters = () => {
    console.log("Applied Filters:", filters);
    setShowFilters(false);
  };

  return (
    <div
      className={`min-h-screen p-6 transition-all ${
        isDark
          ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <div
        className={`max-w-5xl mx-auto p-6 rounded-xl shadow-lg transition-all ${
          isDark
            ? "bg-gray-900 border border-gray-700"
            : "bg-white border border-gray-300"
        }`}
      >
        {/* Header */}
        <header className="text-center mb-6">
          <h2 className="text-2xl font-bold text-yellow-500">
            Support Tickets
          </h2>
        </header>

        {/* Page Navigation */}
        {/* Page Navigation */}
<nav className="flex justify-center gap-4 mb-6 flex-wrap">
  <button
    onClick={() => setActivePage("create")}
    className={`px-6 py-2 rounded-md font-semibold transition-all ${
      activePage === "create"
        ? "bg-gray-300 text-gray-900 shadow-inner cursor-default"
        : "bg-yellow-400 hover:bg-yellow-500 text-black"
    }`}
  >
    Create Ticket
  </button>

  <button
    onClick={() => setActivePage("view")}
    className={`px-6 py-2 rounded-md font-semibold transition-all flex items-center gap-2 ${
      activePage === "view"
        ? "bg-gray-300 text-gray-900 shadow-inner cursor-default"
        : "bg-yellow-400 hover:bg-yellow-500 text-black"
    }`}
  >
    <Eye size={18} />
    View Tickets
  </button>
</nav>


        {/* CREATE TICKET PAGE */}
        {activePage === "create" && (
          <div
            className={`p-6 rounded-lg shadow ${
              isDark
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-200"
            }`}
          >
            <h2 className="text-xl font-semibold text-center mb-4">
              Raise a New Ticket
            </h2>

            <form className="space-y-4 relative pb-20">
              <div>
  <label className="font-semibold">User Id</label>
  <div
    className={`font-bold mt-1 ${
      isDark ? "text-gray-100" : "text-gray-800"
    }`}
  >
    {userId}
  </div>
</div>

              <div>
                <label className="block font-semibold">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter ticket subject"
                  required
                  className="w-full p-2 rounded-md border border-gray-400"
                />
              </div>

              <div>
                <label className="block font-semibold">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Describe the issue in detail"
                  required
                  className="w-full p-2 rounded-md border border-gray-400 h-28"
                ></textarea>
              </div>

              <div>
                <label className="block font-semibold">
                  Supporting Documents (Optional)
                </label>
                <div
  className={`border-2 border-dashed rounded-lg text-center py-6 cursor-pointer transition-all duration-200 ${
    isDark
      ? "border-gray-600 hover:border-yellow-400 hover:bg-gray-700"
      : "border-gray-400 hover:border-yellow-500 hover:bg-yellow-50"
  }`}
  onClick={() => document.getElementById("fileInput").click()}
>
  <p className="text-lg font-medium">📎 Click to attach file</p>
  <p className="text-sm text-gray-500">
    Accepted: JPG, JPEG, PDF (Max: 1MB)
  </p>
  <input type="file" id="fileInput" hidden />
</div>

              </div>

              {/* Centered Submit Button */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                <div className="flex justify-center mt-6">
  <button
    type="submit"
    className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-2 rounded-md shadow-md transition duration-200"
  >
    Submit Ticket
  </button>
</div>

              </div>
            </form>
          </div>
        )}

        {/* VIEW TICKETS PAGE */}
        {activePage === "view" && (
          <div
            className={`p-6 rounded-lg shadow ${
              isDark
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-200"
            }`}
          >
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <h2 className="text-xl font-semibold">Your Tickets</h2>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Search tickets..."
                    className="w-full p-2 pl-10 border rounded-md border-gray-400"
                  />
                  <Search
                    size={18}
                    className="absolute left-3 top-2.5 text-gray-500"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(true)}
                  className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-md transition"
                >
                  <Filter size={18} />
                  Filters
                </button>
              </div>
            </div>

            {/* Ticket Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-400 text-sm sm:text-base">
                <thead>
                  <tr className={isDark ? "bg-gray-700" : "bg-gray-200"}>
                    <th className="p-2 border border-gray-400">Created Date</th>
                    <th className="p-2 border border-gray-400">Ticket ID</th>
                    <th className="p-2 border border-gray-400">User Id</th>
                    <th className="p-2 border border-gray-400">Username</th>
                    <th className="p-2 border border-gray-400">Subject</th>
                    <th className="p-2 border border-gray-400">Status</th>
                    <th className="p-2 border border-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No tickets found.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Filter Card */}
      {showFilters && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(0px)",
          }}
        >
          <div
            className={`max-w-md w-full p-6 rounded-xl shadow-2xl ${
              isDark
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-300"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Filter Tickets</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-600 hover:text-red-500"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Status</label>
                <select
                  className="w-full border rounded-md p-2"
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({ ...filters, status: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option>Open</option>
                  <option>Pending</option>
                  <option>Closed</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Priority</label>
                <select
                  className="w-full border rounded-md p-2"
                  value={filters.priority}
                  onChange={(e) =>
                    setFilters({ ...filters, priority: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Date Range</label>
                <select
                  className="w-full border rounded-md p-2"
                  value={filters.dateRange}
                  onChange={(e) =>
                    setFilters({ ...filters, dateRange: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>Last 3 Months</option>
                </select>
              </div>

              <button
                onClick={applyFilters}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-md mt-4"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tickets;
