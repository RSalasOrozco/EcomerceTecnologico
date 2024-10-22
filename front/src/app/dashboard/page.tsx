"use client";

import { useRouter } from "next/navigation"; // Usa `next/navigation`
import React, { useEffect, useState } from "react";
import ProfilePage from "../../components/ProfilePage/ProfilePage";
import { IUserSession } from "../../interfaces/types";

const Dashboard = () => {
  const [userSession, setUserSession] = useState<IUserSession | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Verifica si el navegador es un entorno cliente
    if (typeof window !== "undefined" && window.localStorage) {
      const userData = localStorage.getItem("userSession");
      if (userData) {
        setUserSession(JSON.parse(userData));
      } else {
        // Si no hay datos de sesión, redirige al login
        router.push("/login");
      }
    }
  }, []); // Dependencias vacías, se ejecuta solo una vez

  // Renderiza la página solo si el usuario está logueado
  if (!userSession) {
    return null; // o muestra un loader mientras se redirige
  }

  return <ProfilePage />;
};

export default Dashboard;
