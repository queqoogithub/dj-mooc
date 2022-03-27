import nc from 'next-connect';
import Course from '../../../models/Course';
import { isAuth } from '../../../utils/auth';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
  onError,
});
handler.use(isAuth);

handler.post(async (req, res) => {
  await db.connect();
  const newCourse = new Course({
    ...req.body,
    user: req.user._id,
  });
  const course = await newCourse.save();
  res.status(201).send(course);
});

export default handler;