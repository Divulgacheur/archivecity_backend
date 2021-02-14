module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            title: String,
            description: String,
            published: Boolean,
            coordinates: [Number],
            osm_object: Number,
            historic_image: String,
            recent_image: String,

        },
        {timestamps: true}
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    const Archive = mongoose.model("archive", schema);
    return Archive;
};
