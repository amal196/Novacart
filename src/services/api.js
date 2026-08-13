let productsCache = null;
let productsPromise = null;

export const getProducts = async () => {
  if (productsCache) {
    return productsCache;
  }

  if (!productsPromise) {
    const urls = [
      "https://dummyjson.com/products/category/smartphones",
      "https://dummyjson.com/products/category/laptops",
      "https://dummyjson.com/products/category/mens-shoes",
      "https://dummyjson.com/products/category/womens-shoes",
      "https://dummyjson.com/products/category/mens-watches",
      "https://dummyjson.com/products/category/womens-watches",
      "https://dummyjson.com/products/category/sunglasses",
      "https://dummyjson.com/products/category/beauty",
    ];

    productsPromise = Promise.all(urls.map((url) => fetch(url)))
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((data) => {
        productsCache = data.flatMap((item) => item.products);
        return productsCache;
      })
      .catch((error) => {
        
        productsPromise = null;
        throw error;
      });
  }

  return productsPromise;
};

export const getProductById = async (id) => {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  const data = await response.json();
  return data;
};