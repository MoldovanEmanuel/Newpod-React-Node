import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  name: string;
  display_name: string;
  label: string;
  location: string;
  email: string;
  phone: string;
  rating: number;
  text: string;
  owner_reply: string;
  status: 'pending' | 'approved';
  featured: boolean;
  date_submitted: string;
  date_approved: string | null;
}

const ReviewSchema = new Schema<IReview>(
  {
    name:           { type: String, required: true },
    display_name:   { type: String, required: true },
    label:          { type: String, default: '' },
    location:       { type: String, required: true },
    email:          { type: String, default: '' },
    phone:          { type: String, default: '' },
    rating:         { type: Number, min: 1, max: 5, required: true },
    text:           { type: String, required: true },
    owner_reply:    { type: String, default: '' },
    status:         { type: String, enum: ['pending', 'approved'], default: 'pending' },
    featured:       { type: Boolean, default: false },
    date_submitted: { type: String, required: true },
    date_approved:  { type: String, default: null },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export default mongoose.model<IReview>('Review', ReviewSchema);
