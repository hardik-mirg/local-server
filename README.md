# Home Server Backend

This repository contains a Node.js backend server designed to run on an Android device (via Termux), providing API endpoints to monitor system hardware, manage user authentication, and retrieve device-specific information.

## Features

* **System Monitoring:** Real-time stats for CPU usage, battery status, memory, and storage.
* **Device Info:** Access to hardware model details and a list of available device sensors.
* **User Management:** Simple authentication system (Signup/Login) powered by `nedb-promises`.
* **Termux Integration:** Leverages `termux-api` commands to interface with Android hardware.

---

## Prerequisites

* **Termux** (Android app)
* **Termux:API** (Package installed via `pkg install termux-api`)
* **Node.js**

---

## Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/hardik-mirg/local-server.git](https://github.com/hardik-mirg/local-server.git)
    cd local-server-main
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure Environment:**
    Create a `.env` file in the root directory and specify your port (this file is ignored by git).
    ```text
    PORT=3000
    ```

---

## API Routes

### 1. Authentication (`/auth`)

| Endpoint | Method | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `/auth/signup` | `POST` | Registers a new user. | `{"username": "string", "name": "string", "password": "string"}` |
| `/auth/login` | `POST` | Authenticates an existing user. | `{"username": "string", "password": "string"}` |

### 2. Server Information (`/server`)

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/server/info` | `GET` | Returns device model, manufacturer, Android version, and kernel info. |
| `/server/sensors` | `GET` | Lists all hardware sensors detected on the device. |

### 3. Server Statistics (`/server/stats`)

These endpoints execute shell commands on the host Android device to retrieve real-time data.

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/server/stats/battery` | `GET` | Returns battery percentage, health, temperature, and charging status. |
| `/server/stats/cpu` | `GET` | Returns system uptime, load averages (1m, 5m, 15m), and CPU core count. |
| `/server/stats/memory` | `GET` | Returns total, used, and free bytes for RAM and Swap. |
| `/server/stats/storage` | `GET` | Returns storage metrics (total/used/available bytes) for `/data` and `/sdcard`. |

---

## Database & Cache

* **Database:** Uses `nedb-promises` to store user data in `db/users.db`.
* **Caching:** To improve performance, server info and sensor lists are cached in `db/cache/` to avoid repeated shell execution.

---

**Author:** Hardik Mirg
**License:** ISC