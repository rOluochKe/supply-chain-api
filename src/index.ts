import app from './app';
import { connectDatabase } from './db';

const PORT = process.env.PORT || 4000;

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
