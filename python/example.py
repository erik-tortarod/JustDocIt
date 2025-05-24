from dataclasses import dataclass
from typing import List, Optional

@dataclass
class Task:
    """
    Clase que representa una tarea en el sistema.
    
    Attributes:
        id (int): Identificador único de la tarea
        title (str): Título de la tarea
        completed (bool): Estado de completitud de la tarea
    """
    id: int
    title: str
    completed: bool = False

class TaskManager:
    """
    Clase que gestiona una lista de tareas.
    
    Esta clase proporciona métodos para agregar, completar y listar tareas.
    """
    
    def __init__(self):
        """Inicializa el gestor de tareas con una lista vacía."""
        self.tasks: List[Task] = []
    
    def add_task(self, title: str) -> Task:
        """
        Agrega una nueva tarea al gestor.
        
        Args:
            title (str): Título de la tarea a agregar
            
        Returns:
            Task: La tarea recién creada
        """
        task = Task(id=len(self.tasks) + 1, title=title)
        self.tasks.append(task)
        return task
    
    def complete_task(self, task_id: int) -> Optional[Task]:
        """
        Marca una tarea como completada.
        
        Args:
            task_id (int): ID de la tarea a completar
            
        Returns:
            Optional[Task]: La tarea completada o None si no se encuentra
        """
        for task in self.tasks:
            if task.id == task_id:
                task.completed = True
                return task
        return None 