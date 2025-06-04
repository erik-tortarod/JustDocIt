/**
 * Este archivo contiene ejemplos de documentación en TypeScript con énfasis en tipos e interfaces.
 * @module type_examples
 */

/**
 * Interfaz que define la estructura de un usuario.
 * @interface Usuario
 */
interface Usuario {
   /** Identificador único del usuario */
   id: number;
   /** Nombre completo del usuario */
   nombre: string;
   /** Correo electrónico del usuario */
   email: string;
   /** Fecha de registro del usuario */
   fechaRegistro: Date;
   /** Roles asignados al usuario */
   roles: string[];
}

/**
 * Tipo que representa el estado de una operación.
 * @type {('pendiente' | 'completado' | 'error')}
 */
type EstadoOperacion = 'pendiente' | 'completado' | 'error';

/**
 * Interfaz genérica para respuestas de API.
 * @template T - Tipo de datos que contendrá la respuesta
 */
interface ApiResponse<T> {
   /** Estado de la operación */
   estado: EstadoOperacion;
   /** Datos de la respuesta */
   datos?: T;
   /** Mensaje de error si existe */
   error?: string;
}

/**
 * Clase que maneja operaciones de usuarios.
 * @class UsuarioService
 */
class UsuarioService {
   /**
    * Obtiene un usuario por su ID.
    * @param {number} id - ID del usuario a obtener
    * @returns {Promise<ApiResponse<Usuario>>} Promise con la respuesta de la API
    * @throws {Error} Si el ID es inválido
    * @example
    * const usuarioService = new UsuarioService();
    * const respuesta = await usuarioService.obtenerUsuario(1);
    * if (respuesta.estado === 'completado') {
    *   console.log(respuesta.datos);
    * }
    */
   async obtenerUsuario(id: number): Promise<ApiResponse<Usuario>> {
      if (id <= 0) {
         throw new Error('ID de usuario inválido');
      }

      // Simulación de llamada a API
      return new Promise((resolve) => {
         setTimeout(() => {
            resolve({
               estado: 'completado',
               datos: {
                  id,
                  nombre: 'Juan Pérez',
                  email: 'juan@email.com',
                  fechaRegistro: new Date(),
                  roles: ['usuario']
               }
            });
         }, 1000);
      });
   }

   /**
    * Crea un nuevo usuario.
    * @param {Omit<Usuario, 'id' | 'fechaRegistro'>} usuario - Datos del usuario a crear
    * @returns {Promise<ApiResponse<Usuario>>} Promise con la respuesta de la API
    * @example
    * const usuarioService = new UsuarioService();
    * const nuevoUsuario = {
    *   nombre: 'María García',
    *   email: 'maria@email.com',
    *   roles: ['usuario']
    * };
    * const respuesta = await usuarioService.crearUsuario(nuevoUsuario);
    */
   async crearUsuario(
      usuario: Omit<Usuario, 'id' | 'fechaRegistro'>
   ): Promise<ApiResponse<Usuario>> {
      // Simulación de llamada a API
      return new Promise((resolve) => {
         setTimeout(() => {
            resolve({
               estado: 'completado',
               datos: {
                  id: Math.floor(Math.random() * 1000),
                  ...usuario,
                  fechaRegistro: new Date()
               }
            });
         }, 1000);
      });
   }
}

/**
 * Función de utilidad para validar un email.
 * @param {string} email - Email a validar
 * @returns {boolean} true si el email es válido, false en caso contrario
 * @example
 * const emailValido = validarEmail('usuario@dominio.com');
 * console.log(emailValido); // true
 */
function validarEmail(email: string): boolean {
   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return regex.test(email);
}

// Ejemplo de uso
async function main() {
   try {
      const usuarioService = new UsuarioService();

      // Obtener usuario
      const respuestaUsuario = await usuarioService.obtenerUsuario(1);
      if (respuestaUsuario.estado === 'completado' && respuestaUsuario.datos) {
         console.log('Usuario obtenido:', respuestaUsuario.datos);
      }

      // Crear usuario
      const nuevoUsuario = {
         nombre: 'Ana López',
         email: 'ana@email.com',
         roles: ['usuario']
      };

      if (validarEmail(nuevoUsuario.email)) {
         const respuestaCreacion = await usuarioService.crearUsuario(nuevoUsuario);
         if (respuestaCreacion.estado === 'completado' && respuestaCreacion.datos) {
            console.log('Usuario creado:', respuestaCreacion.datos);
         }
      } else {
         console.error('Email inválido');
      }
   } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : 'Error desconocido');
   }
}

// Ejecutar el ejemplo
main(); 