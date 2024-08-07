#!/bin/bash

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Get the full path of the script
SCRIPT_PATH=$(readlink -f "$0")
SCRIPT_DIR=$(dirname "$(readlink -f "$0")")

# Define Docker container IDs
DOCKER_POSTGRES=ffc99f056cbf
DOCKER_PGADMIN=21f1272f10c5



sudo service docker stop
sudo service docker restart
sudo docker restart $DOCKER_POSTGRES $DOCKER_PGADMIN
sudo docker ps 

gnome-terminal  --tab  -- bash -c "sleep 1s;cd $SCRIPT_DIR/back-end/ApiGateway && chmod +x script.sh && ./script.sh ; exec bash -i"
gnome-terminal  --tab  -- bash -c "sleep 1s;cd $SCRIPT_DIR/back-end/authentication && chmod +x script.sh && ./script.sh ; exec bash -i"
gnome-terminal  --tab  -- bash -c "sleep 1s;cd $SCRIPT_DIR/back-end/user_service && chmod +x script.sh && ./script.sh ; exec bash -i"
gnome-terminal  --tab  -- bash -c "sleep 1s;cd $SCRIPT_DIR/my-app/web/ && chmod +x script.sh && ./script.sh ; exec bash -i"
