# 接口文档

### 1、用户注册

#### 请求URL：
```
http://localhost:3000/user
```

#### 请求方式：
```
post
```

#### 参数类型：body

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|user      |Y       |string   |邮箱地址 |
|password      |Y       |string   |密码 |

#### 返回示例：

```javascript
{
    "code": 0,
    "data": "Success"
}
```

### 2、邮箱验证

#### 请求URL：
```
http://localhost:3000/user/<userId>/verification-email
```

#### 请求方式：
```
get
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|userId      |Y       |string   |用户Id |

#### 返回示例：

```javascript
{
    "code": 0,
    "data": {
        "status": "0", '0'                     //0:未验证邮箱   1：已验证邮箱
        "_id": "5d5d6a1f16e7ab3a2cc96d6e",  //用户Id
        "user": "snile657@outlook.com",       //邮箱
        "vote": [],                              //投票信息
        "created": "2019-08-21T15:58:23.219Z",
        "updated": "2019-08-21T15:58:23.219Z",
        "__v": 0
    }
}
```

### 3、用户登录

#### 请求URL：
```
http://localhost:3000/user/login
```

#### 请求方式：
```
post
```

#### 参数类型：body

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|user      |Y       |string   |邮箱地址 |
|password      |Y       |string   |密码 |

#### 返回示例：

```javascript
{
    "code": 0,
    "data": {
        "sessionToken": "eyJhbGciOiJ...",   //Token
        "sessionExpire": 3600,                //Token有效时间
        "timestamp": 1566403313
    }
}
```

### 4、活动开始

#### 请求URL：
```
http://localhost:3000/campaign/start
```

#### 请求HEADERS：
|key|value|
|:-----|:-------:|
|access-token      |eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV...|


#### 请求方式：
```
post
```

#### 返回示例：

```javascript
{
    "code": 0,
    "data": {
        "status": "1", '1'                      // 1：开始  2：结束
        "_id": "5d5d6d0298f77b235c886b58",    // 活动Id
        "elector": [],                           // 参与候选人信息
        "created": "2019-08-21T16:10:42.845Z",
        "updated": "2019-08-21T16:10:42.845Z",
        "__v": 0,
        "vote_max": 2,                            // 最大限制投票数
        "id": "5d5d6d0298f77b235c886b58"
    }
}
```

### 5、活动结束

#### 请求URL：
```
http://localhost:3000/campaign/end
```

#### 请求HEADERS：
|key|value|
|:-----|:-------:|
|access-token      |eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV...|


#### 请求方式：
```
post
```
#### 参数类型：body

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|campaignId      |Y       |string   |活动Id |
#### 返回示例：

```javascript
{
    "code": 0,
    "data": {
        "status": "2",                           // 1：开始  2：结束
        "_id": "5d5d6d0298f77b235c886b58",     // 活动Id
        "elector": [],                            // 参与候选人信息
        "created": "2019-08-21T16:10:42.845Z",
        "updated": "2019-08-21T16:10:42.845Z",
        "__v": 0,
        "vote_max": 2,                            // 最大限制投票数
        "id": "5d5d6d0298f77b235c886b58"
    }
}
```

### 6、添加候选人

#### 请求URL：
```
http://localhost:3000/elector
```

#### 请求HEADERS：
|key|value|
|:-----|:-------:|
|access-token      |eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV...|


#### 请求方式：
```
post
```
#### 参数类型：body

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|campaign      |Y       |string   |活动Id |
|name      |Y       |string   |候选人名字 |
#### 返回示例：

```javascript
{
    "code": 0,
    "data": {
        "_id": "5d5d6e0d98f77b235c886b59",
        "name": "弥明",
        "campaign": "5d5c337ec7c0db35a80ac3bb",
        "__v": 0
    }
}
```

### 6、删除候选人

#### 请求URL：
```
http://localhost:3000/elector/<electorId>
```

#### 请求HEADERS：
|key|value|
|:-----|:-------:|
|access-token      |eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV...|


#### 请求方式：
```
delete
```
#### 参数类型：param

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|electorId      |Y       |string   |候选人Id |
#### 返回示例：

```javascript
{
    "code": 0,
    "data": {
        "_id": "5d5d6e0d98f77b235c886b59",
        "name": "弥明",                            //候选人姓名
        "campaign": "5d5c337ec7c0db35a80ac3bb", //活动Id
        "__v": 0
    }
}
```

### 7、投票

#### 请求URL：
```
http://localhost:3000/user/vote
```

#### 请求HEADERS：
|key|value|
|:-----|:-------:|
|access-token      |eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV...|


#### 请求方式：
```
post
```
#### 参数类型：body

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|userId      |Y       |string   |用户Id |
|electorId      |Y       |string   |候选人Id |
|campaignId      |Y       |string   |活动Id |
#### 返回示例：

```javascript
{
    "code": 0,
    "data": "success"
}
```

### 8、查询投票结果

#### 请求URL：
```
http://127.0.0.1:3000/campaign/<campaignId>
```

#### 请求HEADERS：
|key|value|
|:-----|:-------:|
|access-token      |eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV...|


#### 请求方式：
```
get
```
#### 参数类型：param

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|campaignId      |Y       |string   |活动Id |
#### 返回示例：

```javascript
{
    "code": 0,
    "data": [
        {
            "vote_num": 7,                          //候选人投票总数
            "_id": "5d5c3408c7c0db35a80ac3bd",   //活动Id
            "electorId": {
                "name": "弥明"                         //候选人姓名
            }
        }
    ]
}
```
