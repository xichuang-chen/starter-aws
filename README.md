# setup
docker-compose.yml 所在目录执行以下命令
- docker-compose down
- docker-compose up -d (若需要重新build，请使用docker-compose up -d --build)
# system
[Please see 1Pager](docs/1pager.md)
# update image to docker hub
- docker tag [REPOSITORY] [docker-hub-user]/[REPOSITORY]
    e.g docker tag frontend twcxc123/frontend
  
# docs
[docker network](docs/docker-network.md)