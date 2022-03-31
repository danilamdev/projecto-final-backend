const baseUrl = "/api/carrito";

export async function getCarritoById() {
  return fetch(`${baseUrl}/1/productos`).then((res) => res.json());
}

export async function addProductToCart(producto) {
  return fetch(`${baseUrl}/1/productos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(producto),
  }).then((res) => res.json());
}
