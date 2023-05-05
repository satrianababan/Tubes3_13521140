-- MariaDB dump 10.19  Distrib 10.6.12-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: tubes_stima
-- ------------------------------------------------------
-- Server version	10.6.12-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `history`
--

DROP TABLE IF EXISTS `history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `type` varchar(4) NOT NULL,
  `chat` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history`
--

LOCK TABLES `history` WRITE;
/*!40000 ALTER TABLE `history` DISABLE KEYS */;
INSERT INTO `history` VALUES (0,'bot','INISIALISASI'),(0,'me','hapus pertanyaan siapa presiden Indonesia?'),(0,'bot','Pertanyaan tidak ditemukan!'),(0,'me','Hari apa pada tanggal 5/5/2023'),(0,'bot','Hari Jumat'),(0,'me','Hari apa pada tanggal 5/5/2023'),(0,'bot','Hari Jumat'),(0,'me','Tambahkan pertanyaan kucing makan apa dengan jawaban wiskaz'),(0,'bot','Pertanyaan kucing makan apa telah ditambahkan...'),(0,'me','Tambahkan pertanyaan kucing makan apa dengan jawaban tulang'),(0,'bot','Pertanyaan kucing makan apa sudah ada! Jawaban di-update ke tulang'),(0,'me','berapa hasil dari 2*4+5'),(0,'bot','Hasilnya adalah 13'),(0,'me','Tambahkan pertanyaan sekarang makan apa dengan jawaban sekarang makan pecel'),(0,'bot','Pertanyaan sekarang makan apa telah ditambahkan...'),(0,'me','Tambahkan pertanyaan ibukota indonesia dengan jawaban indonesia'),(0,'bot','Pertanyaan ibukota indonesia telah ditambahkan...'),(0,'me','aa'),(0,'bot','tulang'),(0,'me','1'),(0,'bot','Mungkin maksud Anda:\nkucing makan apa\nsekarang makan apa\nibukota indonesia'),(0,'me','coba'),(0,'bot','tulang'),(0,'me','coba'),(0,'bot','tulang'),(0,'me','1'),(0,'bot','Mungkin maksud Anda:\nkucing makan apa\nsekarang makan apa\nibukota indonesia'),(0,'me','ibukota indonesia'),(0,'bot','indonesia'),(0,'me','1'),(0,'bot','Mungkin maksud Anda:\nkucing makan apa\nsekarang makan apa\nibukota indonesia'),(0,'me','sekarang makan apa'),(0,'bot','sekarang makan pecel'),(0,'me','1'),(0,'bot','Mungkin maksud Anda:\nkucing makan apa\nsekarang makan apa\nibukota indonesia'),(0,'me','Hapus pertanyaan ibukota indonesia'),(0,'bot','Pertanyaan ibukota indonesia telah dihapus!'),(0,'me','sekarang makan apa'),(0,'bot','sekarang makan pecel'),(0,'me','2'),(0,'bot','tulang'),(0,'me','2'),(0,'bot','tulang'),(0,'me','2'),(0,'bot','tulang'),(0,'me','a'),(0,'bot','tulang'),(0,'me','1'),(0,'bot','Mungkin maksud Anda:\nkucing makan apa\nsekarang makan apa\n'),(0,'me','kucing makan apa'),(0,'bot','tulang'),(0,'me','1'),(0,'bot','Mungkin maksud Anda:\nkucing makan apa\nsekarang makan apa\n'),(0,'me','2'),(0,'bot','tulang'),(0,'me','2'),(0,'bot','tulang'),(0,'me','1'),(0,'bot','Mungkin maksud Anda:\nkucing makan apa\nsekarang makan apa\n'),(0,'me','1'),(0,'bot','Mungkin maksud Anda:\nkucing makan apa\nsekarang makan apa\n'),(0,'me','2'),(0,'bot','tulang'),(0,'me','3'),(0,'bot','tulang'),(0,'me','1'),(0,'bot','Mungkin maksud Anda:\nkucing makan apa\nsekarang makan apa\n'),(0,'me','2'),(0,'bot','tulang'),(0,'me','3'),(0,'bot','tulang'),(0,'me','1'),(0,'bot','Mungkin maksud Anda:\nkucing makan apa\nsekarang makan apa\n'),(0,'me','4'),(0,'bot','tulang'),(0,'me','2'),(0,'bot','tulang'),(0,'me','5'),(0,'bot','tulang'),(0,'me','3'),(0,'bot','tulang'),(0,'me','4'),(0,'bot','tulang'),(0,'me','Tambahkan pertanyaan makan apa hari ini dengan jawaban gudeg'),(0,'bot','Pertanyaan makan apa hari ini telah ditambahkan...'),(0,'me','mantaap'),(0,'bot','Mungkin maksud Anda:\nsekarang makan apa\nmakan apa hari ini\nkucing makan apa'),(0,'me','kucing makan apa'),(0,'bot','tulang'),(1,'bot','Hai, ada yang bisa saya bantu? :)'),(1,'me','tes'),(1,'bot','Mungkin maksud Anda:\nsekarang makan apa\nkucing makan apa\nmakan apa hari ini'),(1,'me','tambahkan pertanyaan satu ditambah satu dengan jawaban 3'),(1,'bot','Pertanyaan satu ditambah satu telah ditambahkan...'),(2,'bot','Hai, ada yang bisa saya bantu? :)'),(2,'me','makan apa hari ini'),(2,'bot','gudeg'),(3,'bot','Hai, ada yang bisa saya bantu? :)'),(3,'me','makan apa hari ini'),(3,'bot','gudeg'),(3,'me','makan apa hari ini'),(3,'bot','gudeg'),(4,'bot','Hai, ada yang bisa saya bantu? :)'),(4,'me','makan apa hari ini'),(4,'bot','gudeg'),(4,'me','Hapus pertanyaan makan apa hari ini'),(4,'bot','Pertanyaan makan apa hari ini telah dihapus!'),(4,'me','makan hari ini'),(4,'bot','sekarang makan pecel'),(4,'me','hari ini '),(4,'bot','sekarang makan pecel'),(4,'me','anjing makan apa'),(4,'bot','tulang'),(4,'me','elang makan apa'),(4,'bot','sekarang makan pecel'),(4,'me','dua tambah dua'),(4,'bot','3'),(5,'bot','Hai, ada yang bisa saya bantu? :)'),(5,'me','dua tambah dua'),(5,'bot','Mungkin maksud Anda:\nsatu ditambah satu\nkucing makan apa\nsekarang makan apa'),(5,'me','dua tambah dua'),(5,'bot','Mungkin maksud Anda:\nsatu ditambah satu\nkucing makan apa\nsekarang makan apa'),(6,'bot','Hai, ada yang bisa saya bantu? :)'),(6,'me','Hapus pertanyaan kucing makan apa'),(6,'bot','Pertanyaan kucing makan apa telah dihapus!'),(6,'me','dua tambah dua'),(6,'bot','Mungkin maksud Anda:\nsatu ditambah satu\nsekarang makan apa'),(7,'bot','Hai, ada yang bisa saya bantu? :)'),(7,'me','dua tambah dua'),(7,'bot','3'),(8,'bot','Hai, ada yang bisa saya bantu? :)'),(8,'me','makan apa?'),(8,'bot','Mungkin maksud Anda:\nsekarang makan apa\nsatu ditambah satu'),(8,'me','sekarang makanapa?'),(8,'bot','Mungkin maksud Anda:\nsekarang makan apa\nsatu ditambah satu'),(8,'me','sekarang makan apa?'),(8,'bot','sekarang makan pecel'),(8,'me','hapus pertanyaan siapa walikota Bandung?'),(8,'bot','Pertanyaan tidak ditemukan!'),(8,'me','tambahkan pertanyaan sekarang makan apa dengan jawaban nasi kuning'),(8,'bot','Pertanyaan sekarang makan apa sudah ada! Jawaban di-update ke nasi kuning'),(8,'me','Tambahkan pertanyaan apa ibu kota indonesia dengan jawaban jakarta'),(8,'bot','Pertanyaan apa ibu kota indonesia telah ditambahkan...'),(8,'me','tambahkan pertanyaan matkul wajib terseru semester empat dengan jawaban stima'),(8,'bot','Pertanyaan matkul wajib terseru semester empat telah ditambahkan...'),(8,'me','tambahkan pertanyaan tubes/tucil terseru stima dengan jawaban tubes 3'),(8,'bot','Pertanyaan tubes/tucil terseru stima telah ditambahkan...'),(8,'me','tambahkan pertanyaan asisten terbaik dengan jawaban kak ziyad'),(8,'bot','Pertanyaan asisten terbaik telah ditambahkan...');
/*!40000 ALTER TABLE `history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `question` (
  `pertanyaan` text NOT NULL,
  `jawaban` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES ('sekarang makan apa','nasi kuning'),('satu ditambah satu','3'),('apa ibu kota indonesia','jakarta'),('matkul wajib terseru semester empat','stima'),('tubes/tucil terseru stima','tubes 3'),('asisten terbaik','kak ziyad');
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-05 23:46:55
