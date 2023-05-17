const { model, Schema } = require('mongoose')

const countrySchema = new Schema(
    {
        commonName: String,
        officialName: String,
        capital: String,
        currency: String,
        languages: [String],
        flag: String,
        coordinates: [Number]
    },
    {
        timestamps: true,
        timeseries: true
    }
)

module.exports = model("Country", countrySchema)

