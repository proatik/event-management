# How to Run and Use This Project

### **Prerequisites**

Before running the project, ensure you have the following installed:

- **Node.js** (`v20.9.0` or higher recommended)
- **npm** (`10.9.0` or higher recommended)
- **Docker** (optional, for running dependencies like the database)
- **`.env`** configuration

---

### **Step 1: Clone the Repository**

```bash
git clone https://github.com/proatik/event-management.git
cd event-management
```

---

### **Step 2: Install Dependencies**

Use `npm` to install required packages:

```bash
npm install
```

---

### **Step 3: Configure Environment Variables**

Create a `.env` file in the root directory and add the required environment variables. Use the `.env.example` file as a reference.

`.env.example`:

```plaintext
# ----- Application ----- #
APP_PORT=5000

# ----- Database ----- #
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=boss
DB_PASSWORD=password
DB_NAME=event-management
TYPEORM_SYNC=true

# ----- Caching ----- #
CACHE_TTL=3600
CACHE_MAX=100

# ----- Email ----- #
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=boss@gmail.com
SMTP_PASSWORD=password
EMAIL_FROM=boss@gmail.com
```

---

### **Step 4: Run the Database** (optional)

If you are using Docker, start the database container with:

```bash
docker-compose up -d
```

Ensure that the database configuration in the `.env` file matches the database container settings.

_**Note**: If you run database in any other way, please make sure it matches the database configuration in the `.env` file_

---

### **Step 5: Run the Application**

Start the NestJS application:

```bash
npm run start:dev
```

The application will be available at `http://localhost:<PORT>` (default is `3000`).

---

### **Step 6: Access API Documentation**

Swagger API documentation is available at:

```
http://localhost:<PORT>/api-docs
```

You can test all the endpoints interactively using Swagger.

---

### **Acknowledgments**

Thank you for exploring this project! We appreciate your time and interest. If you have any feedback or suggestions, feel free to share them.
