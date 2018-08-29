const Item = require('../models/item-master.model.js');

// Create and Save a new Item
exports.create = (req, res) => {
    // Validate request
    if (!req.body.itemName) {
        return res.status(400).send({
            message: "Item name can not be empty"
        });
    }

    // Create an Item
    const item = new Item({

        itemCode: req.body.itemCode,
        itemName: req.body.itemName,
        reorderLevel: req.body.reorderLevel,
        orderQuantity: req.body.orderQuantity,
        unit: req.body.unit,
        price: req.body.price,
        shortExpiry: req.body.shortExpiry,
        status: 'NEW'

    });


    // finf item name available on database
    Item.findOne({ 'itemName': req.body.itemName }).then(itemRes => {
        if (!itemRes) {


            // Save Item in the database
            item.save()
                .then(data => {
                    res.send(data);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Item."
                    });
                });

        } else {

            return res.status(400).send({
                message: "Item name already exist"
            });

        }

    }).catch(err => {
        return res.status(500).send({
            message: "Something went wrong",
            error: err
        });
    });;

};









// Retrieve and return all items from the database.
exports.findAll = (req, res) => {
    // Item.find()
    //     .then(items => {
    //         res.send(items);
    //     }).catch(err => {
    //         res.status(500).send({
    //             message: err.message || "Some error occurred while retrieving items."
    //         });
    //     });




    Item.paginate({ status: { $ne: 'DELETED' } }, { limit: 20 })
        .then(items => {
            res.send(items);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving items."
            });
        });

};




// Retrieve and return date range items from the database.
// filter dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
// exports.findAll = (req, res) => {
//     Item.find({ "createdAt": { "$gte": '2018-08-21T19:27:40.855Z', "$lt": '2018-08-21T19:27:53.265Z' } })
//         .then(items => {
//             res.send(items);
//         }).catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving items."
//             });
//         });
// };










// Find a single item with a itemId
exports.findOne = (req, res) => {
    Item.findById(req.params.itemId)
        .then(item => {
            if (!item) {
                return res.status(404).send({
                    message: "Item not found with id " + req.params.itemId
                });
            }
            res.send(item);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Item not found with id " + req.params.itemId
                });
            }
            return res.status(500).send({
                message: "Error retrieving item with id " + req.params.itemId
            });
        });
};












// Update an item identified by the itemId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.itemName) {
        return res.status(400).send({
            message: "Item name can not be empty"
        });
    }

    // Find item and update it with the request body
    Item.findByIdAndUpdate(req.params.itemId, {

        itemName: req.body.itemName,
        reorderLevel: req.body.reorderLevel,
        orderQuantity: req.body.orderQuantity,
        unit: req.body.unit,
        price: req.body.price,
        shortExpiry: req.body.shortExpiry,
        status: req.body.status

    }, { new: true })
        .then(item => {
            if (!item) {
                return res.status(404).send({
                    message: "Item not found with id " + req.params.itemId
                });
            }
            res.send(item);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Item not found with id " + req.params.itemId
                });
            }
            return res.status(500).send({
                message: "Error updating item with id " + req.params.itemId
            });
        });
};









// Delete an item with the specified itemId in the request
exports.delete = (req, res) => {
    Item.findByIdAndRemove(req.params.itemId)
        .then(item => {
            if (!item) {
                return res.status(404).send({
                    message: "Item not found with id " + req.params.itemId
                });
            }
            res.send({ message: "Item deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Item not found with id " + req.params.itemId
                });
            }
            return res.status(500).send({
                message: "Could not delete item with id " + req.params.itemId
            });
        });
};














// Update an item identified by the itemId in the request
exports.itemdelete = (req, res) => {

    // Find item and update it with the request body
    Item.findByIdAndUpdate(req.params.itemId, {


        status: req.body.status

    }, { new: true })
        .then(item => {
            if (!item) {
                return res.status(404).send({
                    message: "Item not found with id " + req.params.itemId
                });
            }
            res.send(item);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Item not found with id " + req.params.itemId
                });
            }
            return res.status(500).send({
                message: "Error updating item with id " + req.params.itemId
            });
        });
};
