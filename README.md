# Expense & Budget Visualizer

Aplikasi visualisasi pengeluaran dan anggaran dengan tema biru modern yang mendukung dark/light mode dan fitur-fitur lengkap untuk manajemen keuangan pribadi.

## Fitur Utama

### 🎨 Tampilan Modern
- **Tema Biru Modern**: Desain dengan warna biru sebagai warna utama
- **Dark/Light Mode**: Otomatis menyesuaikan dengan preferensi sistem pengguna
- **Responsif**: Tampilan optimal di semua device (desktop, tablet, mobile)
- **Animasi Smooth**: Transisi dan animasi yang halus

### 📊 Manajemen Transaksi
- **Tambah Transaksi**: Input transaksi dengan nama, jumlah, dan kategori
- **Hapus Transaksi**: Hapus transaksi yang tidak diperlukan
- **Sortir Transaksi**: Urutkan berdasarkan:
  - Tanggal (terbaru)
  - Jumlah (kecil ke besar)
  - Jumlah (besar ke kecil)
  - Kategori (A-Z)

### 📈 Visualisasi Data
- **Chart Pie Interaktif**: Visualisasi pengeluaran per kategori
- **Warna Kustom**: Setiap kategori memiliki warna khusus
- **Tooltip Detail**: Persentase dan nilai dalam tooltip

### 🏷️ Kategori Kustom
- **Tambah Kategori**: Buat kategori kustom dengan nama dan warna pilihan
- **Warna Kustom**: Pilih warna untuk setiap kategori
- **Kategori Default**: Food, Transport, Fun sudah tersedia

### ⚠️ Batas Pengeluaran
- **Batas Global**: Setel batas pengeluaran global
- **Batas per Kategori**: Setel batas khusus untuk setiap kategori
- **Highlight**: Transaksi yang melebihi batas akan ditandai dengan warna merah
- **Peringatan Visual**: Tampilan khusus untuk transaksi yang melebihi limit

### 🎛️ Kontrol Lanjutan
- **Filter Kategori**: Filter transaksi berdasarkan kategori
- **Toggle Tema**: Switch antara dark dan light mode
- **Modal Kategori**: Interface yang user-friendly untuk menambah kategori baru

## Teknologi yang Digunakan
- **HTML5**: Struktur halaman web
- **CSS3**: Styling dengan CSS Variables untuk tema
- **JavaScript**: Logika aplikasi dan interaksi
- **Chart.js**: Library untuk visualisasi chart
- **Font Awesome**: Ikon untuk UI
- **Local Storage**: Penyimpanan data di browser

## Cara Menggunakan

1. **Tambah Transaksi**:
   - Isi nama item
   - Masukkan jumlah
   - Pilih kategori
   - (Opsional) Setel batas untuk kategori
   - Klik "Add Transaction"

2. **Tambah Kategori Kustom**:
   - Klik tombol "+" di samping dropdown kategori
   - Masukkan nama kategori
   - Pilih warna
   - Klik "Save Category"

3. **Sortir Transaksi**:
   - Pilih opsi sortir dari dropdown "Sort Transactions"

4. **Filter Transaksi**:
   - Pilih kategori dari dropdown "Filter by Category"

5. **Setel Batas Pengeluaran**:
   - **Batas Global**: Masukkan jumlah di "Highlight Limit" dan klik "Apply"
   - **Batas Kategori**: Masukkan jumlah di "Spending Limit" saat menambah transaksi

6. **Toggle Tema**:
   - Klik tombol bulan/matahari di pojok kanan atas

## Struktur File
```
├── index.html          # File HTML utama
├── css/
│   └── style.css      # Stylesheet dengan tema biru modern
├── js/
│   └── script.js      # JavaScript dengan semua fitur
└── README.md          # Dokumentasi ini
```

## Fitur Responsif
- **Desktop**: Grid layout 2 kolom
- **Tablet**: Grid layout 1 kolom dengan penyesuaian
- **Mobile**: Layout vertikal dengan padding optimal
- **Touch-friendly**: Tombol dan input yang mudah disentuh

## Browser Support
Aplikasi ini kompatibel dengan:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Lisensi
Aplikasi ini dibuat untuk tujuan edukasi dan dapat digunakan secara bebas.

## Kontribusi
Jika menemukan bug atau memiliki saran fitur, silakan buat issue atau pull request.