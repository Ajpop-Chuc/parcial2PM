const ProductoFactory = require('../models/productoModel');

exports.crearProducto = async (req, res) => {
  try {
    const nuevoProducto = await ProductoFactory.crearProducto(req.body);
    res.status(201).json({ producto: nuevoProducto, mensaje: 'Producto creado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el producto' });
  }
};

exports.obtenerProducto = async (req, res) => {
  try {
    const producto = await ProductoFactory.obtenerProducto(req.params.id);
    if (producto) {
      res.json(producto);
    } else {
      res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el producto' });
  }
};

exports.actualizarProducto = async (req, res) => {
  try {
    const productoActualizado = await ProductoFactory.actualizarProducto(req.params.id, req.body);
    res.json({ producto: productoActualizado, mensaje: 'Producto actualizado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el producto' });
  }
};

exports.eliminarProducto = async (req, res) => {
  try {
    await ProductoFactory.eliminarProducto(req.params.id);
    res.json({ mensaje: 'Producto eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el producto' });
  }
};

exports.listarProductos = async (req, res) => {
  try {
    const productos = await ProductoFactory.listarProductos();
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al listar los productos' });
  }
};