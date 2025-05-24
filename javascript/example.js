/**
 * Clase que representa un contador con funcionalidades básicas
 */
class Counter {
   /**
    * Crea una nueva instancia del contador
    * @param {number} initialValue - Valor inicial del contador
    */
   constructor(initialValue = 0) {
      this.value = initialValue;
   }

   /**
    * Incrementa el contador en 1
    * @returns {number} El nuevo valor del contador
    */
   increment() {
      this.value += 1;
      return this.value;
   }

   /**
    * Decrementa el contador en 1
    * @returns {number} El nuevo valor del contador
    */
   decrement() {
      this.value -= 1;
      return this.value;
   }

   /**
    * Obtiene el valor actual del contador
    * @returns {number} El valor actual
    */
   getValue() {
      return this.value;
   }

   /**
    * Reinicia el contador a un valor específico
    * @param {number} [newValue=0] - El nuevo valor del contador
    * @returns {number} El valor después del reinicio
    */
   reset(newValue = 0) {
      this.value = newValue;
      return this.value;
   }
}

// Ejemplo de uso
const counter = new Counter(5);
console.log(counter.getValue()); // 5
console.log(counter.increment()); // 6
console.log(counter.decrement()); // 5
console.log(counter.reset(10)); // 10
