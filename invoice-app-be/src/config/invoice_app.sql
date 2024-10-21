-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 21 Okt 2024 pada 20.04
-- Versi server: 10.4.27-MariaDB
-- Versi PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `invoice_app`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `invoice`
--

CREATE TABLE `invoice` (
  `invoice_no` int(11) NOT NULL,
  `date` date NOT NULL,
  `customer` varchar(255) NOT NULL,
  `salesperson` varchar(255) NOT NULL,
  `payment_type` enum('cash','credit','other') NOT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `invoice`
--

INSERT INTO `invoice` (`invoice_no`, `date`, `customer`, `salesperson`, `payment_type`, `notes`, `created_at`) VALUES
(1, '2024-10-21', 'John', 'Doe', 'cash', 'Lorem ipsum', '2024-10-21 05:20:45'),
(2, '2024-10-15', 'John', 'Doe', 'cash', 'Lorem ipsum', '2024-10-21 04:23:16'),
(3, '2024-10-14', 'Jane', 'Doe', 'credit', 'Lorem ipsum', '2024-10-21 04:23:48'),
(4, '2024-10-13', 'Rock', 'Pete', 'other', 'Lorem ipsum', '2024-10-21 04:23:56'),
(5, '2024-10-20', 'Frank', '', 'cash', 'Lorem ipsum', '2024-10-21 04:27:45'),
(6, '2024-10-19', 'John', 'Doe', 'cash', 'Lorem ipsum', '2024-10-21 04:27:51'),
(7, '2024-10-18', 'Jeff', 'Pete', 'credit', 'Lorem ipsum', '2024-10-21 04:27:56'),
(8, '2024-10-17', 'John', 'Doe', 'cash', 'Lorem ipsum', '2024-10-21 04:28:01'),
(9, '2024-10-16', 'John', 'Doe', 'cash', 'Lorem ipsum', '2024-10-21 04:28:06'),
(10, '2024-10-13', 'Erick', 'B', 'other', 'Lorem ipsum', '2024-10-21 04:49:44'),
(11, '2024-10-12', 'Erick', 'B', 'other', 'Lorem ipsum', '2024-10-21 04:49:49'),
(12, '2024-10-11', 'Erick', 'B', 'other', 'Lorem ipsum', '2024-10-21 04:49:53'),
(13, '2024-10-10', 'Erick', 'B', 'other', 'Lorem ipsum', '2024-10-21 04:49:58'),
(14, '2024-10-09', 'Erick', 'B', 'other', 'Lorem ipsum', '2024-10-21 04:50:02'),
(15, '2024-10-08', 'Erick', 'B', 'other', 'Lorem ipsum', '2024-10-21 04:50:05'),
(16, '2024-10-07', 'Erick', 'B', 'other', 'Lorem ipsum', '2024-10-21 04:50:10'),
(17, '2024-10-06', 'Erick', 'B', 'other', 'Lorem ipsum', '2024-10-21 04:50:14'),
(18, '2024-10-05', 'Erick', 'B', 'other', 'Lorem ipsum', '2024-10-21 04:50:17'),
(19, '2024-10-04', 'Erick', 'B', 'other', 'Lorem ipsum', '2024-10-21 04:50:19'),
(20, '2024-10-03', 'Erick', 'B', 'other', 'Lorem ipsum', '2024-10-21 04:50:22'),
(21, '2024-10-02', 'Erick', 'B', 'other', 'Lorem ipsum', '2024-10-21 04:50:25'),
(22, '2024-10-01', 'Erick', 'B', 'other', 'Lorem ipsum', '2024-10-21 04:50:29'),
(23, '2024-09-30', 'Erick', 'B', 'other', 'Lorem ipsum', '2024-10-21 04:50:37'),
(24, '2024-09-23', 'Erick', 'B', 'other', 'Lorem ipsum', '2024-10-21 04:50:48'),
(25, '2024-09-16', 'Erick', 'B', 'other', 'Lorem ipsum', '2024-10-21 04:50:54');

-- --------------------------------------------------------

--
-- Struktur dari tabel `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_picture` varchar(255) NOT NULL,
  `stock` int(11) NOT NULL,
  `cogs` decimal(10,2) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `product_picture`, `stock`, `cogs`, `price`) VALUES
