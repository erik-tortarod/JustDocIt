/**
 * Este archivo contiene ejemplos modernos de documentación en JavaScript usando JSDoc.
 * @module modern_examples
 */

/**
 * Clase que representa un producto en el sistema.
 * @class Producto
 */
class Producto {
   /**
    * Crea una instancia de Producto.
    * @param {string} nombre - El nombre del producto.
    * @param {number} precio - El precio del producto.
    * @param {string} categoria - La categoría del producto.
    * @throws {Error} Si el precio es negativo.
    */
   constructor(nombre, precio, categoria) {
      if (precio < 0) {
         throw new Error("El precio no puede ser negativo");
      }
      this.nombre = nombre;
      this.precio = precio;
      this.categoria = categoria;
   }

   /**
    * Calcula el precio con impuestos.
    * @param {number} [tasaImpuesto=0.21] - La tasa de impuesto a aplicar (por defecto 21%).
    * @returns {number} El precio con impuestos incluidos.
    * @example
    * const producto = new Producto('Laptop', 1000, 'Electrónica');
    * console.log(producto.calcularPrecioConImpuestos()); // 1210
    */
   calcularPrecioConImpuestos(tasaImpuesto = 0.21) {
      return this.precio * (1 + tasaImpuesto);
   }
}

/**
 * Función que filtra productos por categoría.
 * @param {Producto[]} productos - Array de productos a filtrar.
 * @param {string} categoria - Categoría por la cual filtrar.
 * @returns {Producto[]} Array de productos filtrados.
 * @example
 * const productos = [
 *   new Producto('Laptop', 1000, 'Electrónica'),
 *   new Producto('Silla', 200, 'Muebles')
 * ];
 * const productosElectronica = filtrarPorCategoria(productos, 'Electrónica');
 */
function filtrarPorCategoria(productos, categoria) {
   return productos.filter((producto) => producto.categoria === categoria);
}

/**
 * Función asíncrona que simula la obtención de productos desde una API.
 * @async
 * @param {string} categoria - Categoría de productos a obtener.
 * @returns {Promise<Producto[]>} Promise que resuelve con un array de productos.
 * @throws {Error} Si hay un error al obtener los productos.
 * @example
 * try {
 *   const productos = await obtenerProductos('Electrónica');
 *   console.log(productos);
 * } catch (error) {
 *   console.error('Error:', error);
 * }
 */
async function obtenerProductos(categoria) {
   // Simulación de llamada a API
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         if (Math.random() > 0.1) {
            // 90% de probabilidad de éxito
            resolve([
               new Producto("Laptop", 1000, categoria),
               new Producto("Smartphone", 500, categoria),
            ]);
         } else {
            reject(new Error("Error al obtener productos"));
         }
      }, 1000);
   });
}

// Ejemplo de uso
async function main() {
   try {
      const producto = new Producto("Laptop", 1000, "Electrónica");
      console.log(
         "Precio con impuestos:",
         producto.calcularPrecioConImpuestos()
      );

      const productos = await obtenerProductos("Electrónica");
      const productosFiltrados = filtrarPorCategoria(productos, "Electrónica");
      console.log("Productos filtrados:", productosFiltrados);
   } catch (error) {
      console.error("Error:", error.message);
   }
}

// Ejecutar el ejemplo
main();
