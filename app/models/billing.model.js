const mongoose = require('mongoose');
const OrderItem = require('./order-items.schema');

const OrderSchema = mongoose.Schema({

    orderId: String,
    orderDate: String,
    supplierName:String,
    orderNote:String,
    status:String,
    items: [OrderItem]
},
    {
        timestamps: true
    });




module.exports = mongoose.model('OrderSchema', OrderSchema);