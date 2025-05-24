/**
 * Clase que representa un estudiante en el sistema
 */
public class Student {
    private final String id;
    private String name;
    private double grade;

    /**
     * Constructor para crear un nuevo estudiante
     * 
     * @param id Identificador único del estudiante
     * @param name Nombre completo del estudiante
     * @param grade Calificación inicial del estudiante
     */
    public Student(String id, String name, double grade) {
        this.id = id;
        this.name = name;
        this.grade = grade;
    }

    /**
     * Actualiza la calificación del estudiante
     * 
     * @param newGrade Nueva calificación a asignar
     * @throws IllegalArgumentException si la calificación está fuera del rango 0-100
     */
    public void updateGrade(double newGrade) {
        if (newGrade < 0 || newGrade > 100) {
            throw new IllegalArgumentException("La calificación debe estar entre 0 y 100");
        }
        this.grade = newGrade;
    }

    /**
     * Obtiene el estado de aprobación del estudiante
     * 
     * @return true si la calificación es mayor o igual a 60, false en caso contrario
     */
    public boolean isPassing() {
        return grade >= 60;
    }

    /**
     * Obtiene el ID del estudiante
     * 
     * @return ID del estudiante
     */
    public String getId() {
        return id;
    }

    /**
     * Obtiene el nombre del estudiante
     * 
     * @return Nombre del estudiante
     */
    public String getName() {
        return name;
    }

    /**
     * Obtiene la calificación actual del estudiante
     * 
     * @return Calificación del estudiante
     */
    public double getGrade() {
        return grade;
    }
} 