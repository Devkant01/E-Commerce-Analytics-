
async function handler(req, res, next) {
    try {
        const { month } = req.query;
        if (!month) {
            return res.status(400).json({ msg: "Month parameter is required." });
        }
        
        // for statistical calculation
        const api1 = `http://localhost:3000/api/v1/user/monthlyStats?month=${month}`;
        // for bar chart
        const api2 = `http://localhost:3000/api/v1/user/priceRange?month=${month}`;
        // for pie chart
        const api3 = `http://localhost:3000/api/v1/user/allCategories?month=${month}`;
        
        const [data1, data2, data3] = await Promise.all([
            fetch(api1),
            fetch(api2),
            fetch(api3)
        ]);
        if (!data1.ok || !data2.ok || !data3.ok) {
            return res.status(500).json({ msg: "Error fetching data from APIs." });
        }

        const result1 = await data1.json();
        const result2 = await data2.json();
        const result3 = await data3.json();

        res.status(200).json({
            api1: result1,
            api2: result2,
            api3: result3
        });
    
    } catch (error) {
        console.error("Error from main Handler:", error);
        res.status(500).json({ msg: "Error from main Handler." });
    }
}

module.exports = {
    handler
}

/*GET
Create an API which fetches the data from all the 3 APIs mentioned above, combines
the response and sends a final response of the combined JSON
*/