document.addEventListener('alpine:init', () => {
  Alpine.data('products', () => ({
    items: [
      { id: 1, name: 'T-shirt', discount: '65%', img: 'promo2.png', price: 42000, promo: 120000 },
      { id: 4, name: 'New T-shirt Polo', discount: '65%', img: 'polo.1.jpg', price: 40000, promo: 120000 },
      { id: 5, name: 'Sweater/Hoodies', discount: '75%', img: 'jacket11.png', price: 30000, promo: 120000 },
    ],
    newItems: [ // Tambahkan array baru di sini
      { id: 2, name: 'FREE DESAIN', discount: '55%', img: 'pro1.png', price: 0, promo: 0 },
      { id: 3, name: 'PDL/PDH', discount: '60%', img: 'pdl.jpeg', price: 45000, promo: 120000 },
      
    ]
  }));

  // jumlah data keranjang cart
  Alpine.store('cart', {
    items: [],
    total: 0,
    quantity: 0,

    // untuk menambahkah item
    add(newItem) {
      // cek apakah ada barang yang sama di cart

      const cartItem = this.items.find((item) => item.id === newItem.id);

      // jika belum ada / cart masih kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika barang sudah ada, cek apakah barang beda atau sama dengan yang ada dicart
        this.items = this.items.map((item) => {
          // jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika barang sudah ada, tambah quantity dan totalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // ambil item yang mau di remove berdasarkan id nya
      const cartItem = this.items.find((item) => item.id === id);

      // jika item lebih dari 1
      if (cartItem.quantity > 1) {
        // telusuri satu/satu
        this.items = this.items.map((item) => {
          // jika bukan barang yang di klick
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item - price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // jika barang sisa satu

        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});


// // Form validation opsi pertama
const checkoutButton = document.querySelector('.checkout-button');
checkoutButton.disabled = true;

const form = document.querySelector('#checkoutForm');

// // Fungsi untuk memeriksa apakah semua input memiliki nilai
function isFormValid() {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].type !== 'submit' && form.elements[i].value.length === 0) {
      return false;
    }
  }
  return true;
}

// Event listener untuk menanggapi perubahan di formulir
form.addEventListener('input', function () {
  if (isFormValid()) {
    checkoutButton.disabled = false;
    checkoutButton.classList.remove('disabled');
  } else {
    checkoutButton.disabled = true;
    checkoutButton.classList.add('disabled');
  }
});

// kirim data ketika tombol checkout diklik
checkoutButton.addEventListener('click', function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  const data = new URLSearchParams(formData); 
  const objData = Object.fromEntries(data);
  const message = formatMessage(objData);
  window.open('http://wa.me/6282118916970?text=' + encodeURIComponent(message));
});

// Format pesan Whatsapp
const formatMessage = (obj) => {
  return `Data Konsumen
  Nama: ${obj.name}
  Email: ${obj.email}
  Alamat: ${obj.address}
  Produk: ${obj.jenis}
  Costum/bahan/jumlah: ${obj.jumlah}
  Desain: ${obj.foto}
  Keterangan: ${obj.keterangan}
Data Pesanan
  ${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} × ${rupiah(item.total)}) \n`)}
  TOTAL: ${rupiah(obj.total)}
  Terima Kasih.`;
};

// konversi ke rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};


