import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    courseName: { type: String, required: true },
    category: { type: String, required: true },
    section: { type: String, required: true },
    description: { type: String, required: true },
    approveStatus: { type: Boolean, required: false, default: false },
    playlist: { type: Array, required: false, default: false },
    assignment: { type: Array, required: false, default: false },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
export default Course;