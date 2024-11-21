import { https, logger } from 'firebase-functions/v2';
import app from './server'; // Adjust path based on your setup

//if (process.env.NODE_ENV === 'development') {
//  const PORT = process.env.PORT || 3002;
//  app.listen(PORT, () => {
//    console.log(`Server running on http://localhost:${PORT}`);
//  });
//}

export const api = https.onRequest(
  {
    timeoutSeconds: 540, // Up to 9 minutes
    region: 'us-central1', // Define region here
  },
  app
);
