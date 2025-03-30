#!/bin/bash

# Variables
DOCKER_HUB_USERNAME="eriktortarod"  
API_IMAGE_NAME="docker-api"
AUTH_IMAGE_NAME="docker-auth"
FRONTEND_IMAGE_NAME="docker-frontend"
VERSION="latest"  

# Directories
API_DIR="./api"
AUTH_DIR="./auth"
FRONTEND_DIR="./frontend"

# Colors for each message (very demure)
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' 

# Login in Docker Hub
echo -e "${YELLOW}Logging in to Docker Hub...${NC}"
sudo docker login

# Function to build and update the images
build_and_push() {
    local service=$1
    local dir=$2
    local image_name=$3
    
    echo -e "${YELLOW}Building image for $service...${NC}"
    sudo docker build -t $DOCKER_HUB_USERNAME/$image_name:$VERSION $dir
    
    if [ $? -eq 0 ]; then
        echo -e "${YELLOW}Uploading $image_name image to Docker Hub...${NC}"
        sudo docker push $DOCKER_HUB_USERNAME/$image_name:$VERSION
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}Image $image_name updated successfully${NC}"
        else
            echo -e "Error uploading $image_name image"
            exit 1
        fi
    else
        echo -e "Error building $image_name image"
        exit 1
    fi
}

# Menu of options
echo "===== Docker Hub Images Update ====="
echo "1. Update all images"
echo "2. Update API image"
echo "3. Update Auth image"
echo "4. Update Frontend image"
echo "5. Exit"
echo "==================================="
read -p "Select an option (1-5): " option

case $option in
    1)
        echo -e "${YELLOW}Updating all images...${NC}"
        build_and_push "API" "$API_DIR" "$API_IMAGE_NAME"
        build_and_push "Auth" "$AUTH_DIR" "$AUTH_IMAGE_NAME"
        build_and_push "Frontend" "$FRONTEND_DIR" "$FRONTEND_IMAGE_NAME"
        echo -e "${GREEN}All images have been updated successfully!${NC}"
        ;;
    2)
        build_and_push "API" "$API_DIR" "$API_IMAGE_NAME"
        ;;
    3)
        build_and_push "Auth" "$AUTH_DIR" "$AUTH_IMAGE_NAME"
        ;;
    4)
        build_and_push "Frontend" "$FRONTEND_DIR" "$FRONTEND_IMAGE_NAME"
        ;;
    5)
        echo "Exiting..."
        exit 0
        ;;
    *)
        echo "Invalid option"
        exit 1
        ;;
esac
