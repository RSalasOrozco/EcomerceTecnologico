"use client";
import { getOrders } from "@/helpers/orders.helper";
import { IUserSession, Order } from "@/interfaces/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Orders = () => {
  const [userSession, setUserSession] = useState<IUserSession | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userData = localStorage.getItem("userSession");
      if (userData) {
        setUserSession(JSON.parse(userData));
      } else {
        // Si no hay sesión de usuario, redirige al login
        router.push("/login");
      }
    }
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      if (userSession?.token) {
        try {
          const ordersResponse = await getOrders(userSession.token);
          if (Array.isArray(ordersResponse)) {
            setOrders(ordersResponse);
          } else {
            console.error("getOrders no devolvió un array");
            setOrders([]);
          }
        } catch (error) {
          console.error("Error al obtener las órdenes:", error);
          setOrders([]);
        }
      }
    };

    if (userSession) {
      fetchData();
    }
  }, [userSession]);

  return (
    <div className="max-w-4xl mx-auto mb-[240px] px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="p-6 sm:p-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Tus Órdenes
          </h2>

          {orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order: Order) => (
                <div key={order.id} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-lg font-semibold text-blue-600">
                      Order ID: {order.id}
                    </p>
                    <span className="px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
                      {order.status}
                    </span>
                  </div>
                  <p className="text-gray-600">Date: {order.date}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <p className="text-xl font-semibold text-gray-700 mb-2">
                You don't have any orders yet.
              </p>
              <p className="text-gray-500">
                You don't have any orders at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
