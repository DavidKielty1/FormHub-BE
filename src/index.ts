import express from 'express';
import morgan from 'morgan';
import db from './modules/db';
import { nanoid } from 'nanoid';
export const genId = () => nanoid(16);

// const seedDatabase = async () => {
//   if ((await db.submission.count()) === 0) {
//     await db.submission.createMany({
//       data: [
//         {
//           id: genId(),
//           submittedAt: new Date(),
//           data: {
//             name: 'Kevin Wade',
//             twitter: 'kevinwwwade',
//           },
//         },
//       ],
//     });
//   }
// };
// seedDatabase();

const app = express();
app.use(morgan('dev')); // logger

app.get('/', async (req, res) => {
  const submissions = await db.submission.findMany();
  res.json(submissions);
});

const port = Number(process.env.PORT ?? 8080);
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});
