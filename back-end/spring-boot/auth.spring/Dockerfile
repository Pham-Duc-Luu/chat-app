# Use the official OpenJDK image from the Docker Hub
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the built jar file from the local machine to the container
COPY target/auth.spring-0.0.1-SNAPSHOT.jar /app/auth.spring.jar

# Expose the port that the application will run on
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "auth.spring.jar"]
