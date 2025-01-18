import mongoose from 'mongoose';

const IncidentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Incident title
    description: { type: String, required: true }, // Incident description
    image: { type: String, default: null }, // Optional incident image
    user: {
      id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // User ID reference
      name: { type: String, required: true }, // User name
      image: { type: String, default: null }, // Optional user profile picture
    },
    status: {
      type: String,
      enum: ['Raised', 'Resolved', 'In Progress'],
      default: 'Raised',
    }, // Incident status
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of users who liked
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of users who upvoted
    comments: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Ref to user who commented
        text: { type: String, required: true }, // Comment text
        createdAt: { type: Date, default: Date.now }, // Comment creation date
      },
    ],
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

export default mongoose.models.Incident || mongoose.model('Incident', IncidentSchema);
