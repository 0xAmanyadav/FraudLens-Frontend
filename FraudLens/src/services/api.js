import { auth } from '../firebase/firebase';

const API_BASE = "https://fraudlens-ai-6wqt.onrender.com";

export const scanTarget = async (serviceType, payload) => {
  try {
    const user = auth.currentUser;
    let token = "";
    if (user) token = await user.getIdToken();

    const isFormData = payload instanceof FormData;
    const headers = { ...(token ? { 'Authorization': `Bearer ${token}` } : {}) };
    if (!isFormData) headers['Content-Type'] = 'application/json';

    const response = await fetch(`${API_BASE}/api/v1/${serviceType}/scan`, {
      method: 'POST',
      headers,
      body: isFormData ? payload : JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Server error during scan: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const fetchScanHistory = async () => {
  try {
    const user = auth.currentUser;
    let token = user ? await user.getIdToken() : "";
    const response = await fetch(`${API_BASE}/api/v1/history`, {
      method: 'GET',
      headers: { ...(token ? { 'Authorization': `Bearer ${token}` } : {}), 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error("Failed to fetch history");
    return await response.json();
  } catch (error) {
    console.error("Fetch History Error:", error);
    throw error;
  }
};

export const fetchScanHistoryById = async (id) => {
  try {
    const user = auth.currentUser;
    let token = user ? await user.getIdToken() : "";
    const response = await fetch(`${API_BASE}/api/v1/history/${id}`, {
      method: 'GET',
      headers: { ...(token ? { 'Authorization': `Bearer ${token}` } : {}), 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error("Failed to fetch history details");
    return await response.json();
  } catch (error) {
    console.error("Fetch History By ID Error:", error);
    throw error;
  }
};

export const deleteScanHistoryItem = async (id) => {
  try {
    const user = auth.currentUser;
    let token = user ? await user.getIdToken() : "";
    const response = await fetch(`${API_BASE}/api/v1/history/${id}`, {
      method: 'DELETE',
      headers: { ...(token ? { 'Authorization': `Bearer ${token}` } : {}), 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error("Failed to delete history item");
    return await response.json();
  } catch (error) {
    console.error("Delete History Error:", error);
    throw error;
  }
};