import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { User } from '../src/models/User';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  console.error('Falta la variable de entorno MONGODB_URI');
  process.exit(1);
}

async function createAdmin() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Conectado a MongoDB Atlas');

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email: 'admin' });
    if (existingUser) {
      console.log('El usuario admin ya existe. Actualizando contraseña...');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      existingUser.password = hashedPassword;
      existingUser.role = 'admin';
      await existingUser.save();
      console.log('✅ Usuario admin actualizado exitosamente');
      console.log('Email: admin');
      console.log('Password: admin123');
      console.log('Rol: admin');
      await mongoose.disconnect();
      return;
    }

    // Crear el usuario admin
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await User.create({
      name: 'Administrador',
      email: 'admin',
      password: hashedPassword,
      role: 'admin'
    });

    console.log('✅ Usuario admin creado exitosamente');
    console.log('Email: admin');
    console.log('Password: admin123');
    console.log('Rol: admin');
    console.log('ID:', adminUser._id);

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error creando usuario admin:', error);
    process.exit(1);
  }
}

createAdmin();

