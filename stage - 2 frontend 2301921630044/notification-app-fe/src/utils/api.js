// src/utils/api.js

// 1. Logging Middleware Wrapper
export const fetchWithLogging = async (url, options) => {
    console.log(`[API Request] ${options.method || 'GET'} ${url}`);
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        console.log(`[API Success] Data retrieved successfully`);
        return data;
    } catch (error) {
        console.error(`[API Error]`, error.message);
        throw error;
    }
};

// 2. Fetch Notifications Function
export const getNotifications = async (page = 1, limit = 10, type = '') => {
    const baseUrl = "http://4.224.186.213/evaluation-service/notifications";
    
    // Dynamically build query parameters
    const params = new URLSearchParams({
        page: page,
        limit: limit,
    });
    
    // Only append the type filter if a specific type is selected
    if (type) {
        params.append("notification_type", type);
    }

    const url = `${"/evaluation-service/notifications"}?${params.toString()}`;
    
    return await fetchWithLogging(url, {
        method: 'GET',
        headers: {
            // IMPORTANT: Paste your actual token below, keeping the "Bearer " prefix!
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhaWRzMjMwNDJAZ2xiaXRtLmFjLmluIiwiZXhwIjoxNzgyNDU5NDc2LCJpYXQiOjE3ODI0NTg1NzYsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJjZjFmZjRhMy00YmMzLTQ1MDktODg4My1kYTNmNjc2NzU3M2EiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJyYWogYXJ5YW4iLCJzdWIiOiIxMGExYjU1Zi1kMWMyLTQxNjQtOGJkNy0zN2RhZTI4ZTA4MTMifSwiZW1haWwiOiJhaWRzMjMwNDJAZ2xiaXRtLmFjLmluIiwibmFtZSI6InJhaiBhcnlhbiIsInJvbGxObyI6IjIzMDE5MjE2MzAwNDQiLCJhY2Nlc3NDb2RlIjoieHhrSm5rIiwiY2xpZW50SUQiOiIxMGExYjU1Zi1kMWMyLTQxNjQtOGJkNy0zN2RhZTI4ZTA4MTMiLCJjbGllbnRTZWNyZXQiOiJLUXhRZ2hGV0JaRVdVQ2RlIn0.Ovs1hpfYfUrF1lBPeOMgClGEpFvLYVmjDaXouflpfgE',
            'Content-Type': 'application/json'
        }
    });
};