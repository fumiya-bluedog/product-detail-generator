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
export OPENAI_API_KEY="your_api_key_here"
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

# Demo case
### RoboBuddy 3000
<details>
<summary>
http://localhost:9090/getProductInfo?query=RoboBuddy 3000
</summary>

```json
{
  "product": {
    "id": "RB3000",
    "name": "RoboBuddy 3000",
    "description": "Meet your new best friend, the RoboBuddy 3000! This advanced robot companion is equipped with state-of-the-art AI technology to assist you in your daily tasks and keep you company.",
    "category": "Robotics",
    "manufacturer": {
      "name": "Tech Innovations Inc.",
      "address": {
        "street": "123 Innovation Way",
        "city": "Techville",
        "state": "California",
        "postalCode": "90001",
        "country": "USA"
      },
      "contact": {
        "phone": "123-456-7890",
        "email": "info@techinnovations.com",
        "website": "www.techinnovations.com"
      }
    },
    "specifications": {
      "dimensions": {
        "width": "12 inches",
        "height": "18 inches",
        "depth": "10 inches"
      },
      "weight": "5 lbs",
      "materials": [
        "Plastic",
        "Metal"
      ],
      "battery": {
        "type": "Lithium-ion",
        "capacity": "5000 mAh",
        "chargingTime": "2 hours",
        "batteryLife": "8 hours"
      },
      "features": [
        "Voice recognition",
        "Facial recognition",
        "Autonomous navigation",
        "Interactive responses"
      ]
    },
    "pricing": {
      "currency": "USD",
      "price": 499.99,
      "discount": {
        "isAvailable": true,
        "percentage": 10,
        "validUntil": "2022-12-31"
      }
    },
    "availability": {
      "inStock": true,
      "stockCount": 150,
      "warehouses": [
        {
          "location": "Los Angeles, CA",
          "stock": 100
        },
        {
          "location": "New York, NY",
          "stock": 50
        }
      ]
    },
    "reviews": [
      {
        "user": "HappyCustomer123",
        "rating": 5,
        "comment": "Absolutely love my RoboBuddy 3000! It's like having a personal assistant and friend all in one.",
        "date": "2022-08-15"
      },
      {
        "user": "TechGuru99",
        "rating": 4,
        "comment": "Impressive technology and functionality, but could use some improvements in voice recognition.",
        "date": "2022-09-02"
      }
    ],
    "tags": [
      "Robot",
      "AI",
      "Companion"
    ],
    "relatedProducts": [
      {
        "id": "67890",
        "name": "RoboPet 2000",
        "url": "/products/67890"
      },
      {
        "id": "11223",
        "name": "RoboCleaner 5000",
        "url": "/products/11223"
      }
    ]
  }
}
```
</details>

### Vegetable World
<details>
<summary>
http://localhost:9090/getProductInfo?query=Vegetable World
</summary>

```json
{
  "product": {
    "id": "12345",
    "name": "Vegetable World",
    "description": "Explore a world of fresh and vibrant vegetables with Vegetable World. This product is perfect for all your culinary adventures.",
    "category": "Kitchen & Dining",
    "manufacturer": {
      "name": "Fresh Farms Inc.",
      "address": {
        "street": "123 Green Street",
        "city": "Farmville",
        "state": "CA",
        "postalCode": "98765",
        "country": "USA"
      },
      "contact": {
        "phone": "123-456-7890",
        "email": "info@freshfarms.com",
        "website": "www.freshfarms.com"
      }
    },
    "specifications": {
      "dimensions": {
        "width": "12 inches",
        "height": "8 inches",
        "depth": "6 inches"
      },
      "weight": "2 lbs",
      "materials": [
        "Plastic",
        "Metal"
      ],
      "battery": {
        "type": "",
        "capacity": "",
        "chargingTime": "",
        "batteryLife": ""
      },
      "features": [
        "Fresh vegetables",
        "Vibrant colors",
        "Easy to clean",
        "Durable construction"
      ]
    },
    "pricing": {
      "currency": "USD",
      "price": 29.99,
      "discount": {
        "isAvailable": true,
        "percentage": 10,
        "validUntil": "2023-12-31"
      }
    },
    "availability": {
      "inStock": true,
      "stockCount": 150,
      "warehouses": [
        {
          "location": "Los Angeles, CA",
          "stock": 100
        },
        {
          "location": "New York, NY",
          "stock": 50
        }
      ]
    },
    "reviews": [
      {
        "user": "happychef123",
        "rating": 5,
        "comment": "Love using Vegetable World in my kitchen!",
        "date": "2022-08-15"
      },
      {
        "user": "veggiequeen",
        "rating": 4,
        "comment": "Great product for fresh veggies.",
        "date": "2022-08-20"
      }
    ],
    "tags": [
      "vegetables",
      "kitchen",
      "cooking"
    ],
    "relatedProducts": [
      {
        "id": "67890",
        "name": "Fresh Salad Spinner",
        "url": "www.example.com/product/67890"
      },
      {
        "id": "11223",
        "name": "Herb Garden Kit",
        "url": "www.example.com/product/11223"
      }
    ]
  }
}
```
</details>

### History of Technology
<details>
<summary>
http://localhost:9090/getProductInfo?query=History of Technology
</summary>

```json
{
  "product": {
    "id": "12345",
    "name": "History of Technology",
    "description": "Explore the evolution and impact of technology through the ages with this comprehensive book.",
    "category": "Books",
    "manufacturer": {
      "name": "TechPublish Co.",
      "address": {
        "street": "123 Tech Ave",
        "city": "Techville",
        "state": "Techland",
        "postalCode": "54321",
        "country": "Techlandia"
      },
      "contact": {
        "phone": "+1234567890",
        "email": "info@techpublish.com",
        "website": "www.techpublish.com"
      }
    },
    "specifications": {
      "dimensions": {
        "width": "6 inches",
        "height": "9 inches",
        "depth": "1.5 inches"
      },
      "weight": "1 lb",
      "materials": [
        "Paper"
      ],
      "battery": {
        "type": "",
        "capacity": "",
        "chargingTime": "",
        "batteryLife": ""
      },
      "features": [
        "Illustrations",
        "Timeline of Technological Advancements",
        "Key Innovations",
        "Impact on Society"
      ]
    },
    "pricing": {
      "currency": "USD",
      "price": 29.99,
      "discount": {
        "isAvailable": true,
        "percentage": 10,
        "validUntil": "2023-12-31"
      }
    },
    "availability": {
      "inStock": true,
      "stockCount": 1000,
      "warehouses": [
        {
          "location": "Los Angeles, CA",
          "stock": 500
        },
        {
          "location": "New York, NY",
          "stock": 500
        }
      ]
    },
    "reviews": [
      {
        "user": "Bookworm123",
        "rating": 5,
        "comment": "Fantastic read!",
        "date": "2022-08-15"
      },
      {
        "user": "TechEduFan",
        "rating": 4,
        "comment": "Informative and engaging",
        "date": "2022-08-20"
      }
    ],
    "tags": [
      "History",
      "Technology",
      "Innovation"
    ],
    "relatedProducts": [
      {
        "id": "67890",
        "name": "Tech Revolution: A Visual Journey",
        "url": "/products/67890"
      },
      {
        "id": "11223",
        "name": "Digital Age Explorers",
        "url": "/products/11223"
      }
    ]
  }
}
```
</details>
