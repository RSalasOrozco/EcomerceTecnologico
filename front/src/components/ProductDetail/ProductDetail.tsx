"use client";
import React, { useEffect, useState } from "react";
import IProduct from "../../interfaces/IProduct";
import { IUserSession } from "../../interfaces/types";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const ProductDetail: React.FC<IProduct> = ({
  name,
  description,
  price,
  stock,
  image,
  id
}) => {
  const router = useRouter();
  const [userSession, setUserSession] = useState<IUserSession>();

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userData = localStorage.getItem("userSession");
      setUserSession(JSON.parse(userData!));
    }
  }, []);

  const handleClick = () => {
    if (userSession && userSession.token) {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      //Verificar si el Producto ya Existe en el Carrito
      const productExist = cart.some((product: IProduct) => {
        if (product.id === id) return true;
        return false;
      });
      //Manejo cuando el Producto ya Existe en el Carrito
      if (productExist) {
        Swal.fire({
          title: "Product already in cart",
          icon: "warning",
          confirmButtonText: "Ok"
        });
        router.push("/cart");
      } else {
        cart.push({
          name,
          description,
          price,
          stock,
          image,
          id
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Adding to cart..."
        });
        router.push("/cart");
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please login first"
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-4xl mx-auto my-16 mt-[150px] transition duration-300 ease-in-out hover:shadow-xl hover:scale-105 transform">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-96 relative overflow-hidden group">
          <img
            src={image}
            alt={`Imagen del producto`}
            className="w-full h-full object-cover object-center transition duration-300 ease-in-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              {name}
            </h2>
            <p className="text-lg text-gray-600 mb-6">{description}</p>
            <p className="text-2xl font-bold text-blue-600 mb-4">${price}</p>
            <p className="text-base text-gray-500 mb-6">Stock: {stock}</p>
          </div>
          <button
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium py-3 px-6 rounded-full transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
            onClick={handleClick}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
