const axios = require('axios');
const fs = require("fs");
const path = require("path");
const cheerio = require('cheerio');
const xml2js = require('xml2js');

/**
 * Searches for similar products from Walmart's product catalog based on the product name entered by the user.
 * In this project, product information is loaded from Walmart's publicly available sitemaps.
 *
 * Since this is a local environment setup and direct access to the production sitemap is not desired,
 * product information is stored locally for reference.
 *
 * In a production environment, a daily batch process would regularly fetch and update the sitemap,
 * building a master product data repository with the latest product information.
 *
 * @param {string} productName - The name of the product
 * @returns {Promise<*[]>} - A promise resolving to an array of similar products
 */
const searchProduct = async (productName) => {
    const sitemapDir = path.join(__dirname, "../web-scraper/sitemaps");
    const files = fs.readdirSync(sitemapDir);
    const matchUrls = [];

    for (const file of files) {
        const filePath = path.join(sitemapDir, file);
        try {
            const xmlData = fs.readFileSync(filePath, "utf-8");
            const parser = new xml2js.Parser();
            const result = await parser.parseStringPromise(xmlData);

            /** URL ending "ip" is allowed for web scraping */
            const productUrls = result.urlset.url
                .map((entry) => entry.loc[0])
                .filter((url) => url.includes("/ip/") && url.toLowerCase().includes(productName.toLowerCase()));

            matchUrls.push(productUrls);
        } catch (error) {
            console.log("[Error] Couldn't scroll sitemaps. Please confirm files and try again");
        }
    }
    return matchUrls;
}

/**
 * Retrieves basic product information such as name, price, description, and category from Walmart's product detail page.
 *
 * In this implementation, HTML tags were manually specified based on the displayed web page to extract the required data.
 * However, in a production environment, dynamic tag extraction should be configured to adapt to potential changes in the page structure.
 *
 * If data cannot be retrieved from a URL, the next URL in the provided list should be processed.
 * Due to time constraints, this functionality was not implemented in this project.
 *
 * @param {string[]} productUrls - List of product information URLs
 * @return {productName, price, description, categories, source}
 */
const scrapeProduct = async (productUrls) => {
    try {
        const sourceUrl = productUrls[0];
        const data = await axios.get(sourceUrl, {
            headers: {
                "User-Agent": "Chrome",
            }
        });
        if (!data || data.status === 404) {
            return null
        }
        const $ = cheerio.load(data.data);

        const productName = $("title").text().trim();
        let productData = {
            price: null,
            description: null,
            categories: []
        };

        const productJsonLd = $('script[type="application/ld+json"]').get();
        productJsonLd.forEach(script => {
            try {
                const jsonData = JSON.parse($(script).html());

                if (jsonData['@type'] === 'Product') {
                    productData.price = jsonData.offers?.[0]?.price || null;
                    productData.description = jsonData.description?.trim() || null;
                }

                if (jsonData['@type'] === 'BreadcrumbList') {
                    productData.categories = jsonData.itemListElement.map(item => item.item.name);
                }
            } catch (error) {
                console.error("Error parsing JSON-LD:", error);
            }
        });

        return {
            productName,
            price: productData.price ? `$$${productData.price}` : null,
            description: productData.description ? `$$${productData.description}` : null,
            categories: productData.categories ? `${productData.categories}` : null,
            source: "Walmart"
        }
    } catch (error) {
        console.error("Walmart Scraping Error:", error.message);
        return null;
    }
}

module.exports = {
    searchProduct,
    scrapeProduct,
};
