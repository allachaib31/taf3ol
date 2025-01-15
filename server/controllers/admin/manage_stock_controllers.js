const mongoose = require("mongoose");
const httpStatus = require("http-status");
const { validationStock, Stock } = require("../../models/stock/stock");
const { Product } = require("../../models/products/product");
const { Admin } = require("../../models/admin/admin");
const { saveNotification } = require("../../utils/constants");
const { validationItemStock, ItemStock } = require("../../models/stock/itemStock");

exports.addStock = async (req, res) => {
    const admin = req.admin;
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Validate the request body
        const { error } = validationStock(req.body);
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json({
                msg: error.details[0].message,
            });
        }

        // Check if the referenced product exists
        const product = await Product.findById(req.body.idProduct).session(session);
        if (!product) {
            await session.abortTransaction();
            session.endSession();
            return res.status(httpStatus.NOT_FOUND).json({
                msg: "المنتج غير موجود",
            });
        }

        // Create a new stock document
        const newStock = new Stock(req.body);
        await newStock.save({ session }); // Save the stock with the session

        // Update the product with the stock ID
        product.stockId = newStock._id;
        await product.save({ session });

        // Add admin notification
        const adminData = await Admin.findById(admin._id).session(session);
        let content = `${adminData.username} قام باضافة مخزن جديد `;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session);

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        // Populate the idProduct field in the response
        const populatedStock = await Stock.findById(newStock._id).populate("idProduct");

        return res.status(httpStatus.CREATED).json({
            notificationMsg: content,
            msg: "تمت إضافة المخزون بنجاح",
            newStock: populatedStock, // Send the populated stock
        });
    } catch (err) {
        console.log(err)
        await session.abortTransaction();
        session.endSession();

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            msg: "فشل في إضافة المخزون",
            error: err.message,
        });
    }
};

exports.updateStockPrice = async (req, res) => {
    const admin = req.admin;
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Validate the request body
        const { stockId, newPrice } = req.body;
        if (!stockId) {
            return res.status(httpStatus.BAD_REQUEST).json({
                msg: "بيانات غير صحيحة. تأكد من إرسال معرف المخزون وسعر صالح.",
            });
        }

        // Find the stock by ID
        const stock = await Stock.findById(stockId).session(session);
        if (!stock) {
            await session.abortTransaction();
            session.endSession();
            return res.status(httpStatus.NOT_FOUND).json({
                msg: "المخزون غير موجود",
            });
        }

        // Update the stock price
        stock.cost = newPrice;
        await stock.save({ session });

        // Add admin notification
        const adminData = await Admin.findById(admin._id).session(session);
        let content = `${adminData.username} قام بتحديث الكلفة `;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session);

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        return res.status(httpStatus.OK).json({
            msg: "تم تحديث السعر بنجاح",
            updatedStock: stock,
            notificationMsg: content,
        });
    } catch (err) {
        console.error(err);
        await session.abortTransaction();
        session.endSession();

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "فشل في تحديث السعر",
            error: err.message,
        });
    }
};


exports.deleteStock = async (req, res) => {
    const admin = req.admin;
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { stocksId } = req.body; // Array of stock IDs

        // Find all stocks by their IDs
        const stocks = await Stock.find({ _id: { $in: stocksId } }).session(session);

        if (!stocks.length) {
            return res.status(httpStatus.NOT_FOUND).json({
                msg: "لم يتم العثور على المخزون",
            });
        }

        // Mark each stock as deleted
        for (let stock of stocks) {
            stock.isDeleted = true;
            await stock.save({ session });
        }
        // Add admin notification
        const adminData = await Admin.findById(admin._id).session(session);
        let content = `${adminData.username} قام بحذف مخزن  `;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session);

        await session.commitTransaction();
        session.endSession();

        return res.status(httpStatus.OK).json({
            msg: "تم حذف المخزون بنجاح",
            notificationMsg: content,
        });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "فشل في حذف المخزون",
            error: err.message,
        });
    }
};


