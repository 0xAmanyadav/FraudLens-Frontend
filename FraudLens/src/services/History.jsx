import React, { useState, useEffect } from "react";
import {
  History,
  Link as LinkIcon,
  MessageSquare,
  QrCode,
  ShieldAlert,
  ShieldCheck,
  Clock,
  Trash2,
  Loader2,
  AlertCircle,
  ImageIcon,
  Eye,
  X,
  CheckCircle2,
} from "lucide-react";
import {
  fetchScanHistory,
  deleteScanHistoryItem,
  fetchScanHistoryById,
} from "../services/api";

export default function HistoryPage() {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Custom Alert / Notification State
  const [alertMessage, setAlertMessage] = useState(null);

  // Selected item for Detailed View Modal
  const [selectedItem, setSelectedItem] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // Delete Confirmation Modal State
  const [deleteId, setDeleteId] = useState(null);

  const loadHistory = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetchScanHistory();
      const logs = response.message || response.data || [];
      setHistoryData(logs);
    } catch (err) {
      setError(err.message || "Failed to load scan history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleConfirmDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteScanHistoryItem(deleteId);
      setHistoryData((prev) => prev.filter((item) => item._id !== deleteId));
      showAlert("Scan record deleted successfully!", "success");
    } catch (err) {
      showAlert(err.message || "Failed to delete record.", "error");
    } finally {
      setDeleteId(null);
    }
  };

  const handleViewDetails = async (id) => {
    try {
      setDetailLoading(true);
      const response = await fetchScanHistoryById(id);
      const data = response.message || response.data || response;
      setSelectedItem(data);
    } catch (err) {
      showAlert("Failed to load record details.", "error");
    } finally {
      setDetailLoading(false);
    }
  };

  const showAlert = (msg, type = "success") => {
    setAlertMessage({ msg, type });
    setTimeout(() => setAlertMessage(null), 4000);
  };

  const getToolIcon = (scanType) => {
    switch (scanType?.toLowerCase()) {
      case "url":
      case "link":
        return LinkIcon;
      case "message":
      case "text":
        return MessageSquare;
      case "qrcode":
      case "qr":
        return QrCode;
      case "screenshot":
      case "image":
        return ImageIcon;
      default:
        return LinkIcon;
    }
  };

  const formatTimeAgo = (isoString) => {
    if (!isoString) return "Recently";
    const date = new Date(isoString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return "Just now";
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 text-slate-900 dark:text-slate-100 pb-10 relative">
      {/* CUSTOM ALERT BANNER */}
      {alertMessage && (
        <div
          className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-bold animate-in fade-in slide-in-from-top-4 ${
            alertMessage.type === "success"
              ? "bg-emerald-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {alertMessage.type === "success" ? (
            <CheckCircle2 size={18} />
          ) : (
            <AlertCircle size={18} />
          )}
          {alertMessage.msg}
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black flex items-center gap-3">
            <History className="text-blue-600 dark:text-blue-400" size={32} />
            Scan History & Audit Logs
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
            Track your latest security scans, view full deep-dive logs, and
            manage scan history.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 flex items-center gap-3 text-sm font-medium">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {/* TABLE */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-3">
          <Loader2 className="animate-spin text-indigo-600" size={36} />
          <p className="text-sm font-medium text-slate-500">
            Fetching your secure scan history...
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Scan ID / Tool
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Input / Summary
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Risk Score
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Timestamp
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {historyData.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-12 text-slate-400 text-sm"
                    >
                      No scan history found. Run a scan to see records here!
                    </td>
                  </tr>
                ) : (
                  historyData.map((item) => {
                    const recordId = item._id || item.id;
                    const shortId = `#${recordId.slice(-6)}`;
                    const IconComponent = getToolIcon(item.scanType);
                    const riskScore = item.result?.riskScore ?? item.risk ?? 0;
                    const status =
                      item.result?.overallStatus ||
                      (riskScore > 40 ? "High Risk" : "Safe");
                    const isSafe = status.toLowerCase().includes("safe");

                    return (
                      <tr
                        key={recordId}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                              <IconComponent size={18} />
                            </div>
                            <div>
                              <p className="font-bold capitalize text-sm">
                                {item.scanType || "Scan"}
                              </p>
                              <span className="text-[10px] font-mono text-indigo-500 font-semibold bg-indigo-50 dark:bg-indigo-950/50 px-1.5 py-0.5 rounded">
                                {shortId}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-mono text-slate-600 dark:text-slate-300 truncate max-w-[220px]">
                          {item.input ||
                            item.target ||
                            item.result?.summary ||
                            "N/A"}
                        </td>
                        <td className="px-6 py-4 font-black">
                          <span
                            className={`${riskScore > 40 ? "text-red-500" : "text-emerald-500"}`}
                          >
                            {riskScore}/100
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              isSafe
                                ? "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                                : "bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400"
                            }`}
                          >
                            {isSafe ? (
                              <ShieldCheck size={12} />
                            ) : (
                              <ShieldAlert size={12} />
                            )}
                            {status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5 pt-6">
                          <Clock size={14} className="opacity-70" />
                          {formatTimeAgo(item.createdAt || item.timestamp)}
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button
                            onClick={() => handleViewDetails(recordId)}
                            className="p-2 rounded-xl text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors cursor-pointer inline-block"
                            title="View Full Data"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => setDeleteId(recordId)}
                            className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer inline-block"
                            title="Delete record"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* FULL DATA DETAILS MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-indigo-500">
                  Scan Details Report
                </span>
                <h2 className="text-xl font-black capitalize">
                  {selectedItem.scanType || "Scan"} Analysis
                </h2>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">
                  Input / Scanned Target
                </p>
                <p className="font-mono bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800 mt-1 break-all text-slate-700 dark:text-slate-300">
                  {selectedItem.input || selectedItem.target || "N/A"}
                </p>
              </div>

              {/* Display Image if present in schema */}
              {selectedItem.image?.url && (
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase mb-1">
                    Scanned Image
                  </p>
                  <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 max-h-48 bg-slate-950 flex justify-center">
                    <img
                      src={selectedItem.image.url}
                      alt="Scan Target"
                      className="object-contain h-48 w-full"
                    />
                  </div>
                </div>
              )}

              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">
                  AI Summary & Explanation
                </p>
                <p className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800 mt-1 leading-relaxed text-slate-700 dark:text-slate-300">
                  {selectedItem.result?.summary ||
                    selectedItem.result?.aiExplanation ||
                    "No summary available."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-bold text-slate-400 uppercase">
                    Risk Score
                  </p>
                  <p
                    className={`text-xl font-black mt-1 ${(selectedItem.result?.riskScore ?? 0) > 40 ? "text-red-500" : "text-emerald-500"}`}
                  >
                    {selectedItem.result?.riskScore ?? 0}/100
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-bold text-slate-400 uppercase">
                    Timestamp
                  </p>
                  <p className="text-xs font-semibold mt-2 text-slate-600 dark:text-slate-400">
                    {new Date(selectedItem.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl font-bold text-sm cursor-pointer"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOM DELETE ALERT DIALOG */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/20 text-red-600 flex items-center justify-center mx-auto">
              <ShieldAlert size={24} />
            </div>
            <h3 className="text-lg font-black">Delete Scan Record?</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Are you sure you want to delete this log entry? This action cannot
              be undone.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold rounded-2xl text-sm transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl text-sm transition-colors shadow-lg shadow-red-600/20 cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
