const { model, Schema } = require('mongoose')

const countrySchema = new Schema(
    {

    },
    {
        timestamps: true,
        timeseries: true
    }
)

module.exports = model("Country", countrySchema)