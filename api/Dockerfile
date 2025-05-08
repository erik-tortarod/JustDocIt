FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copiar archivos del proyecto
COPY . .

# Construir la aplicación con Java 21
RUN chmod +x ./mvnw && ./mvnw clean package -DskipTests

# Copiar el JAR a un nombre fijo
RUN find target -name "*.jar" -not -name "*sources.jar" -not -name "*javadoc.jar" -exec cp {} app.jar \;

# Exponer el puerto 8082 en lugar de 8080
EXPOSE 8082

ENTRYPOINT ["java", "-jar", "app.jar"]