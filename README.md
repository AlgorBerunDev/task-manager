Run build services

```
docker-compose build
```

Run applications without building

```
docker-compose up
```

Run applications in the background

```
docker-compose up -d
```

Run applications if Dockerfile updated first step build after run application

```
docker-compose up --build
```

All list docker images

```
docker images
```

Logs only one service

```
docker logs <service name>
```

List docker volumes

```
docker volume ls
```

Run development docker-compose

```
docker-compose -f docker-compose.yml -f docker-compose.development.yml up --build
```

```
docker ps
```

```
docker exec -it <service-name> <command>
docker exec -it realworld-docker-api echo "Foo"
```

```
docker exec -it <service-name> sh
docker exec -it realworld-docker-api sh
```

```
docker network COMMAND
docker network ls
```

Remove unused

```
docker system prune
```

```
docker system
```
