const { model, Schema } = require('mongoose')

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        fullName: String,
        location: String,
        age: Number,
        profilePic: {
            type: String,
            default: 'https://pwco.com.sg/wp-content/uploads/2020/05/Generic-Profile-Placeholder-v3-300x300.png'
        },
        visitedCountries: [ {type: Schema.Types.ObjectId, ref: "Country"} ]
    },
    {
        timestamps: true,
        timeseries: true
    }
)

module.exports = model("User", userSchema)

