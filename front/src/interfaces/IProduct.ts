interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  categoryId: number;
}

export default IProduct; 

/*
"id": 1,
    "name": "iPhone 11",
    "description": "Experience power and elegance with the iPhone 11: capture stunning moments with its dual-camera system, enjoy exceptional performance, and immerse yourself in a brilliant Liquid Retina display. Discover a world of possibilities in the palm of your hand!",
    "price": 699,
    "stock": 10,
    "image": "https://http2.mlstatic.com/D_NQ_NP_2X_793954-MLA46114829790_052021-F.webp",
    "categoryId": 1
*/