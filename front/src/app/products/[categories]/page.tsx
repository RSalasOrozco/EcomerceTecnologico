//CODIGO DE categorias
import Card from "@/components/Card/Card";
import { getProductsByCategory } from "@/helpers/product.helper";
import Link from "next/link";
import React from "react";

const CategoryProducts = async ({
  params
}: {
  params: { categories: string };
}) => {
  const { categories } = params;
  const products = await getProductsByCategory(Number(categories));

  return (
    <div className="flex flex-wrap justify-center gap-1 content-around mt-[130px]">
      {products && products.length > 0 ? (
        products.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <Card key={product.id} {...product} />
          </Link>
        ))
      ) : (
        <div className="flex justify-center items-center mt-[150px] mb-[200px]">
          <div className="bg-white shadow-lg rounded-lg p-8 mx-4 max-w-md w-full">
            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
              Sin productos disponibles
            </h2>
            <p className="text-gray-500 text-center">
              No tenemos productos disponibles en esta categoría.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
