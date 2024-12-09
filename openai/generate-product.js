const OpenAI = require("openai");
const fs = require("node:fs");
const path = require("path");
const dotenv = require("dotenv");

/**
 * Generates product information based on the value entered by the user.
 * If product data is provided as an argument, it will be used as a reference when generating the product information.
 * If no reference data is available, the product information will be generated independently.
 *
 * @param {string} productName - The name of the product entered by the user
 * @param {object} [productData] - Optional reference product data
 */
const generateProduct = async (productName, productData = null) => {
    dotenv.config();
    const apiKey = process.env.OPENAI_API_KEY;
    const openai = new OpenAI();

    const sampleJsonPath = path.join(__dirname, "product-sample.json");
    const sampleJsonFormat = JSON.parse(
        fs.readFileSync(sampleJsonPath, "utf-8")
    )

    /**
     * Since the prompt content is hardcoded, adjusting the instructions for the LLM requires redeployment. For the production release, an admin panel should be implemented to enable dynamic prompt adjustments.
     * When reference product data is found, the system generates product information based on that data. Unless the product is entirely fictional, the generated data will generally align with real-world details.
     */
    const prompt = productData ?
        `You are a Product Information Completion Assistant.
         Based on the product information retrieved from the following API, generate a complete JSON object.
         However, keep in mind that this information is only reference data obtained from Walmart product listings. Use it solely as a reference and generate a completely original JSON object.
         The data must always be comprehensive, including details such as reviews and other relevant attributes
         Product Name: ${productName}
         Product Data (Existing Information):
　　      ${JSON.stringify(productData)}

         Required Format:
         ${JSON.stringify(sampleJsonFormat)}
         `
        :
        `You are a Product Information Generation Assistant.
         Based on the following product name, generate fictional product information following the required JSON format.
         The values specified in the JSON are for reference only. They should not be used as-is; adjust the values to dynamically generate data.

         Product Name: ${productName}

         Required Format:
         ${JSON.stringify(sampleJsonFormat)}
         `;

    try {
        /**
         * The model used for the LLM should be configurable through environment variables
         * or similar methods to allow dynamic changes without code modifications
         */
        const completions = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {role: "system", content: "You are product generator. You must return your result as JSON always."},
                {role: "user", content: prompt}
            ],
            max_tokens: 2000,
            temperature: 0.7,
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            }
        });

        return JSON.parse(completions.choices[0].message.content);
    } catch (error) {
        console.log("Error with OpenAI API", error.message);
    }
}

module.exports = generateProduct;
