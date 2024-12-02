 #!/bin/bash

network_name="kong-gw-net"
container_name="kong-gw"

# Check for network existence
if ! docker network inspect "$network_name" &> /dev/null; then
  echo "Creating network: $network_name"
  docker network create "$network_name"
fi

# Check for container existence
container_id=$(docker ps -a | grep "$container_name" | awk '{print $1}')

if [ -z "$container_id" ]; then
  echo "Creating container: $container_name"
  docker run -d --name "$container_name" --network="$network_name" \
    -v "$(pwd):/kong/declarative/" \
    -e "KONG_DATABASE=off" \
    -e "KONG_DECLARATIVE_CONFIG=/kong/declarative/kong.yml" \
    -e "KONG_PROXY_ACCESS_LOG=/dev/stdout" \
    -e "KONG_ADMIN_ACCESS_LOG=/dev/stdout" \
    -e "KONG_PROXY_ERROR_LOG=/dev/stderr" \
    -e "KONG_ADMIN_ERROR_LOG=/dev/stderr" \
    -e "KONG_ADMIN_LISTEN=0.0.0.0:8001, 0.0.0.0:8444 ssl" \
    -e "KONG_ADMIN_GUI_URL=http://localhost:8002" \
    -p 8000:8000 \
    -p 8443:8443 \
    -p 127.0.0.1:8001:8001 \
    -p 127.0.0.1:8444:8444 \
    kong:3.8.0
else
  echo "Container $container_name already exists."
  docker start "$container_name"
fi