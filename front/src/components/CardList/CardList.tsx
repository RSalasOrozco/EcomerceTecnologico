import React from "react";
import Card from "../Card/Card";
import { getProductsDB } from "../../helpers/product.helper";
import Link from "next/link";

const CardList = async () => {
  const products = await getProductsDB();
  return (
    <div className="flex flex-wrap justify-center gap-1 content-around">
      {products &&
        products?.map((product) => {
          return (
            <Link href={`/product/${product.id}`} key={product.id}>
              <Card key={product.id} {...product} />
            </Link>
          );
        })}
    </div>
  );
};

export default CardList;
