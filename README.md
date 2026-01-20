# Tennis Players Statistics API

RESTful API for managing tennis player statistics. Built with Node.js, Express, and TypeScript.

## Quick Start

```bash
# Install dependencies
npm install

# Run in development
npm run dev

# Run tests
npm test

# Build for production
npm run build
npm start
```

The API runs on `http://localhost:3000`

## API Endpoints

### Get all players (sorted by rank)

```
GET /api/players
```

Returns all players sorted from best rank to worst.

### Get player by ID

```
GET /api/players/:id
```

Returns details for a specific player. Returns 404 if not found.

### Get statistics

```
GET /api/statistics
```

Returns:
- Country with the highest win ratio (based on all players from that country)
- Average BMI of all players
- Median height of all players

Example response:
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

### Create a new player

```
POST /api/players
Content-Type: application/json

{
  "firstname": "Roger",
  "lastname": "Federer",
  "sex": "M",
  "country": {
    "code": "SUI"
  },
  "data": {
    "rank": 3,
    "points": 3000,
    "weight": 85000,  // in grams
    "height": 185,    // in cm
    "age": 40
  }
}
```

Required fields:
- `firstname`, `lastname`, `sex` (M or F)
- `country.code`
- `data.rank`, `data.points`, `data.weight`, `data.height`, `data.age`

The API will auto-generate an ID and shortname if you don't provide one.

## Testing

```bash
npm test
```

Current coverage: 82% branches, 91% statements.

Tests include:
- Unit tests for all service logic
- Integration tests for all endpoints
- Validation and error handling

## Code Quality

The project uses:
- TypeScript with strict mode
- ESLint with Airbnb style guide
- Jest for testing

Check linting:
```bash
npm run lint
```

## Project Structure

```
src/
├── controllers/      # HTTP handlers
├── services/        # Business logic
├── models/          # TypeScript types
├── routes/          # Route definitions
├── middlewares/     # Error handling, logging
└── data/            # JSON data
```

## Tech Stack

- Node.js 20+
- Express.js
- TypeScript
- Jest & Supertest
- ESLint

## Deployment on AWS

### Option 1: AWS Elastic Beanstalk (Recommended)

1. Install the EB CLI:
```bash
pip install awsebcli
```

2. Initialize EB:
```bash
eb init
```
- Choose your region
- Select "Node.js" platform
- Use default settings

3. Create environment and deploy:
```bash
eb create tennis-api-env
```

4. Open your app:
```bash
eb open
```

### Option 2: AWS App Runner

1. Push your code to GitHub

2. Go to AWS App Runner console

3. Create a new service:
   - Source: GitHub repository
   - Build settings: Automatic
   - Start command: `npm start`

### Option 3: AWS Lambda + API Gateway

For serverless deployment, you'd need to adapt the Express app to use `serverless-http`.

## Environment Variables

Set these in your AWS environment:
- `PORT`: 8080 (or whatever AWS uses)
- `NODE_ENV`: production

## Notes

- Player data is loaded from `headtohead.json` on startup
- New players are stored in memory (resets on restart)
- For production use with persistence, consider adding DynamoDB or RDS

## Development

The codebase follows standard REST practices:
- Proper HTTP status codes (200, 201, 400, 404, 500)
- Consistent error responses
- Input validation
- TypeScript strict mode for type safety
- Request logging

## License

ISC
