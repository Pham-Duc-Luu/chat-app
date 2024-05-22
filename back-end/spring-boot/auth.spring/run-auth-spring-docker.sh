#!/bin/bash

# Define variables
IMAGE_NAME="auth-spring-app"
CONTAINER_NAME="auth-spring-container"
JAR_FILE="auth.spring-0.0.1-SNAPSHOT.jar"

# Step 1: Build the Spring Boot application
echo "Building the Spring Boot application..."
./mvnw clean package

# Check if the build was successful
if [ $? -ne 0 ]; then
    echo "Spring Boot application build failed!"
    exit 1
fi

# Step 2: Build the Docker image
echo "Building the Docker image..."
docker build -t $IMAGE_NAME .

# Check if the image was built successfully
if [ $? -ne 0 ]; then
    echo "Docker image build failed!"
    exit 1
fi

# Step 3: Run the Docker container
echo "Running the Docker container..."
docker run -d --name $CONTAINER_NAME -p 8080:8080 $IMAGE_NAME

# Check if the container started successfully
if [ $? -ne 0 ]; then
    echo "Docker container failed to start!"
    exit 1
fi

echo "Spring Boot application is running at http://localhost:8080"
