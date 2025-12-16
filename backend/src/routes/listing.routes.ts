import { Router } from 'express';
import { Listing } from '../models/Listing';
import { authRequired, requireRole, AuthRequest } from '../middleware/auth.middleware';

const router = Router();

// Listar alojamientos públicos
router.get('/', async (_req, res) => {
  const listings = await Listing.find().populate('host', 'name');
  res.json(listings);
});

// Obtener un alojamiento por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate('host', 'name');
    
    if (!listing) {
      return res.status(404).json({ message: 'Alojamiento no encontrado' });
    }
    
    res.json(listing);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener el alojamiento' });
  }
});

// Crear alojamiento (host o admin)
router.post(
  '/',
  authRequired,
  requireRole(['host', 'admin']),
  async (req: AuthRequest, res) => {
    try {
      const { title, description, address, pricePerNight, images } = req.body;
      const hostId = req.user!.id;

      const listing = await Listing.create({
        title,
        description,
        address,
        pricePerNight,
        images,
        host: hostId,
      });

      res.status(201).json(listing);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creando alojamiento' });
    }
  }
);

// Actualizar alojamiento
router.put(
  '/:id',
  authRequired,
  requireRole(['host', 'admin']),
  async (req: AuthRequest, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      const listing = await Listing.findByIdAndUpdate(id, updates, {
        new: true,
      });

      if (!listing) {
        return res.status(404).json({ message: 'Alojamiento no encontrado' });
      }

      res.json(listing);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error actualizando alojamiento' });
    }
  }
);

// Eliminar alojamiento
router.delete(
  '/:id',
  authRequired,
  requireRole(['host', 'admin']),
  async (req, res) => {
    try {
      const { id } = req.params;
      const listing = await Listing.findByIdAndDelete(id);
      
      if (!listing) {
        return res.status(404).json({ message: 'Alojamiento no encontrado' });
      }

      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error eliminando alojamiento' });
    }
  }
);

export default router;
