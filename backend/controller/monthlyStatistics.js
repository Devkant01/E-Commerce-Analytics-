const { items } = require("../model/admin");

async function monthlyStatistics(req, res, next) {
    try {
        const { month } = req.query;
        if (!month) {
            return res.status(400).json({ msg: "Month parameter is required." });
        }
        const monthIndex = new Date(`${month} 1, 2000`).getMonth() + 1;
        const transactions = await items.find(
            {
                $expr: {
                    $eq: [{ $month: "$dateOfSale" }, monthIndex]
                }
            }
        )
        let totalSale = 0, totalSoldItems = 0, totalUnsoldItems = 0;
        for (let i of transactions) {
            totalSale += i.price;
            if (i.sold) totalSoldItems += i.sold;
            else totalUnsoldItems += 1;
        }

        res.status(200).json({
            totalSale,
            totalSoldItems,
            totalUnsoldItems
        });

    } catch (error) {
        console.error("Error while calculating monthly statistics:", error);
        res.status(500).json({ msg: "Error while calculating monthly statistics." });
    }
}

module.exports = {
    monthlyStatistics
}

/*GET
Create an API for statistics
- Total sale amount of selected month
- Total number of sold items of selected month
- Total number of not sold items of selected month */