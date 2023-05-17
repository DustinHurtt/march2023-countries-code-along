const { model, Schema } = require('mongoose')

const postSchema = new Schema(
    {

    },
    {
        timestamps: true,
        timeseries: true
    }
)

module.exports = model("Post", postSchema)