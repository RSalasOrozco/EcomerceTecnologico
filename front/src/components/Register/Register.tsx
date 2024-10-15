"use client";

import { register } from "@/helpers/auth.helpers";
import { validateRegisterForm } from "@/helpers/validate";
import { IRegisterError, IRegisterProps } from "@/interfaces/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function Register() {
  const router = useRouter();
  const initialState = {
    email: "",
    password: "",
    name: "",
    address: "",
    phone: ""
  };
  const [dataUser, setDataUser] = useState<IRegisterProps>(initialState);
  const [errors, setErrors] = useState<IRegisterError>(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataUser({ ...dataUser, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await register(dataUser);
      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success"
      });
      router.push("/login");
    } catch (error: any) {
      const errors = validateRegisterForm(dataUser);
      setErrors(errors);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message
      });
    }
  };

  useEffect(() => {
    const errors = validateRegisterForm(dataUser);
    setErrors(errors);
  }, [dataUser]);

  console.log(errors);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-[3rem]">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={handleSubmit}
          action="#"
          method="POST"
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email-address"
                name="email"
                type="email"
                value={dataUser.email}
                onChange={handleChange}
                placeholder="  example@gmail.com"
                required
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
              {errors.email && <span>{errors.email}</span>}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm"></div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={dataUser.password}
                onChange={handleChange}
                placeholder="  ********"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
              {errors.password && <span>{errors.password}</span>}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="text-sm"></div>
            </div>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                value={dataUser.name}
                onChange={handleChange}
                placeholder="  Name"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
              {errors.name && <span>{errors.name}</span>}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Address
              </label>
              <div className="text-sm"></div>
            </div>
            <div className="mt-2">
              <input
                id="address"
                name="address"
                type="text"
                value={dataUser.address}
                onChange={handleChange}
                placeholder="  ********"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
              {errors.address && <span>{errors.address}</span>}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone
              </label>
              <div className="text-sm"></div>
            </div>
            <div className="mt-2">
              <input
                id="phone"
                name="phone"
                type="number"
                value={dataUser.phone}
                onChange={handleChange}
                placeholder="  ********"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
              {errors.phone && <span>{errors.phone}</span>}
            </div>
          </div>

          <div>
            <button
              disabled={errors.email ? true : false}
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Register
            </button>
          </div>
        </form>

        {/*<a
        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
            href="#"
            className="font-semibold leading-6 text-blue-600 hover:text-blue-300"
          >
            Start a 14 day free trial
          </a>
        </p>*/}
      </div>
    </div>
  );
}

export default Register;
