// app/models/Incident.ts
import mongoose, { Schema, model, models } from 'mongoose';

const IncidentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      profilePicture: {
        type: String,
      },
    },
    media: {
      type: String, // URL for images/videos
    },
    upvotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [
      {
        user: {
          id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          profilePicture: {
            type: String,
          },
        },
        text: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    status: {
      type: String,
      enum: ['Raised', 'In-Progress', 'Resolved', 'Informative'],
      default: 'Raised',
    },
  },
  { timestamps: true }
);

const Incident = models.Incident || model('Incident', IncidentSchema);

export default Incident;
