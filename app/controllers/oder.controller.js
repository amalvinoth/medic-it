const Order = require('../models/order.model');


// Create and Save a new Item
exports.create = (req, res) => {

    var itemArray = [];


    req.body.items.forEach(function (item) {
        itemArray.push((item));
    });


    // Create an Item
    const order = new Order({

        orderId: req.body.orderId,
        orderDate: req.body.orderDate,
        supplierName: req.body.supplierName,
        orderNote: req.body.orderNote,
        status: req.body.status,
        items: itemArray

    });






    // return res.status(404).send({
    //     message: ipAddress
    // });
    // Save Item in the database
    order.save()
        .then(data => {
            itemArray = [];
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the order."
            });
        });
};









// Retrieve and return all orders from the database.
exports.findAll = (req, res) => {
    Order.paginate({ status: { $ne: 'DELETED' } }, { limit: 20 })
        .then(orders => {
            res.send(orders);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving orders."
            });
        });
};











// change order id
exports.orderMarkAsReceived = (req, res) => {


    // Find item and update it with the request body
    Order.findByIdAndUpdate(req.params.orderId, {


        status: req.body.status

    }, { new: true })
        .then(order => {
            if (!order) {
                return res.status(404).send({
                    message: "Order not found"
                });
            }
            res.send(order);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Order not found with id"
                });
            }
            return res.status(500).send({
                message: "Error updating order"
            });
        });
};








// edit order
exports.editOrder = (req, res) => {

    var itemArray = [];

    req.body.items.forEach(function (item) {
        itemArray.push((item));
    });

    // Find item and update it with the request body
    Order.findByIdAndUpdate(req.params.orderId, {

        // Create an Item
        orderDate: req.body.orderDate,
        supplierName: req.body.supplierName,
        orderNote: req.body.orderNote,
        items: itemArray


    }, { new: true })
        .then(order => {
            if (!order) {
                return res.status(404).send({
                    message: "Order not found"
                });
            }
            res.send(order);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Order not found with id"
                });
            }
            return res.status(500).send({
                message: "Error updating order"
            });
        });
};