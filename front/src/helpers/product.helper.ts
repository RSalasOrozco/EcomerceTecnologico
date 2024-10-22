import IProduct from "../interfaces/IProduct";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export async function getProductsDB(): Promise<IProduct[]> {
  try {
    const res = await fetch(`${APIURL}/products`, {
      next: { revalidate: 10 }
    });
    const products: IProduct[] = await res.json();
    return products;
  } catch (error: any) {
    throw new Error("Failed to fetch products: " + error.message);
  }
}

export async function getProductsById(id: string): Promise<IProduct> {
  try {
    const products: IProduct[] = await getProductsDB();
    const productFiltered = products.find(
      (product) => product.id.toString() === id
    );
    if (!productFiltered) throw new Error("Product not found");
    return productFiltered;
  } catch (error: any) {
    throw new Error("Error fetching product by ID: " + error.message);
  }
}

export async function getProductsByCategory(
  categoryId: number
): Promise<IProduct[]> {
  try {
    const products: IProduct[] = await getProductsDB();

    console.log("CategoryId:", categoryId);
    console.log("Products:", products);

    const productsByCategory = products.filter(
      (product) => product.categoryId === categoryId
    );

    if (productsByCategory.length === 0) {
      console.warn(`No products found for category ID: ${categoryId}`);
      return []; // En lugar de lanzar un error, devolver una lista vacía
    }

    return productsByCategory;
  } catch (error: any) {
    console.error("Error fetching products by category:", error);
    throw new Error(`Error fetching products by category: ${error.message}`);
  }
}
