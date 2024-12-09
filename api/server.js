const express = require("express")

const webScraper = require("../web-scraper/scraper");
const generateProduct = require("../openai/generate-product");

const app = express()
const port = 9090

app.use(express.json())

app.get("/getProductInfo", async (req, res) => {
    const productName = req.query.query;

    if (!productName) {
        return res.status(404).json({error: "Please fill in your product name"});
    }

    try {
        let productData;
        const productUrls = await webScraper.searchProduct(productName);
        if (productUrls.length > 0) {
            productData = await webScraper.scrapeProduct(productUrls[0]);
        }
        const generatedProduct = await generateProduct(productName, productData);
        res.status(200).json(generatedProduct);
    } catch (e) {
        console.log("There was an error when generating product. Please try again later.")
        res.status(500).json({error: "There was an error when generating product. Please try again later."});
    }
})

app.listen(port, () => console.log(`Listening on port ${port}`))
