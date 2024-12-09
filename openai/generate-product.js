const OpenAI = require("openai");
const fs = require("node:fs");
const dotenv = require("dotenv");

const generateProduct = async (productName, productData = null) => {
    dotenv.config();
    const apiKey = process.env.OPENAI_API_KEY;
    const openai = new OpenAI();

    const sampleJsonFormat = JSON.parse(
        fs.readFileSync("./product-sample.json", "utf8")
    )

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
         Based on the following product name, generate fictional product information following the required JSON format

         Product Name: ${productName}

         Required Format:
         ${JSON.stringify(sampleJsonFormat)}
         `;

    try {
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
