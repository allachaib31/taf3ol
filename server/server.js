require("custom-env").env();
const { server, app, express } = require('./app');  // Import both the server and the app instance
const connectDB = require('./config/db');
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const compression = require("compression");
const { rateLimit } = require("express-rate-limit");
const mongoose = require("mongoose");
const path = require('path');
const helmet = require("helmet");
const escape = require('./middleware/escape');

const PORT = process.env.PORT;

// MongoDB Connection
connectDB();

const conn = mongoose.connection;
conn.once('open', () => {
    let bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
    module.exports.bucket = bucket;

    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 5000,
        message: "Too many requests from this IP, please try again later.",
        statusCode: 429,
        headers: true
    });

    // Set up Express middlewares
    app
        .use(express.json({ limit: '50mb' }))
        .use(express.urlencoded({ limit: '50mb', extended: true }))
        .use(express.static(path.join(__dirname, 'build')))
        .use(helmet())
        .disable("x-powered-by")
        .use(cors({
            origin: process.env.URL,
            credentials: true
        }))
        .use(limiter)
        .use(compression())
        .use(cookieParser())
        .use(morgan(process.env.MODE))
        .use(escape);

    // Import routes
    const authAdminRoute = require("./routes/admin/auth_admin_routes");
    const manageAdminRoute = require("./routes/admin/manage_admin_route");
    const manageUserRoute = require("./routes/admin/manage_user_route");
    const manageServices = require("./routes/admin/manage_services_routes");
    const notificationRoute = require("./routes/notification/notification_route");
    const fileRoute = require("./routes/files/files_routes");
    app
        .use(authAdminRoute)
        .use(manageAdminRoute)
        .use(manageUserRoute)
        .use(manageServices)
        .use(notificationRoute)
        .use(fileRoute);

    // Start the combined HTTP + WebSocket server
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
