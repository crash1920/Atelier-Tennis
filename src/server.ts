import dotenv from 'dotenv';
import app from './app';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server is running on port ${PORT}`);
  // eslint-disable-next-line no-console
  console.log(`📍 API: http://localhost:${PORT}/api`);
  // eslint-disable-next-line no-console
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});
