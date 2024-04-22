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
});