import React, { useState, useEffect } from 'react';
import { Badge, Button, Card, Form, Container, Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';

function ProductManagement() {
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    precio_publico: '',
    precio_costo: '',
    stock: '',
    proveedor: '',
    categoria: ''
  });
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    listarProductos();
  }, []);

  const listarProductos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/productos');
      setProductos(response.data);
    } catch (error) {
      console.error('Error al listar productos:', error);
    }
  };

  const handleInputChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await axios.put(`http://localhost:3000/api/productos/${producto._id}`, producto);
      } else {
        await axios.post('http://localhost:3000/api/productos', producto);
      }
      listarProductos();
      resetForm();
    } catch (error) {
      console.error('Error al guardar producto:', error);
    }
  };

  const editarProducto = (prod) => {
    setProducto({
      ...prod,
      precio_publico: prod.precio_publico,
      precio_costo: prod.precio_costo
    });
    setEditando(true);
  };

  const eliminarProducto = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await axios.delete(`http://localhost:3000/api/productos/${id}`);
        listarProductos();
      } catch (error) {
        console.error('Error al eliminar producto:', error);
      }
    }
  };

  const resetForm = () => {
    setProducto({
      nombre: '',
      descripcion: '',
      precio_publico: '',
      precio_costo: '',
      stock: '',
      proveedor: '',
      categoria: ''
    });
    setEditando(false);
  };

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Gestión de Producto</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md="6">
                    <Form.Group>
                      <label>Nombre del Producto</label>
                      <Form.Control
                        name="nombre"
                        value={producto.nombre}
                        onChange={handleInputChange}
                        placeholder="Nombre del producto"
                        type="text"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group>
                      <label>Descripción</label>
                      <Form.Control
                        name="descripcion"
                        value={producto.descripcion}
                        onChange={handleInputChange}
                        placeholder="Descripción del producto"
                        type="text"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <Form.Group>
                      <label>Precio Público</label>
                      <Form.Control
                        name="precio_publico"
                        value={producto.precio_publico}
                        onChange={handleInputChange}
                        placeholder="Precio al público"
                        type="number"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group>
                      <label>Precio de Costo</label>
                      <Form.Control
                        name="precio_costo"
                        value={producto.precio_costo}
                        onChange={handleInputChange}
                        placeholder="Precio de costo"
                        type="number"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <Form.Group>
                      <label>Stock</label>
                      <Form.Control
                        name="stock"
                        value={producto.stock}
                        onChange={handleInputChange}
                        placeholder="Cantidad en stock"
                        type="number"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group>
                      <label>Proveedor</label>
                      <Form.Control
                        name="proveedor"
                        value={producto.proveedor}
                        onChange={handleInputChange}
                        placeholder="Proveedor"
                        type="text"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group>
                      <label>Categoría</label>
                      <Form.Control
                        name="categoria"
                        value={producto.categoria}
                        onChange={handleInputChange}
                        placeholder="Categoría"
                        type="text"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button
                  type="submit"
                  variant="info"
                >
                  {editando ? 'Actualizar Producto' : 'Guardar Producto'}
                </Button>

                {editando && (
                  <Button
                    onClick={resetForm}
                    variant="danger"
                  >
                    Cancelar
                  </Button>
                )}
                <div className="clearfix"></div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card className="card-product">
            <Card.Body>
              <h5 className="title">Lista de Productos</h5>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Precio Público</th>
                    <th>Precio Costo</th>
                    <th>Stock</th>
                    <th>Proveedor</th>
                    <th>Categoría</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((prod) => (
                    <tr key={prod._id}>
                      <td>{prod.nombre}</td>
                      <td>{prod.descripcion}</td>
                      <td>{prod.precio_publico}</td>
                      <td>{prod.precio_costo}</td>
                      <td>{prod.stock}</td>
                      <td>{prod.proveedor}</td>
                      <td>{prod.categoria}</td>
                      <td>
                        <Button
                          variant="info"
                          size="sm"
                          onClick={() => editarProducto(prod)}
                        >
                          Editar
                        </Button>{' '}
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => eliminarProducto(prod.id)}
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductManagement;