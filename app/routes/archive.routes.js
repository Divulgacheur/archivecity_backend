module.exports = app => {
    const archives = require("../controllers/archive.controller.js");

    var router = require("express").Router();

    // Create a new Archive
    router.post("/", archives.create);

    // Retrieve all Archives
    router.get("/", archives.findAll);

    // Retrieve all published Archives
    router.get("/published", archives.findAllPublished);

    // Retrieve a single Archive with id
    router.get("/:id", archives.findOne);

    // Update a Archive with id
    router.put("/:id", archives.update);

    // Delete a Archive with id
    router.delete("/:id", archives.delete);

    // Create a new Archive
    router.delete("/", archives.deleteAll);

    app.use("/api/archive", router);
};
