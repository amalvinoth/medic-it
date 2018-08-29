const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderItemsSchema = new Schema({
    itemMasterId:String,
    itemName: String,
    order: Number,
    freeIssue: Number,
    expiryDate: String,
    remark: String,
    status: String
},
    {
        timestamps: true
    });

module.exports = OrderItemsSchema;