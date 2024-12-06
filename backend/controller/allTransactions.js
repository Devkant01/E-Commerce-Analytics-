const { items } = require("../model/admin");

async function allTransactions(req, res, next) {
    try {
        const { search = '', page = 1, perPage = 10, month } = req.query;
        if (!month) {
            return res.status(400).json({ msg: "Month parameter is required." });
        }
        const monthIndex = new Date(`${month} 1, 2000`).getMonth() + 1;
        let transactions; //reason: var and const have block-level scope 
        if (search == '') {
            transactions = await items.find(
                {
                    $expr: {
                        $eq: [{ $month: "$dateOfSale" }, monthIndex]
                    }
                }
            ).limit(parseInt(perPage));
        } else {
            transactions = await items.find({
                $and: [
                    {
                        $or: [
                            { title: { $regex: search, $options: "i" } },
                            { description: { $regex: search, $options: "i" } },
                            {
                                price: !isNaN(parseFloat(search)) ? {
                                    $gte: parseFloat(search) + 0.1,
                                    $lt: parseFloat(search) + 1
                                } : undefined
                            }
                        ].filter(Boolean)
                    },
                    {
                        $expr: {
                            $eq: [{ $month: "$dateOfSale" }, monthIndex]
                        }
                    }
                ]
            }).limit(parseInt(perPage));
        }

        res.status(200).json({
            page: parseInt(page),
            perPage: parseInt(perPage),
            transactions
        });
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ msg: "Error while fetching transactions." });
    }
}

module.exports = {
    allTransactions
}

/*Instruction
All the APIs below should take month ( expected value is any month between
January to December) as an input and should be matched against the field
dateOfSale regardless of the year.
GET
Create an API to list the all transactions
- API should support search and pagination on product transactions
- Based on the value of search parameters, it should match search text on product
title/description/price and based on matching result it should return the product
transactions
- If search parameter is empty then based on applied pagination it should return all the
records of that page number
- Default pagination values will be like page = 1, per page = 10 */