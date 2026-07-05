import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'atiendo_la_tienda_online';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tienda_db';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@tienda.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin12345';

app.use(cors());
app.use(express.json());

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, default: 'cliente' },
  telefono: { type: String, default: '' },
  direccion: { type: String, default: '' }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  descripcion: { type: String, required: true },
  imagen: { type: String, required: true }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

const orderSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ nombre: String, precio: Number, cantidad: Number, imagen: String }],
  total: { type: Number, required: true },
  direccion: { type: String, default: '' },
  telefono: { type: String, default: '' },
  estado: { type: String, default: 'Pendiente' }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

const verificarToken = (req, res, next) => {
  const tokenHeader = req.headers['authorization'];
  if (!tokenHeader) return res.status(401).json({ mensaje: 'Acceso denegado.' });

  const token = tokenHeader.split(' ')[1];
  try {
    const verificado = jwt.verify(token, JWT_SECRET);
    req.usuario = verificado;
    next();
  } catch {
    res.status(400).json({ mensaje: 'Token inválido.' });
  }
};

const crearAdminInicial = async () => {
  const existe = await User.findOne({ email: ADMIN_EMAIL });
  if (!existe) {
    const passwordHaseado = await bcrypt.hash(ADMIN_PASSWORD, 10);
    await new User({
      name: 'Administrador Principal',
      email: ADMIN_EMAIL,
      password: passwordHaseado,
      rol: 'admin',
      telefono: '3000000000',
      direccion: 'Bogotá'
    }).save();
  }
};

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('🟢 Conectado exitosamente a MongoDB');
    await crearAdminInicial();
  })
  .catch(err => console.error('🔴 Error de conexión a MongoDB:', err));

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, telefono, direccion } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ mensaje: 'Faltan datos obligatorios.' });
    }

    const existe = await User.findOne({ email });
    if (existe) return res.status(400).json({ mensaje: 'Ya existe un usuario con ese correo.' });

    const passwordHaseado = await bcrypt.hash(password, 10);
    const nuevoCliente = new User({
      name,
      email,
      password: passwordHaseado,
      rol: 'cliente',
      telefono: telefono || '',
      direccion: direccion || ''
    });

    await nuevoCliente.save();
    res.status(201).json({ mensaje: 'Usuario registrado correctamente.', usuario: nuevoCliente });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuarioEncontrado = await User.findOne({ email });
    if (!usuarioEncontrado) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    const passwordValido = await bcrypt.compare(password, usuarioEncontrado.password);
    if (!passwordValido) return res.status(400).json({ mensaje: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: usuarioEncontrado._id, rol: usuarioEncontrado.rol }, JWT_SECRET, { expiresIn: '2h' });

    res.json({
      token,
      usuario: {
        id: usuarioEncontrado._id,
        name: usuarioEncontrado.name,
        email: usuarioEncontrado.email,
        rol: usuarioEncontrado.rol,
        telefono: usuarioEncontrado.telefono,
        direccion: usuarioEncontrado.direccion
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/create-admin', verificarToken, async (req, res) => {
  if (req.usuario.rol !== 'admin') return res.status(403).json({ mensaje: 'No autorizado.' });

  try {
    const { name, email, password, telefono, direccion } = req.body;
    const existe = await User.findOne({ email });
    if (existe) return res.status(400).json({ mensaje: 'Ya existe un usuario con ese correo.' });

    const passwordHaseado = await bcrypt.hash(password, 10);
    const nuevoAdmin = new User({
      name,
      email,
      password: passwordHaseado,
      rol: 'admin',
      telefono: telefono || '',
      direccion: direccion || ''
    });

    await nuevoAdmin.save();
    res.status(201).json({ mensaje: 'Administrador creado correctamente.', usuario: nuevoAdmin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/auth/perfil', verificarToken, async (req, res) => {
  try {
    const usuario = await User.findById(req.usuario.id).select('-password');
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/users', verificarToken, async (req, res) => {
  if (req.usuario.rol !== 'admin') return res.status(403).json({ mensaje: 'No autorizado.' });

  try {
    const usuarios = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const productos = await Product.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/products', verificarToken, async (req, res) => {
  if (req.usuario.rol !== 'admin') return res.status(403).json({ mensaje: 'No autorizado.' });
  const { nombre, precio, descripcion, imagen } = req.body;
  try {
    const nuevoProducto = new Product({ nombre, precio, descripcion, imagen });
    await nuevoProducto.save();
    res.status(201).json({ producto: nuevoProducto });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/products/:id', verificarToken, async (req, res) => {
  if (req.usuario.rol !== 'admin') return res.status(403).json({ mensaje: 'No autorizado.' });
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/orders', verificarToken, async (req, res) => {
  try {
    const { items, total, direccion, telefono } = req.body;
    const nuevoPedido = new Order({
      usuario: req.usuario.id,
      items,
      total,
      direccion: direccion || '',
      telefono: telefono || '',
      estado: 'Pendiente'
    });

    await nuevoPedido.save();
    res.status(201).json({ mensaje: 'Pedido creado correctamente.', pedido: nuevoPedido });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/orders/user', verificarToken, async (req, res) => {
  try {
    const pedidos = await Order.find({ usuario: req.usuario.id }).sort({ createdAt: -1 });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/orders', verificarToken, async (req, res) => {
  if (req.usuario.rol !== 'admin') return res.status(403).json({ mensaje: 'No autorizado.' });

  try {
    const pedidos = await Order.find().populate('usuario', 'name email telefono direccion').sort({ createdAt: -1 });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/orders/:id/status', verificarToken, async (req, res) => {
  if (req.usuario.rol !== 'admin') return res.status(403).json({ mensaje: 'No autorizado.' });

  try {
    const pedidoActualizado = await Order.findByIdAndUpdate(req.params.id, { estado: req.body.estado }, { new: true });
    res.json({ pedido: pedidoActualizado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`🚀 API escuchando en http://localhost:${PORT}`));