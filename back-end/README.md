# MovieBay

## Project setup

``` yml
# postgres/docker-compose.yml
version: '3.7'
services:
  postgres:
    container_name: postgres
    image: postgres
    restart: always
    ports:
      - 5432:5432
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
```

``` yml
#  redis/docker-compose.yml
version: '3.7'
services:
  redis:
    container_name: redis
    image: redis
    restart: always
    ports:
      - 6379:6379
```

``` sh
$ docker-compose -f postgres/docker-compose.yml -f redis/docker-compose.yml up -d

$ npm install
$ npm start

# init data
$ cd back-end
$ curl -X POST -H "Content-Type: application/json" -d @src/data/dicts.json  http://127.0.0.1:3000/dicts
$ curl -X POST -H "Content-Type: application/json" -d @src/data/videos.json http://127.0.0.1:3000/videos
$ curl -X POST -H "Content-Type: application/json" -d @src/data/series.json http://127.0.0.1:3000/episodes
```

## 参考链接

- [Nest 中文文档](https://docs.nestjs.cn/)
