/**
 * Interfaz que define la estructura de un usuario
 * @interface User
 */
interface User {
   /** ID único del usuario */
   id: number;
   /** Nombre completo del usuario */
   name: string;
   /** Email del usuario */
   email: string;
   /** Indica si el usuario está activo */
   isActive: boolean;
}

/**
 * Clase que maneja la autenticación de usuarios
 * @class AuthService
 */
class AuthService {
   private users: User[] = [];

   /**
    * Registra un nuevo usuario en el sistema
    * @param {User} user - El usuario a registrar
    * @returns {boolean} - true si el registro fue exitoso
    */
   registerUser(user: User): boolean {
      if (this.users.some(u => u.email === user.email)) {
         return false;
      }
      this.users.push(user);
      return true;
   }

   /**
    * Verifica si un usuario existe por su email
    * @param {string} email - Email del usuario a buscar
    * @returns {User | undefined} - El usuario encontrado o undefined
    */
   findUserByEmail(email: string): User | undefined {
      return this.users.find(user => user.email === email);
   }
} 