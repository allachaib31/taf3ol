require("custom-env").env();
const { server, app, express } = require('./app'); // Import both the server and the app instance
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
        .use(
            helmet({
                contentSecurityPolicy: {
                    useDefaults: true,
                    directives: {
                        "default-src": ["'self'"],
                        "script-src": ["'self'"],
                        "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
                        "font-src": ["'self'", "https://fonts.gstatic.com"],
                        "img-src": ["'self'", "data:", "https://img.daisyui.com"],
                        "object-src": ["'none'"],
                        "frame-ancestors": ["'self'"],
                    },
                },
                crossOriginEmbedderPolicy: true,
                crossOriginOpenerPolicy: { policy: "same-origin" },
                crossOriginResourcePolicy: { policy: "same-origin" },
                referrerPolicy: { policy: "no-referrer" },
            })
        )
        .use((req, res, next) => {
            res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
            next();
        })
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
    const manageRechargeCards = require("./routes/admin/manage_rechargeCards_route");
    const manageApi = require("./routes/admin/manage_api_route");
    const manageCoins = require("./routes/admin/manage_coins_route");
    const manageStock = require("./routes/admin/manage_stock_routes");
    const managePaymentGateway = require("./routes/admin/manage_paymentGateway_routes");
    const notificationRoute = require("./routes/notification/notification_route");
    const fileRoute = require("./routes/files/files_routes");
    app
        .use(authAdminRoute)
        .use(manageAdminRoute)
        .use(manageUserRoute)
        .use(manageServices)
        .use(manageRechargeCards)
        .use(manageApi)
        .use(manageCoins)
        .use(manageStock)
        .use(managePaymentGateway)
        .use(notificationRoute)
        .use(fileRoute);

    // Logging each request for debugging
    app.use((req, res, next) => {
        console.log(`Request URL: ${req.url}`);
        next();
    });

    // Serve static files and handle SPA routing
    app.use(express.static(path.join(__dirname, 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });

    // Start the combined HTTP + WebSocket server
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
