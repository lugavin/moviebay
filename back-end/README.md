# MovieBay

## 部署

``` sh
# Redis后台运行
redis-server redis.conf

# Node后台运行
npm install forever -g
forever stop|start|restart app.js

# 初始化基础数据
curl -X POST -H "Content-Type: application/json" -d @src/data/genres.json http://127.0.0.1:3000/dicts
curl -X POST -H "Content-Type: application/json" -d @src/data/video.json http://127.0.0.1:3000/videos
```

## 参考链接

- [Node后台运行](https://github.com/foreversd/forever)
- [Nest 中文文档](https://docs.nestjs.cn/)
- [Nest 中文开发手册](https://cloud.tencent.com/developer/doc/1281)
