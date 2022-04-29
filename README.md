# Penerapan String Matching dan Regular Expression dalam DNA Pattern Matching

## Description
Aplikasi DNA Pattern Matching adalah aplikasi berbasis web yang dibuat dengan bahasa Javascript sebagai *basenya*, menggunakan *framework* **Express** untuk backend dan **React** untuk frontend. DNA Pattern Matching memanfaatkan algoritma string matching **KMP** dan **Boyer-Moore** untuk menentukan apakah DNA Pasien memiliki kecocokan dengan DNA suatu penyakit. Sebelum dilakukan proses pencarian, *Sequence* DNA Pasien maupun *Sequence* DNA penyakit baru akan dilakukan validasi dengan mencocokan hasil masukan dengan **Regex**. Pada aplikasi tersebut, metode pencarian data berdasarkan tanggal dan nama penyakit juga memanfaatkan **Regex** dalam melakukan *filtering*.

## Technologies Used
- Database
  - MySQL (PlanetScale)
- Backend
  - Node js
  - Express
- Frontend
  - React
  - Sass
  - Framer Motion
- Deployment
  - Heroku (Backend)
  - Vercel (Frontend)

## Screenshot
![image](https://user-images.githubusercontent.com/69589003/165920758-cf735247-4356-4e11-9d6e-ed725c223fe3.png)

## Setup
- Use the deployed web application
  - [DNA Tester](https://dna-tester.vercel.app/)
- Use local version
  - Clone repository
  ```
  git clone https://github.com/jasonk19/Tubes3_13520079.git
  ```
  - Buka cloned repository
  - Checkout ke versi yang belum dideploy
  ```
  git checkout f28deb091dcefa3bdc9b4895db65947449a81561
  ```
  - Masukkan database **dna_pattern_matching.sql** ke local database
    - Membuat database baru di mysql local
    ```
    mysql -u 'username' -p
    create database dna_pattern_matching
    ```
    - Masukkan file ke .sql ke database
    ```
    mysql -u 'username' -p dna_pattern_matching < dna_pattern_matching.sql
    ```
  - Masuk ke folder backend
  - Ganti file **.env.example** ke **.env**
  - Isi SQL_PASS dengan password local MySQL Anda
  - Buka terminal pada directory backend dan jalankan perintah tersebut
  ```
  npm install
  // atau
  yarn
  // lalu
  npm server
  // atau
  yarn server
  ```
  - Pindah ke directory frontend
  - Buka terminal pada directory frontend dan jalankan perintah tersebut
  ```
  npm install
  // atau
  yarn
  // lalu
  npm start
  // atau
  yarn start
  ```
  - Aplikasi siap digunakan.

## Author
Nama | NIM
--- | ---
Ghebyon Tohada Nainggolan | 13520079
Jason Kanggara | 13520080
Nicholas Budiono | 13520121