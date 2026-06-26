

https://github.com/user-attachments/assets/8462eed3-ad60-4120-ba51-3411591b8daf












# Campus Notifications System - Frontend Evaluation

This repository contains the solution for the Campus Notifications evaluation, focusing on efficient data sorting, API integration, and building a robust React frontend using Material UI.

## 🚀 Project Overview

The application handles a high volume of campus notifications, prioritizing them based on specific weights (Placement > Result > Event) and recency. The project is split into backend logic structuring and frontend React implementation.
email: "aids23042@glbitm.ac.in",
name: "raj aryan",
rollNo: "2301921630044",


### Prerequisites
* **Node.js** (v18 or higher recommended)
* **npm** (Node Package Manager)
* **Postman** (for API token generation/testing)

---

## 🔑 Phase 0: Project Initialization & Authentication

The evaluation API is a protected route. Before running any code, you must obtain a valid JWT Bearer token.

1. **Obtain Token via Postman:**
   * Open Postman and configure your authentication request as per the evaluation portal instructions.
   * Send the request and copy the resulting `token` string.
2. **Configure the App:**
   * Open `src/utils/api.js` (for Stage 2) or `priorityInbox.js` (for Stage 1).
   * Replace the placeholder string `'YOUR_TOKEN_HERE'` with your actual token.
   * *Ensure the `Bearer ` prefix remains intact in the Authorization header.*

---

## 🛠️ Stage 1: Priority Inbox Logic

The first stage focuses on algorithmic sorting. It retrieves notifications and sorts them by a composite score of category weight and timestamp.

**Weight Hierarchy:** Placement (3) > Result (2) > Event (1).

### How to run Stage 1:
1. Navigate to the directory containing the Stage 1 script.
2. Ensure your token is updated in the file.
3. Run the script via Node:
   ```bash
   node priorityInbox.js
