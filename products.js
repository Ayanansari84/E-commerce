const productsByCategory = {
  'mobiles': [
    { id: 1, name: 'iPhone 15 Pro Max', price: 119999, oldPrice: 159900, discount: 25, img: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=400', category: 'mobiles' },
    { id: 2, name: 'Samsung Galaxy S24 Ultra', price: 129999, oldPrice: 149999, discount: 13, img: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=400', category: 'mobiles' },
    { id: 3, name: 'OnePlus 12', price: 64999, oldPrice: 69999, discount: 7, img: 'https://images.unsplash.com/photo-1678911820864-e2c567c655d7?auto=format&fit=crop&q=80&w=400', category: 'mobiles' },
    { id: 4, name: 'Google Pixel 8 Pro', price: 89999, oldPrice: 106999, discount: 15, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=400', category: 'mobiles' },
    { id: 13, name: 'iPhone 14', price: 79999, img: 'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?auto=format&fit=crop&q=80&w=400', category: 'mobiles' }
  ],
  'fashion': [
    { id: 7, name: "Levi's Men's Jeans", price: 1499, oldPrice: 2999, discount: 50, img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=400', category: 'fashion' },
    { id: 8, name: 'Nike Air Max Shoes', price: 4495, oldPrice: 8995, discount: 50, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400', category: 'fashion' },
    { id: 27, name: 'Vans Old Skool Shoes', price: 3499, oldPrice: 4999, discount: 30, img: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=400', category: 'fashion' },
    { id: 28, name: 'Running Shoes', price: 1999, oldPrice: 2999, discount: 33, img: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&q=80&w=400', category: 'fashion' },
    { id: 29, name: 'Comfort Slippers Shoes', price: 599, oldPrice: 999, discount: 40, img: 'https://th.bing.com/th/id/OIP.BHqUV87Kngk7scDuJWWa0QHaE8?w=284&h=189&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', category: 'fashion' },
    { id: 30, name: 'Nike Green Sneakers Shoes', price: 5499, oldPrice: 7999, discount: 31, img: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=400', category: 'fashion' },
    { id: 31, name: 'Casual Sneakers Shoes', price: 2499, oldPrice: 3999, discount: 37, img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=400', category: 'fashion' },
    { id: 9, name: 'Casio G-Shock Watch', price: 7995, img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=400', category: 'fashion' },
    { id: 14, name: 'Adidas Hoodie', price: 3999, img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400', category: 'fashion' }
  ],
  'electronics': [
    { id: 10, name: 'Dell XPS 13 Laptop', price: 89990, oldPrice: 109990, discount: 18, img: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=400', category: 'electronics' },
    { id: 11, name: 'Samsung 55" QLED TV', price: 44990, oldPrice: 59990, discount: 25, img: 'https://tse2.mm.bing.net/th/id/OIP.kNSy9ikrGZ5y1p_S8w6srQHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', category: 'electronics' },
    { id: 12, name: 'Dyson V15 Vacuum', price: 39990, oldPrice: 49990, discount: 20, img: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&q=80&w=400', category: 'electronics' }
  ],
  'headphones': [
    { id: 5, name: "Apple AirPods Pro 2", price: 18900, oldPrice: 24900, discount: 24, img: 'https://m.media-amazon.com/images/I/61SUj2aKoEL._SX679_.jpg', category: 'headphones' },
    { id: 6, name: 'Sony WH-1000XM5 Headphones', price: 24990, oldPrice: 29990, discount: 16, img: 'https://m.media-amazon.com/images/I/51aXvjzcukL._SX679_.jpg', category: 'headphones' },
    { id: 15, name: 'JBL Tune 510BT', price: 3499, img: 'https://m.media-amazon.com/images/I/61kFL7ywsZS._SX679_.jpg', category: 'headphones' }
  ],
  'kitchen': [
    { id: 16, name: 'High-Power Mixer Juicer Grinder', price: 4499, oldPrice: 6999, discount: 35, img: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&q=80&w=400', category: 'kitchen' },
    { id: 17, name: '3-Burner Automatic Gas Stove', price: 5999, oldPrice: 9999, discount: 40, img: 'https://tse2.mm.bing.net/th/id/OIP.Qgxf1OftKZ5C3tIY7uZDzQAAAA?pid=Api&P=0&h=180', category: 'kitchen' },
    { id: 18, name: 'Convection Microwave Oven', price: 12990, oldPrice: 18990, discount: 31, img: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&q=80&w=400', category: 'kitchen' },
    { id: 19, name: 'Stainless Steel Pop-up Toaster', price: 1999, oldPrice: 2999, discount: 33, img: 'https://www.hatcocorp.com/cms/WEBEQUIP/000000024899267-00000-20160119.JPG', category: 'kitchen' }
  ],
  'ebooks': [
    { id: 24, name: 'Atomic Habits', price: 299, oldPrice: 499, discount: 40, img: 'https://m.media-amazon.com/images/I/81bGKUa1e0L._SY466_.jpg', category: 'ebooks' },
    { id: 25, name: 'The Psychology of Money', price: 250, oldPrice: 399, discount: 37, img: 'https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg', category: 'ebooks' },
    { id: 26, name: 'Ikigai: The Japanese Secret', price: 199, oldPrice: 299, discount: 33, img: 'https://m.media-amazon.com/images/I/81l3rZK4lnL._SY466_.jpg', category: 'ebooks' }
  ]
};

const allProducts = Object.values(productsByCategory).flat();