exports.getStock = async (req, res) => {
    const query = req.query.query || ""; // Default to an empty string
    const page = parseInt(req.query.page, 10) || 1; // Default to page 1
    const limit = req.query.limit === "ALL" ? 0 : parseInt(req.query.limit, 10) || 5; // Use 0 for no limit when "ALL"
    const skip = (page - 1) * limit;

    try {
        // Basic stock query with optional search
        const stockQuery = { isDeleted: false };
        if (query) {
            stockQuery.$or = [
                { "idProduct.nameAr": { $regex: query, $options: "i" } },
                { "idProduct.nameEn": { $regex: query, $options: "i" } },
            ];
        }

        // Find stocks, populate idProduct, skip and limit for pagination
        const stocks = await Stock.find(stockQuery)
            .skip(skip) // Skip for pagination
            .limit(limit > 0 ? limit : 0) // Limit the results if necessary
            .populate("idProduct"); // Populate the `idProduct` field

        // Get total document count for pagination
        const totalDocuments = await Stock.countDocuments({ isDeleted: false });

        return res.status(200).json({
            stocks,
            total: totalDocuments,
            page,
            limit,
            totalPages: limit > 0 ? Math.ceil(totalDocuments / limit) : 1,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: err.message,
        });
    }
};

exports.stockInfo = async (req, res) => {
    const { id } = req.query; // Get the stock ID from the query parameters

    if (!id) {
        return res.status(httpStatus.BAD_REQUEST).json({
            msg: "الرجاء تقديم معرف المخزون",
        });
    }

    try {
        // Find the stock by its ID and populate the idProduct field
        const stock = await Stock.findById(id)
            .populate("idProduct") // Populate the idProduct field with product details
            .exec();

        if (!stock) {
            return res.status(httpStatus.NOT_FOUND).json({
                msg: "لم يتم العثور على المخزون",
            });
        }
        return res.status(httpStatus.OK).json({
            stock,
            msg: "تم جلب تفاصيل المخزون بنجاح",
        });
    } catch (err) {
        console.error(err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "فشل في جلب تفاصيل المخزون",
            error: err.message,
        });
    }
};

exports.addItemStock = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Ensure the input contains the necessary fields
        const { idStock, textLines, note } = req.body;
        const admin = req.admin;

        // Check if the referenced stock exists
        const stock = await Stock.findById(idStock).populate("idProduct").session(session);
        if (!stock) {
            await session.abortTransaction();
            session.endSession();
            return res.status(httpStatus.NOT_FOUND).json({
                msg: "المخزن غير موجود",
            });
        }

        // Split the input text into lines
        const lines = textLines.split("\n").map(line => line.trim()).filter(line => line);

        // Create an array to hold the new ItemStock objects
        const itemStockArray = lines.map(line => ({
            idStock,
            item: line,
            note
        }));

        // Validate and save each itemStock
        const savedItemStocks = [];
        for (const itemStockData of itemStockArray) {
            // Validate each itemStock
            const { error } = validationItemStock(itemStockData);
            if (error) {
                await session.abortTransaction();
                session.endSession();
                return res.status(httpStatus.BAD_REQUEST).json({
                    msg: `خطأ في عنصر المخزون: ${error.details[0].message}`,
                });
            }

            // Create and save the itemStock
            const newItemStock = new ItemStock(itemStockData);
            await newItemStock.save({ session });
            savedItemStocks.push(newItemStock);
        }
        stock.quantityAvailable += savedItemStocks.length;
        await stock.save({ session })

        const adminData = await Admin.findById(admin._id).session(session);
        const content = `${adminData.username} قام بإضافة ${savedItemStocks.length} عنصر جديد إلى المخزون`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session);

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        return res.status(httpStatus.CREATED).json({
            msg: "تمت إضافة عناصر المخزون بنجاح",
            newItemStocks: savedItemStocks,
            stock,
            notificationMsg: content,
        });
    } catch (err) {
        console.error(err);
        await session.abortTransaction();
        session.endSession();

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            msg: "فشل في إضافة عناصر المخزون",
            error: err.message,
        });
    }
};

