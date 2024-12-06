const { items } = require("../model/admin");

async function priceRange(req, res, next) {
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
            }, { price: 1 }
        )
        
        const priceRanges = Array(10).fill(0);
        transactions.forEach(transaction => {
            const index = Math.min(Math.floor(transaction.price / 100), 9);
            priceRanges[index] += 1;
        });

        res.status(200).json({
            priceRanges
        });

    } catch (error) {
        console.error("Error while calculating price range:", error);
        res.status(500).json({ msg: "Error while calculating price range." });
    }
}

module.exports = {
    priceRange
}


/*GET
Create an API for bar chart ( the response should contain price range and the number
of items in that range for the selected month regardless of the year )
- 0 - 100
- 101 - 200
- 201-300
- 301-400
- 401-500
- 501 - 600
- 601-700
- 701-800
- 801-900
- 901-above */