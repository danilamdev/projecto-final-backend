/**
 * Productos.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nombre: { type: 'string' },
    descripcion: { type: 'string' },
    codigo: { type: 'string' },
    foto: { type: 'string' },
    precio: { type: 'string' },
    stock: { type: 'string' }
  },

};

