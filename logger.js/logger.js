
const LOG_API_URL = "http://4.224.186.213/evaluation-service/logs";
const ACCESS_TOKEN = process.env.AFFORDMED_ACCESS_TOKEN || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhaWRzMjMwNDJAZ2xiaXRtLmFjLmluIiwiZXhwIjoxNzgyNDUzODM2LCJpYXQiOjE3ODI0NTI5MzYsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI3ODBkNmNhNy1kNDc1LTQwNzYtYWY0ZC1lZDEzOTBmZmQ1MzYiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJyYWogYXJ5YW4iLCJzdWIiOiIxMGExYjU1Zi1kMWMyLTQxNjQtOGJkNy0zN2RhZTI4ZTA4MTMifSwiZW1haWwiOiJhaWRzMjMwNDJAZ2xiaXRtLmFjLmluIiwibmFtZSI6InJhaiBhcnlhbiIsInJvbGxObyI6IjIzMDE5MjE2MzAwNDQiLCJhY2Nlc3NDb2RlIjoieHhrSm5rIiwiY2xpZW50SUQiOiIxMGExYjU1Zi1kMWMyLTQxNjQtOGJkNy0zN2RhZTI4ZTA4MTMiLCJjbGllbnRTZWNyZXQiOiJLUXhRZ2hGV0JaRVdVQ2RlIn0.5e7QoGQ9u5LjmQDLxnxfcd3hXJae_diWdiPgSA_2bXg";

 
async function Log(stack, level, pkg, message) {
   
    const validStacks = ["backend", "frontend"];
    const validLevels = ["debug", "info", "warn", "error", "fatal"];
    
    if (!validStacks.includes(stack)) console.warn(`Invalid stack: ${stack}`);
    if (!validLevels.includes(level)) console.warn(`Invalid level: ${level}`);

    
    const payload = {
        stack: stack,
        level: level,
        package: pkg,
        message: message
    };

   
    try {
        const response = await fetch(LOG_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ACCESS_TOKEN}` 
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Server returned ${response.status}: ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        
        return data;

    } catch (error) {
       
        console.error("Failed to send log to Affordmed API:", error.message);
    }
}


module.exports = { Log };