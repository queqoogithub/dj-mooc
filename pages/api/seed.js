import nc from 'next-connect';
import Course from '../../models/Course';
import db from '../../utils/db';
import data from '../../utils/data';
import User from '../../models/User';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Course.deleteMany();
  await Course.insertMany(data.courses);
  await db.disconnect();
  res.send({ message: 'seeded successfully' });
});

export default handler;