(1, 'Bluetooth speaker', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkzm330_QXVLpQJnT6jKW3ixSYYI9Vka9t6Q&s', 3, '210000.00', '252000.00'),
(2, 'Headphone', 'https://cworld.id/wp-content/uploads/2023/07/JETE-13-PRO-3.jpg', 3, '50000.00', '60000.00'),
(3, 'Laptop charger', 'https://www.tpstech.in/cdn/shop/products/HP_Y5Y43AA_65W_4.5mm_Adapter_Original_from_The_Peripheral_Store_TPS_Tech_Free_Delivery_1.jpg?v=1705657187&width=1445', 1, '200000.00', '240000.00'),
(4, 'LCD Monitor', 'https://image.made-in-china.com/2f0j00wzukCnqgAEbo/18-5-21-5-24-Inch-LCD-Monitor-FHD-Display-IPS-Panel-VGA-HDMI-Dp-Input-OEM-Wholesale.webp', 19, '500000.00', '600000.00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `product_sold`
--

CREATE TABLE `product_sold` (
  `invoice_no` int(11) NOT NULL,
  `item` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total_cogs` decimal(10,2) DEFAULT NULL,
  `total_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `product_sold`
--

INSERT INTO `product_sold` (`invoice_no`, `item`, `quantity`, `total_cogs`, `total_price`) VALUES
(1, 'Bluetooth speaker', 3, '630000.00', '756000.00'),
(1, 'Headphone', 8, '400000.00', '480000.00'),
(2, 'Laptop charger', 4, '800000.00', '960000.00'),
(3, 'LCD Monitor', 1, '500000.00', '600000.00'),
(7, 'Bluetooth speaker', 2, '420000.00', '504000.00'),
(4, 'Headphone', 1, '50000.00', '60000.00'),
(5, 'Laptop charger', 3, '600000.00', '720000.00'),
(3, 'Bluetooth speaker', 1, '210000.00', '252000.00'),
(6, 'Bluetooth speaker', 1, '210000.00', '252000.00'),
(6, 'Headphone', 2, NULL, '120000.00'),
(8, 'Bluetooth speaker', 3, '630000.00', '756000.00'),
(8, 'Headphone', 8, '400000.00', '480000.00'),
(9, 'Bluetooth speaker', 3, '630000.00', '756000.00'),
(9, 'Headphone', 8, '400000.00', '480000.00'),
(10, 'Bluetooth speaker', 3, '630000.00', '756000.00'),
(10, 'Headphone', 4, '200000.00', '240000.00'),
(22, 'Bluetooth speaker', 3, '630000.00', '756000.00'),
(22, 'Headphone', 4, '200000.00', '240000.00'),
(24, 'Bluetooth speaker', 3, '630000.00', '756000.00'),
(24, 'Headphone', 4, '200000.00', '240000.00'),
(25, 'Bluetooth speaker', 3, '630000.00', '756000.00'),
(25, 'Headphone', 4, '200000.00', '240000.00');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`invoice_no`);

--
-- Indeks untuk tabel `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indeks untuk tabel `product_sold`
--
ALTER TABLE `product_sold`
  ADD KEY `invoice_no` (`invoice_no`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `invoice`
--
ALTER TABLE `invoice`
  MODIFY `invoice_no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT untuk tabel `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `product_sold`
--
ALTER TABLE `product_sold`
  ADD CONSTRAINT `product_sold_ibfk_1` FOREIGN KEY (`invoice_no`) REFERENCES `invoice` (`invoice_no`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
