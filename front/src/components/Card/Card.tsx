import ICardProps from "../../components/Card/types";
import React from "react";
import Link from "next/link";

const Card: React.FC<ICardProps> = ({ id, name, price, stock, image }) => {
  return (
    <Link href={`/product/${id}`}>
      <div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-64 mx-auto my-8">
          {" "}
          <img
            src={image}
            alt={`Imagen del producto ${name}`}
            className="w-full h-56 object-cover object-center transition duration-300 ease-in-out hover:scale-110"
          />
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
            <p className="text-gray-600">Price: ${price}</p>
            <p className="text-gray-600">Stock: {stock}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;

/*
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
 */
