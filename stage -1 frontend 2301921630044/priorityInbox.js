

const API_URL = "http://4.224.186.213/evaluation-service/notifications";
const TOP_N = 10;


const PRIORITY_WEIGHTS = {
    "Placement": 3,
    "Result": 2,
    "Event": 1
};


async function fetchNotifications() {
    try {
        // You must add the headers object here to pass the protected route
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                // IMPORTANT: Replace 'YOUR_TOKEN_HERE' with the actual token provided in your portal
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhaWRzMjMwNDJAZ2xiaXRtLmFjLmluIiwiZXhwIjoxNzgyNDU1OTI5LCJpYXQiOjE3ODI0NTUwMjksImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIxOWNjNWQ3NS1hNzBmLTRhOWItYTc3YS01MmQ0N2UyOWYwYjIiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJyYWogYXJ5YW4iLCJzdWIiOiIxMGExYjU1Zi1kMWMyLTQxNjQtOGJkNy0zN2RhZTI4ZTA4MTMifSwiZW1haWwiOiJhaWRzMjMwNDJAZ2xiaXRtLmFjLmluIiwibmFtZSI6InJhaiBhcnlhbiIsInJvbGxObyI6IjIzMDE5MjE2MzAwNDQiLCJhY2Nlc3NDb2RlIjoieHhrSm5rIiwiY2xpZW50SUQiOiIxMGExYjU1Zi1kMWMyLTQxNjQtOGJkNy0zN2RhZTI4ZTA4MTMiLCJjbGllbnRTZWNyZXQiOiJLUXhRZ2hGV0JaRVdVQ2RlIn0.WeQwLGpxsQhq5stxXnwZ4mLre-6B7r7crzOQqVveskU', 
                
                // If the platform uses a specific API key header instead of Bearer, it might look like this:
                // 'x-api-key': 'YOUR_API_KEY_HERE',
                
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
        }
        
        const data = await response.json();
        return data.notifications || [];
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return []; 
    }
}

function processAndSortNotifications(notifications) {
    return notifications.sort((a, b) => {
        
        const weightA = PRIORITY_WEIGHTS[a.Type] || 0;
        const weightB = PRIORITY_WEIGHTS[b.Type] || 0;
        
        if (weightA !== weightB) {
            return weightB - weightA;
        }
        
       
        const dateA = new Date(a.Timestamp.replace(' ', 'T')).getTime();
        const dateB = new Date(b.Timestamp.replace(' ', 'T')).getTime();
        
        return dateB - dateA; 
    });
}

async function main() {
    console.log("Fetching notifications...");
    const notifications = await fetchNotifications();
    
    if (notifications.length === 0) {
        console.log("No notifications found or API is unavailable.");
        return;
    }

    console.log(`Processing ${notifications.length} notifications...`);
    
    
    const sortedNotifications = processAndSortNotifications(notifications);
    const topNotifications = sortedNotifications.slice(0, TOP_N);
    
    
    console.log(`\n--- Top ${TOP_N} Priority Notifications ---`);
    topNotifications.forEach((notif, index) => {
        console.log(`${index + 1}. [${notif.Type}] ${notif.Message} (Time: ${notif.Timestamp})`);
    });
}


main();