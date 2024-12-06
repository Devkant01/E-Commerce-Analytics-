const { items } = require('../model/admin');

async function allCategories(req, res, next) {
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
            }, { category: 1 }
        )

        const categoryCounts = {};
        transactions.map(trans => {
            if (categoryCounts[trans.category]) {
                categoryCounts[trans.category] += 1;
            } else {
                categoryCounts[trans.category] = 1;
            }
        })
        res.status(200).json({
            categoryCounts
        });

    } catch (error) {
        console.error("Error while calculating categories count:", error);
        res.status(500).json({ msg: "Error while calculating categories count." });
    }
}

module.exports = {
    allCategories
}

/*GET
Create an API for pie chart Find unique categories and number of items from that
category for the selected month regardless of the year.
For example :
- X category : 20 (items)
- Y category : 5 (items)
- Z category : 3 (items) */