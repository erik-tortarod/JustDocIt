FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copiar archivos del proyecto
COPY . .

# Construir la aplicación con Java 21
RUN chmod +x ./mvnw && ./mvnw clean package -DskipTests

# Copiar el JAR a un nombre fijo
RUN find target -name "*.jar" -not -name "*sources.jar" -not -name "*javadoc.jar" -exec cp {} app.jar \;

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]