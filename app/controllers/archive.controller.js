const db = require("../models");
const Archive = db.archives;

// Create and Save a new Archive
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }

    // Create a Archive
    const archive = new Archive({
        title: req.body.title,
        description: req.body.description,
        historic_image: req.body.historic_image,
        recent_image: req.body.recent_image,
        published: req.body.published ? req.body.published : false
    });

    // Save Archive in the database
    archive
        .save(archive)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Archive."
            });
        });
};

// Retrieve all Archives from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {title: {$regex: new RegExp(title), $options: "i"}} : {};

    Archive.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving archives."
            });
        });
};

// Find a single Archive with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Archive.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found Archive with id " + id});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error retrieving Archive with id=" + id});
        });
};

// Update a Archive by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Archive.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Archive with id=${id}. Maybe Archive was not found!`
                });
            } else res.send({message: "Archive was updated successfully."});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Archive with id=" + id
            });
        });
};

// Delete a Archive with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Archive.findByIdAndRemove(id, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Archive with id=${id}. Maybe Archive was not found!`
                });
            } else {
                res.send({
                    message: "Archive was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Archive with id=" + id
            });
        });
};

// Delete all Archives from the database.
exports.deleteAll = (req, res) => {
    Archive.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Archives were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all archives."
            });
        });
};

// Find all published Archives
exports.findAllPublished = (req, res) => {
    Archive.find({published: true})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving archives."
            });
        });
};
