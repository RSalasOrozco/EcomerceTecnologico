"use client";
import { createOrder } from "@/helpers/orders.helper";
import IProduct from "@/interfaces/IProduct";
import { IUserSession } from "@/interfaces/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";

const CartPage = () => {
  const [cart, setCart] = useState<IProduct[]>([]);
  const [totalCart, setTotalCart] = useState<number>(0);
  const router = useRouter();
  const [userSession, setUserSession] = useState<IUserSession>();

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userData = localStorage.getItem("userSession");
      setUserSession(JSON.parse(userData!));
    }
    !userSession?.token && router.push("/cart");
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      if (storedCart) {
        let totalCart = 0;
        storedCart.map((item: IProduct) => {
          totalCart = totalCart + item.price;
        });
        setTotalCart(totalCart);
        setCart(storedCart);
      }
    }
  }, []);

  useEffect(() => {
    if (userSession?.user.name) {
      userSession?.user.name === undefined && router.push("/login");
    }
  }, [userSession?.user]);

  const handleClick = async () => {
    const idProducts = new Set(cart?.map((product) => product.id));
    await createOrder(Array.from(idProducts), userSession?.token!);
    Swal.fire({
      title: "Order created!",
      icon: "success",
      confirmButtonText: "Ok"
    });
    setCart([]);
    localStorage.removeItem("cart");
    setTotalCart(0);
  };

  const handleRemoveItem = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    const newTotal = updatedCart.reduce((total, item) => total + item.price, 0);
    setTotalCart(newTotal);
  };

  const handleAddMoreProducts = () => {
    router.push("/products"); // cambia la ruta de la pagina
  };

  const handleCancelPurchase = () => {
    setCart([]);
    localStorage.removeItem("cart");
    setTotalCart(0);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 ">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-[200px]">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Your Cart</h1>
        <div>
          {cart && cart.length > 0 ? (
            cart?.map((item) => (
              <div key={item.id} className="border-b border-gray-200 py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg text-gray-700">{item.name}</p>
                    <p className="text-lg text-gray-700">
                      Price: ${item.price}
                    </p>
                  </div>
                  <button
                    className="ml-4 p-2 bg-red-600 text-white rounded-full hover:bg-red-500 transition duration-300"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600">
              You don't have items in your cart
              <Link href="/">
                <button className="mt-8 w-full bg-blue-700 text-white py-2 rounded-lg shadow-md hover:bg-blue-500 transition duration-300">
                  View products
                </button>
              </Link>
            </div>
          )}
        </div>
        {cart && cart.length > 0 && (
          <div className="mt-6">
            <p className="text-xl font-semibold text-gray-800 ">
              Total: ${totalCart}
            </p>
            <button
              className="mt-4 w-full bg-blue-700 text-white py-2 rounded-lg shadow-md hover:bg-blue-500 transition duration-300"
              onClick={handleClick}
            >
              Checkout
            </button>
            <Link href="/">
              <button className="mt-2 w-full bg-green-700 text-white py-2 rounded-lg shadow-md hover:bg-green-500 transition duration-300">
                Add More Products
              </button>
            </Link>
            <button
              className="mt-2 w-full bg-red-700 text-white py-2 rounded-lg shadow-md hover:bg-red-500 transition duration-300"
              onClick={handleCancelPurchase}
            >
              Cancel Purchase
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
