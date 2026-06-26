
const { Log } = require("./logger");

async function testLogger() {
    
    await Log("backend", "error", "handler", "received string, expected bool");
    
    
    await Log("frontend", "info", "component", "User clicked submit button");

    console.log("Test complete.");
}

testLogger();