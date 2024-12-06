const { items } = require('../model/admin');

async function fetchData(req, res, next) {
    const response = await fetch("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
    const data = await response.json();
    if (!data) {
        res.status(500).json({ msg: "Error: No data received from API." });
    } else if (data.length === 0) {
        res.status(404).json({ msg: "No data found." });
    } else {
        for (const item of data) {
            let isExist = await items.findOne({ id: item.id });
            if (isExist) {
                console.log("already exist: ", item.id);
                continue;
            } else {
                await items.create({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    description: item.description,
                    category: item.category,
                    image: item.image,
                    sold: item.sold,
                    dateOfSale: item.dateOfSale
                });
                console.log("added: ", item.id);
            }
        }
    }
    res.status(200).json({ msg: "Data successfully saved to the items collection." });
}

module.exports = {
    fetchData
};