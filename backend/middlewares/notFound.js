export default function (req, res) {
  res.status(501).json({ error: -2, descripcion: `Ruta ${req.originalUrl}, method ${req.method} no inplementada` })
}
