#!/bin/bash

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Get the full path of the script
SCRIPT_PATH=$(readlink -f "$0")
SCRIPT_DIR=$(dirname "$(readlink -f "$0")")


# Read variables from .env file
if [ -f .env ]; then
    echo "Sourcing .env file..."
    source .env  # or use: . .env
else
    echo "Error: .env file not found."
    exit 1
fi


check_and_remove_port() {
    local port=$1
    local processes=$(sudo lsof -ti :$port )

    if [ -z "$processes" ]; then
        echo "Port $port is not in use."
    else
        echo "Processes using port $port:"
        echo "$processes"
        
        read -p "Do you want to remove processes using port $port? [y]/[n]: " answer
        if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
            echo "Killing processes..."
            for pid in $processes; do
                sudo kill -9 $pid
            done
            echo "Processes killed."
        else
            echo "No processes removed. Exiting."
            exit 1
        fi
    fi
}


# Check if npm is installed
if ! command_exists npm; then
    echo "npm is not installed. Exiting."
    exit 1
fi
 

# Run npm run dev
npm run dev 



