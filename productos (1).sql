-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-09-2024 a las 20:57:41
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prueba_java`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `precio_publico` decimal(10,0) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `precio_costo` decimal(10,0) NOT NULL,
  `stock` int(11) DEFAULT NULL,
  `proveedor` varchar(255) DEFAULT NULL,
  `categoria` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `descripcion`, `precio_publico`, `nombre`, `precio_costo`, `stock`, `proveedor`, `categoria`) VALUES
(2, 'Descripción del Producto 2', '200', 'Producto 2', '100', 50, 'proveMil', 'cat1'),
(3, 'Descripción del Producto 1', '100', 'Producto 1', '50', 100, 'proveMil', 'cat1'),
(4, 'Descripción del Producto 2', '200', 'Producto 2', '100', 80, 'proveMil', 'cat1'),
(5, 'Descripción del Producto 1', '100', 'Producto 1', '10', 100, 'proveMil', 'cat1'),
(7, 'Descripción del Producto 1', '100', 'Producto 1', '50', 100, 'proveMil', 'cat1'),
(8, 'xxxx', '100', 'pruebaInsercionFron', '90', 350, 'proveMix', 'cat2');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
