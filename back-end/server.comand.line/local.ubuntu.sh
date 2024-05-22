#!/bin/bash

echo "restarting docker"
sudo service docker restart

echo "restarting docker-engine"
sudo service docker restart

echo "view all docker images"
sudo docker images

echo "view all docker containers"
sudo docker ps -a