import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IBooking extends Document {
  listing: Types.ObjectId;
  user: Types.ObjectId;
  checkIn: Date;
  checkOut: Date;
  totalPrice: number;
}

const BookingSchema = new Schema<IBooking>(
  {
    listing: { type: Schema.Types.ObjectId, ref: 'Listing', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Booking = mongoose.model<IBooking>('Booking', BookingSchema);
