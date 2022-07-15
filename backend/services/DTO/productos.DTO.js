export default function productosDTO(producto) {
  const { nombre, descripcion, codigo, foto, precio, stock, timestamp } = producto
  // const IntlOptions = {
  //   year: 'numeric',
  //   month: 'short',
  //   day: '2-digit',
  //   weekday: 'short',
  //   hour: 'numeric',
  //   minute: 'numeric',
  //   second: 'numeric'
  // }

  return {
    id: producto.id || producto._id,
    nombre,
    descripcion,
    codigo,
    foto,
    precio,
    stock,
    createdAt: timestamp
    // createdAt: new Intl.DateTimeFormat('en-ES', IntlOptions).format(createdAt)
  }
}
