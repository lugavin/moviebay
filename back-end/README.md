# MovieBay

## 部署

``` sh
# Redis后台运行
redis-server ~/.applicationmanager/etc/redis.conf

# Node后台运行
npm install forever -g
forever stop|start|restart app.js

psql -h 127.0.0.1 -p 5432 -U moviebay_postgres -d moviebay_moviebay

# 初始化基础数据
scp ~/Projects/moviebay/front-end/dist/dist.zip moviebay@198.252.103.26:/home/public_html
curl -X POST -H "Content-Type: application/json" -d @src/data/dicts.json http://127.0.0.1:3000/dicts
curl -X POST -H "Content-Type: application/json" -d @src/data/videos.json http://127.0.0.1:3000/videos
curl -X POST -H "Content-Type: application/json" -d @src/data/series.json http://127.0.0.1:3000/series
```

## 参考链接

- [Node后台运行](https://github.com/foreversd/forever)
- [Nest 中文文档](https://docs.nestjs.cn/)
- [Nest 中文开发手册](https://cloud.tencent.com/developer/doc/1281)
