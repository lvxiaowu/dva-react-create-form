
# mockjs
* 安装mockjs
```javascript
    npm install dva-cli -g
```
*配置.roadhogrc.mock.js 设置如下
```javascript
    const fs=require('fs');
    const path=require('path');
    const mockPath=path.join(__dirname+'/mock');

    const mock={};
    fs.readdirSync(mockPath).forEach(file=>{

        Object.assign(mock,require('./mock/'+file));
    });
    module.exports=mock;
```