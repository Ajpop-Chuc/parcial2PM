import sinon from 'sinon';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

chai.use(chaiHttp);

describe('Producto Controller', async () => {
  const app = (await import('../src/server.js')).default;
  const productoController = (await import('../src/controllers/productoController.js')).default;
  const ProductoFactory = (await import('../src/models/productoModel.js')).default;

  let req, res, next;

  beforeEach(() => {
    req = {
      body: {},
      params: {}
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
      send: sinon.stub().returnsThis()
    };
    next = sinon.spy();
  });

  // Test para el método "crearProducto"
  describe('crearProducto', () => {
    it('debería crear un producto correctamente', async () => {
      const mockProducto = { id: 1, nombre: 'Producto Test' };

      const stubCrearProducto = sinon.stub(ProductoFactory, 'crearProducto').resolves(mockProducto);
      req.body = { nombre: 'Producto Test', descripcion: 'Desc Test' };

      await productoController.crearProducto(req, res, next);

      expect(stubCrearProducto.calledOnce).to.be.true;
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith({ producto: mockProducto, mensaje: 'Producto creado exitosamente' })).to.be.true;

      stubCrearProducto.restore();
    });

    it('debería manejar errores al crear un producto', async () => {
      const stubCrearProducto = sinon.stub(ProductoFactory, 'crearProducto').rejects(new Error('Error de base de datos'));
      
      await productoController.crearProducto(req, res, next);
      
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ mensaje: 'Error al crear el producto' })).to.be.true;
      
      stubCrearProducto.restore();
    });
  });

  // Test para el método "obtenerProducto"
  describe('obtenerProducto', () => {
    it('debería obtener un producto correctamente', async () => {
      const mockProducto = { id: 1, nombre: 'Producto Test' };
      const stubObtenerProducto = sinon.stub(ProductoFactory, 'obtenerProducto').resolves(mockProducto);
      req.params.id = 1;

      await productoController.obtenerProducto(req, res, next);

      expect(stubObtenerProducto.calledOnce).to.be.true;
      expect(res.json.calledWith(mockProducto)).to.be.true;

      stubObtenerProducto.restore();
    });

    it('debería manejar producto no encontrado', async () => {
      const stubObtenerProducto = sinon.stub(ProductoFactory, 'obtenerProducto').resolves(null);
      req.params.id = 999;

      await productoController.obtenerProducto(req, res, next);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ mensaje: 'Producto no encontrado' })).to.be.true;

      stubObtenerProducto.restore();
    });
  });

  // Test para el método "actualizarProducto"
  describe('actualizarProducto', () => {
    it('debería actualizar un producto correctamente', async () => {
      const mockProducto = { id: 1, nombre: 'Producto Actualizado' };
      const stubActualizarProducto = sinon.stub(ProductoFactory, 'actualizarProducto').resolves(mockProducto);
      req.params.id = 1;
      req.body = { nombre: 'Producto Actualizado' };

      await productoController.actualizarProducto(req, res, next);

      expect(stubActualizarProducto.calledOnce).to.be.true;
      expect(res.json.calledWith({ producto: mockProducto, mensaje: 'Producto actualizado exitosamente' })).to.be.true;

      stubActualizarProducto.restore();
    });

    it('debería manejar errores al actualizar un producto', async () => {
      const stubActualizarProducto = sinon.stub(ProductoFactory, 'actualizarProducto').rejects(new Error('Error de base de datos'));
      
      await productoController.actualizarProducto(req, res, next);
      
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ mensaje: 'Error al actualizar el producto' })).to.be.true;
      
      stubActualizarProducto.restore();
    });
  });

  // Test para el método "eliminarProducto"
  describe('eliminarProducto', () => {
    it('debería eliminar un producto correctamente', async () => {
      const stubEliminarProducto = sinon.stub(ProductoFactory, 'eliminarProducto').resolves();
      req.params.id = 1;

      await productoController.eliminarProducto(req, res, next);

      expect(stubEliminarProducto.calledOnce).to.be.true;
      expect(res.json.calledWith({ mensaje: 'Producto eliminado exitosamente' })).to.be.true;

      stubEliminarProducto.restore();
    });

    it('debería manejar errores al eliminar un producto', async () => {
      const stubEliminarProducto = sinon.stub(ProductoFactory, 'eliminarProducto').rejects(new Error('Error de base de datos'));
      
      await productoController.eliminarProducto(req, res, next);
      
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ mensaje: 'Error al eliminar el producto' })).to.be.true;
      
      stubEliminarProducto.restore();
    });
  });

  // Test para el método "listarProductos"
  describe('listarProductos', () => {
    it('debería listar todos los productos correctamente', async () => {
      const mockProductos = [{ id: 1, nombre: 'Producto 1' }, { id: 2, nombre: 'Producto 2' }];
      const stubListarProductos = sinon.stub(ProductoFactory, 'listarProductos').resolves(mockProductos);

      await productoController.listarProductos(req, res, next);

      expect(stubListarProductos.calledOnce).to.be.true;
      expect(res.json.calledWith(mockProductos)).to.be.true;

      stubListarProductos.restore();
    });

    it('debería manejar errores al listar los productos', async () => {
      const stubListarProductos = sinon.stub(ProductoFactory, 'listarProductos').rejects(new Error('Error de base de datos'));
      
      await productoController.listarProductos(req, res, next);
      
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ mensaje: 'Error al listar los productos' })).to.be.true;
      
      stubListarProductos.restore();
    });
  });
});
