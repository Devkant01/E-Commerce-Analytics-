const { mongoose } = require("./connect");

const ItemsSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    sold: {
        type: Boolean,
        default: false
    },
    dateOfSale: {
        type: Date,
        default: Date.now
    }
})

const items = new mongoose.model("items", ItemsSchema);

module.exports = {
    items
}