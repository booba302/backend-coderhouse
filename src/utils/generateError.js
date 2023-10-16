export const newProductError = (product) => {
  return `Incomplete fields.
      * title: to be a string received: ${product.title}
      * description: to be a string received: ${product.description}
      * price: to be a string received: ${product.price}
      * code: to be a string received: ${product.code}
      * stock: to be a string received: ${product.stock} 
      * thumbnail: to be a string received: ${product.thumbnail} 
      * category: to be a string received: ${product.category}`;
};

export const getProductError = (id) => {
  return `Product don't exist/ID incorrect.
    * ID received: ${id}`;
};

export const getProductsError = () => {
  return `There's no products in your Database`;
};
