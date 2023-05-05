# Tubes3_13521140
Tugas Besar 3 IF2211 Strategi Algoritma
Disusun oleh:
- Ryan Samuel Candra 13521140
- Sulthan Dzaky Alfaro 13521159
- Satria Octavianus Nababan 13521168
<br>
Dalam dunia teknologi, chatbot telah menjadi hal yang umum digunakan dalam berbagai aplikasi dan platform seperti situs web, aplikasi mobile, dan media sosial. Chatbot memungkinkan pengguna untuk berinteraksi dengan program yang memiliki kemampuan untuk memproses dan merespons percakapan secara otomatis. Salah satu contoh chatbot yang sedang booming saat ini adalah ChatGPT.
Pembangunan chatbot dapat dilakukan dengan menggunakan berbagai pendekatan dari bidang Question Answering (QA). Pendekatan QA yang paling sederhana adalah menyimpan sejumlah pasangan pertanyaan dan jawaban, menentukan pertanyaan yang paling mirip dengan pertanyaan yang diberikan pengguna, dan memberikan jawabannya kepada pengguna. Untuk mencocokkan input pengguna dengan pertanyaan yang disimpan pada database, kalian bisa menggunakan string matching.
String matching adalah teknik untuk mencocokkan suatu string atau pola dengan string lainnya, dengan tujuan untuk menentukan apakah kedua string tersebut cocok atau tidak. Teknik ini biasanya digunakan dalam chatbot untuk mengenali kata-kata atau frasa tertentu yang dapat dipahami oleh program dan digunakan sebagai input untuk menentukan respons yang sesuai. Sementara itu, regular expression adalah kumpulan aturan atau pola yang digunakan untuk pencocokan string dengan format yang spesifik. Teknik ini sering digunakan dalam chatbot untuk mengenali dan memproses input pengguna yang memiliki format tertentu, seperti nomor telepon, alamat email, atau kode pos.
<br>

## Cara Penggunaan Program

<br>
Program ini menggunakan backend dengan bahasa Node.js dan frontend dengan bahasa React.js, sehingga untuk menggunakan program dibutuhkan instalasi terhadap beberapa hal berikut :
a.	Code writer seperti VSCode, yang mana di dalamnya dilakukan instalasi extentsion untuk melakukan run dan debug terhadap bahasa Node.js dan React.js.
b.	Program ini memerlukan MySQL sebagai database untuk mengolah data.

Setelah melakukan set up dan instalasi terhadap kebutuhan program, maka selanjutnya dapat melakukan langkah-langkah berikut ini:
1.	Melakukan clone terhadap repository program ini, pranala dapat dilihat pada bagian LAMPIRAN.
2.	Create database baru pada MySQL, kemudian load fail “pertanyaan.sql” yang ada pada folder “data” di repository, ke database baru tersebut.
3.	Ubah bagian “…” pada fail “DatabaseAccess.js” sehingga sesuai dengan MySQL lokal yang sebelumnya ditambahkan database baru.

 
Gambar 4.2.1  Bagian DatabaseAccess.js yang Perlu Perubahan
(Sumber: Dokumentasi penulis)

4.	Ganti direktori ke tubes3 kemudian eksekusi perintah berikut pada terminal:
•	npm run start:frontend
•	npm run start:backend
5.	Pada frontend, pengguna dapat memberikan input yang terkait dengan persamaan matematika dan date. Hal ini dikarenakan frontend dari program yang kami buat belum dapat terkoneksi dengan baik terhadap database sehingga tidak dapat memberikan jawaban terhadap pertanyaan yang jawabannya harus diambil dari database.
6.	Untuk memberikan pertanyaan yang diharuskan berinteraksi dengan database, maka dapat dilakukan secara command line pada terminal. 
