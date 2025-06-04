"""
Este archivo contiene ejemplos de documentación en Python siguiendo las mejores prácticas.
"""

def calcular_promedio(numeros: list[float]) -> float:
    """
    Calcula el promedio de una lista de números.

    Args:
        numeros (list[float]): Lista de números para calcular el promedio.

    Returns:
        float: El promedio de los números.

    Raises:
        ValueError: Si la lista está vacía.

    Examples:
        >>> calcular_promedio([1, 2, 3, 4, 5])
        3.0
        >>> calcular_promedio([10.5, 20.5])
        15.5
    """
    if not numeros:
        raise ValueError("La lista no puede estar vacía")
    return sum(numeros) / len(numeros)


class Usuario:
    """
    Clase que representa a un usuario del sistema.

    Attributes:
        nombre (str): Nombre completo del usuario.
        email (str): Correo electrónico del usuario.
        edad (int): Edad del usuario en años.

    Examples:
        >>> usuario = Usuario("Juan Pérez", "juan@email.com", 25)
        >>> usuario.nombre
        'Juan Pérez'
    """

    def __init__(self, nombre: str, email: str, edad: int):
        """
        Inicializa una nueva instancia de Usuario.

        Args:
            nombre (str): Nombre completo del usuario.
            email (str): Correo electrónico del usuario.
            edad (int): Edad del usuario en años.

        Raises:
            ValueError: Si la edad es negativa o el email no es válido.
        """
        self.nombre = nombre
        self.email = email
        if edad < 0:
            raise ValueError("La edad no puede ser negativa")
        self.edad = edad

    def es_mayor_de_edad(self) -> bool:
        """
        Verifica si el usuario es mayor de edad.

        Returns:
            bool: True si el usuario es mayor de edad, False en caso contrario.

        Examples:
            >>> usuario = Usuario("Ana", "ana@email.com", 20)
            >>> usuario.es_mayor_de_edad()
            True
        """
        return self.edad >= 18


if __name__ == "__main__":
    # Ejemplo de uso
    try:
        usuario = Usuario("María García", "maria@email.com", 25)
        print(f"Usuario: {usuario.nombre}")
        print(f"¿Es mayor de edad?: {usuario.es_mayor_de_edad()}")
        
        numeros = [1, 2, 3, 4, 5]
        promedio = calcular_promedio(numeros)
        print(f"Promedio de {numeros}: {promedio}")
    except Exception as e:
        print(f"Error: {e}") 