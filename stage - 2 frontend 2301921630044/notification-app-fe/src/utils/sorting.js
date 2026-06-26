// src/utils/sorting.js

const PRIORITY_WEIGHTS = {
    "Placement": 3,
    "Result": 2,
    "Event": 1
};

export const processAndSortNotifications = (notifications) => {
    // Create a copy of the array before sorting to avoid mutating React state directly
    const notificationsCopy = [...notifications];

    return notificationsCopy.sort((a, b) => {
        const weightA = PRIORITY_WEIGHTS[a.Type] || 0;
        const weightB = PRIORITY_WEIGHTS[b.Type] || 0;
        
        // 1. Sort by Weight (Descending)
        if (weightA !== weightB) {
            return weightB - weightA;
        }
        
        // 2. Sort by Recency (Descending)
        const dateA = new Date(a.Timestamp.replace(' ', 'T')).getTime();
        const dateB = new Date(b.Timestamp.replace(' ', 'T')).getTime();
        
        return dateB - dateA; 
    });
};