exports.deleteItemStock = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { stocksId, idStock } = req.body;

        // Validate that stocksId is provided and is an array
        if (!Array.isArray(stocksId) || stocksId.length === 0) {
            return res.status(httpStatus[400]).json({
                msg: "يجب إرسال معرفات العناصر المراد حذفها",
            });
        }
        const stock = await Stock.findById(idStock).populate("idProduct").session(session);
        if (!stock) {
            await session.abortTransaction();
            session.endSession();
            return res.status(httpStatus.NOT_FOUND).json({
                msg: "المخزن غير موجود",
            });
        }

        // Perform deletion of the provided stocks
        const deletedItems = await ItemStock.deleteMany({ _id: { $in: stocksId }, sold: false }).session(session);
        stock.quantityAvailable -= deletedItems.deletedCount;
        await stock.save({ session });

        // Add notification for the admin
        const admin = req.admin; // Assuming `req.admin` contains authenticated admin info
        const adminData = await Admin.findById(admin._id).session(session);

        const content = `${adminData.username} قام بحذف ${deletedItems.deletedCount} عناصر مخزون`;
        await saveNotification(
            admin,
            "Admin",
            "Admin",
            "reminder",
            content,
            true,
            null,
            null,
            session
        );

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        return res.status(httpStatus.OK).json({
            msg: `${deletedItems.deletedCount} عناصر مخزون تم حذفها بنجاح`,
            stock
        });
    } catch (err) {
        console.error(err);

        await session.abortTransaction();
        session.endSession();

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "فشل في حذف عناصر المخزون",
            error: err.message,
        });
    }
};

exports.getItemStockSold = async (req, res) => {
    try {
        const idStock = req.query.idStock;
        const page = parseInt(req.query.page, 10) || 1; // Default to page 1
        const limit = (req.query.limit == "ALL") ? "ALL" : (parseInt(req.query.limit, 10) || 10); // Default to 10 items per page
        const skip = (page - 1) * limit;

        let soldItems;
        // Query for sold items
        if (limit == "ALL") {
            soldItems = await ItemStock.find({ idStock, sold: true })
                .populate("idStock");
        } else {
            soldItems = await ItemStock.find({ idStock, sold: true })
                .skip(skip)
                .limit(limit)
                .populate("idStock");
        }

        const totalSold = await ItemStock.countDocuments({ sold: true });

        return res.status(httpStatus.OK).json({
            soldItems,
            total: totalSold,
            page,
            limit,
            totalPages: Math.ceil(totalSold / limit),
        });
    } catch (err) {
        console.error(err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "فشل في جلب العناصر المباعة",
            error: err.message,
        });
    }
};


exports.getItemStockAvailable = async (req, res) => {
    try {
        const idStock = req.query.idStock;
        const page = parseInt(req.query.page, 10) || 1; // Default to page 1
        const limit = (req.query.limit == "ALL") ? "ALL" : (parseInt(req.query.limit, 10) || 10); // Default to 10 items per page
        const skip = (page - 1) * limit;

        // Query for available items
        let availableItems;
        if (limit == "ALL") {
            availableItems = await ItemStock.find({ idStock, sold: false, damaged: false })
                .populate("idStock");
        } else {
            availableItems = await ItemStock.find({ idStock, sold: false, damaged: false })
                .skip(skip)
                .limit(limit)
                .populate("idStock");
        }

        const totalAvailable = await ItemStock.countDocuments({ sold: false, damaged: false });

        return res.status(httpStatus.OK).json({
            availableItems,
            total: totalAvailable,
            page,
            limit,
            totalPages: Math.ceil(totalAvailable / limit),
        });
    } catch (err) {
        console.error(err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "فشل في جلب العناصر المتاحة",
            error: err.message,
        });
    }
};


exports.getItemStockDamaged = async (req, res) => {
    try {
        const idStock = req.query.idStock;
        const page = parseInt(req.query.page, 10) || 1; // Default to page 1
        const limit = (req.query.limit == "ALL") ? "ALL" : (parseInt(req.query.limit, 10) || 10); // Default to 10 items per page
        const skip = (page - 1) * limit;

        let damagedItems;
        // Query for damaged items
        if (limit == "ALL") {
            damagedItems = await ItemStock.find({ idStock, damaged: true })
                .populate("idStock");
        } else {
            damagedItems = await ItemStock.find({ idStock, damaged: true })
                .skip(skip)
                .limit(limit)
                .populate("idStock");
        }


        const totalDamaged = await ItemStock.countDocuments({ damaged: true });

        return res.status(httpStatus.OK).json({
            damagedItems,
            total: totalDamaged,
            page,
            limit,
            totalPages: Math.ceil(totalDamaged / limit),
        });
    } catch (err) {
        console.error(err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "فشل في جلب العناصر التالفة",
            error: err.message,
        });
    }
};
