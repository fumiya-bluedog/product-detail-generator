# Overview
Product Detail Generator is a tool that extracts product information from Walmart based on user-entered product names using web scraping techniques. The collected data is processed with the OpenAI API to generate well-structured JSON output.

# Features
- Product Information Retrieval:  
Extracts product data from Walmart using web scraping.

- Data Completion & Structuring:  
Uses OpenAI API to complete and format product details into JSON objects.

# Usage
## Start the server:
```
cd ./api
node server.js
```
## API Endpoint:
- Retrieve Product Information:  
`GET http://localhost:9090/getProductInfo?query=<product_name>`

# Project Structure
```
roduct-detail-generator/
├── api/                # API server endpoints
│   └── server.js
├── web-scraper/        # Web scraping logic
│   └── scraper.js
├── openai/             # OpenAI API integration
│   └── openaiService.js
├── sitemaps/           # Local sitemap storage
└── README.md           # Project documentation
```

# Tech Stack
- Backend: Node.js, Express.js
- Web Scraping: Axios, Cheerio
- API Integration: OpenAI API
- Data Format: JSON

# Future Improvements
- Improve error handling and retry logic
- Implement batch processing for production updates
- Optimize web scraping performance and caching
