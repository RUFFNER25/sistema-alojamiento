import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IListing extends Document {
  title: string;
  description: string;
  address: string;
  pricePerNight: number;
  host: Types.ObjectId;
  images: string[];
}

const ListingSchema = new Schema<IListing>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    host: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    images: [{ type: String }],
  },
  { timestamps: true }
);

export const Listing = mongoose.model<IListing>('Listing', ListingSchema);
