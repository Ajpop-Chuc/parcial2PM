const db = require('../config/database');

class Producto {
  constructor(id, nombre, descripcion, precio_publico, precio_costo, stock, proveedor, categoria) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio_publico = precio_publico;
    this.precio_costo = precio_costo;
    this.stock = stock;
    this.proveedor = proveedor;
    this.categoria = categoria;
  }
}

class ProductoFactory {
  static async crearProducto(productoData) {
    const connection = await db.getConnection();
    try {
      const [result] = await connection.execute(
        'INSERT INTO productos (nombre, descripcion, precio_publico, precio_costo, stock, proveedor, categoria) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [productoData.nombre, productoData.descripcion, productoData.precio_publico, productoData.precio_costo, productoData.stock, productoData.proveedor, productoData.categoria]
      );
      return new Producto(result.insertId, productoData.nombre, productoData.descripcion, productoData.precio_publico, productoData.precio_costo, productoData.stock, productoData.proveedor, productoData.categoria);
    } finally {
      connection.release();
    }
  }

  static async obtenerProducto(id) {
    const connection = await db.getConnection();
    try {
      const [rows] = await connection.execute('SELECT * FROM productos WHERE id = ?', [id]);
      if (rows.length > 0) {
        const productoData = rows[0];
        return new Producto(
          productoData.id, 
          productoData.nombre, 
          productoData.descripcion, 
          productoData.precio_publico, 
          productoData.precio_costo, 
          productoData.stock, 
          productoData.proveedor, 
          productoData.categoria
        );
      }
      return null;
    } finally {
      connection.release();
    }
  }

  static async actualizarProducto(id, productoData) {
    const connection = await db.getConnection();
    try {
      await connection.execute(
        'UPDATE productos SET nombre = ?, descripcion = ?, precio_publico = ?, precio_costo = ?, stock = ?, proveedor = ?, categoria = ? WHERE id = ?',
        [productoData.nombre, productoData.descripcion, productoData.precio_publico, productoData.precio_costo, productoData.stock, productoData.proveedor, productoData.categoria, id]
      );
      return new Producto(id, productoData.nombre, productoData.descripcion, productoData.precio_publico, productoData.precio_costo, productoData.stock, productoData.proveedor, productoData.categoria);
    } finally {
      connection.release();
    }
  }

  static async eliminarProducto(id) {
    const connection = await db.getConnection();
    try {
      await connection.execute('DELETE FROM productos WHERE id = ?', [id]);
    } finally {
      connection.release();
    }
  }

  static async listarProductos() {
    const connection = await db.getConnection();
    try {
      const [rows] = await connection.execute('SELECT * FROM productos');
      return rows.map(row => new Producto(
        row.id, 
        row.nombre, 
        row.descripcion, 
        row.precio_publico, 
        row.precio_costo, 
        row.stock, 
        row.proveedor, 
        row.categoria
      ));
    } finally {
      connection.release();
    }
  }
}

module.exports = ProductoFactory;
