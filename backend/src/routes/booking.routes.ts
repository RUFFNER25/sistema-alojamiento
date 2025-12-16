import { Router } from 'express';
import { Booking } from '../models/Booking';
import { Listing } from '../models/Listing';
import { authRequired, AuthRequest } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authRequired, async (req: AuthRequest, res) => {
  const userId = req.user!.id;
  const bookings = await Booking.find({ user: userId }).populate('listing');
  res.json(bookings);
});

router.post('/', authRequired, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const { listingId, checkIn, checkOut } = req.body;

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: 'Alojamiento no encontrado' });
    }

    const nights =
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
      (1000 * 60 * 60 * 24);
    const totalPrice = nights * listing.pricePerNight;

    const booking = await Booking.create({
      listing: listingId,
      user: userId,
      checkIn,
      checkOut,
      totalPrice,
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creando reserva' });
  }
});

export default router;


