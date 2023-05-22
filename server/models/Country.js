const { model, Schema } = require('mongoose')

const countrySchema = new Schema(
    {
        commonName: String,
        officialName: String,
        capital: String,
        region: String,
        currencies: [Object],
        languages: [String],
        flag: String,
        coordinates: [Number],
        country_id: String
    },
    {
        timestamps: true,
        timeseries: true
    }
)

module.exports = model("Country", countrySchema)

