# Tennis Players Statistics API

A RESTful API for managing tennis player statistics, built with Node.js, Express, and TypeScript.

## Live Demo

**Production:** http://tennis-players-env.eba-ecx3b7bt.eu-west-3.elasticbeanstalk.com/  
**API Docs:** http://tennis-players-env.eba-ecx3b7bt.eu-west-3.elasticbeanstalk.com/api-docs/

## Features

- Complete CRUD operations for tennis players
- Statistical calculations (country win ratios, BMI, median height)
- Input validation with Zod
- Duplicate player detection
- Interactive API documentation with Swagger
- Comprehensive error handling
- Deployed on AWS Elastic Beanstalk

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/players` | Get all players (sorted by rank) |
| GET | `/api/players/:id` | Get player by ID |
| POST | `/api/players` | Create new player |
| GET | `/api/statistics` | Get global statistics |

## Quick Start

```bash
npm install
npm run build
npm start
```

The API will be available at `http://localhost:3000`

## Tech Stack

- **Runtime:** Node.js 20
- **Framework:** Express.js
- **Language:** TypeScript
- **Validation:** Zod
- **Documentation:** Swagger UI / OpenAPI 3.0
- **Testing:** Jest (82% coverage)
- **Deployment:** AWS Elastic Beanstalk

## Project Structure

```
src/
├── controllers/     # Request handlers
├── services/        # Business logic
├── routes/          # Endpoint definitions
├── schemas/         # Zod validation schemas
├── middlewares/     # Express middleware
├── models/          # TypeScript interfaces
├── config/          # App configuration
└── data/            # JSON data storage
```

## Example Usage

### Get all players

```bash
curl http://tennis-players-env.eba-ecx3b7bt.eu-west-3.elasticbeanstalk.com/api/players
```

### Create a player

```bash
curl -X POST http://tennis-players-env.eba-ecx3b7bt.eu-west-3.elasticbeanstalk.com/api/players \
  -H "Content-Type: application/json" \
  -d '{
    "firstname": "Rafael",
    "lastname": "Nadal",
    "sex": "M",
    "country": {"code": "ESP"},
    "data": {
      "rank": 1,
      "points": 9850,
      "weight": 85000,
      "height": 185,
      "age": 37
    }
  }'
```

### Get statistics

```bash
curl http://tennis-players-env.eba-ecx3b7bt.eu-west-3.elasticbeanstalk.com/api/statistics
```

Response example:
```json
{
  "success": true,
  "data": {
    "countryWithHighestWinRatio": {
      "country": "SRB",
      "winRatio": 1.0
    },
    "averageBMI": 23.37,
    "medianHeight": 185
  }
}
```

## Development

### Scripts

```bash
npm run dev          # Start with auto-reload
npm run build        # Compile TypeScript
npm start            # Run production build
npm test             # Run tests
npm run lint         # Check code quality
```

### Testing

The project includes unit and integration tests with Jest:

```bash
npm test
```

Coverage: 82% branches, 91% statements.

## Deployment

Deployed on AWS Elastic Beanstalk (eu-west-3, Paris).

To deploy your own instance:

```bash
pip install awsebcli
eb init
eb create your-app-name --single
eb deploy
```

## Architecture

The API follows the MVC pattern:

```
Request → Route → Validation Middleware → Controller → Service → Response
```

- **Routes** define endpoints and apply middleware
- **Validation middleware** uses Zod to validate request data
- **Controllers** handle HTTP logic
- **Services** contain business logic

## Error Handling

All errors return a consistent format:

```json
{
  "success": false,
  "error": "Error type",
  "message": "Detailed message",
  "status": 400
}
```

## License

ISC
