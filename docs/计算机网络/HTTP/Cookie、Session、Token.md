---
category: 计算机网络
tag:
    - 应用层
    - HTTP
---
# Cookie、Session、Token

## Cookie

### 作用

解决HTTP协议无状态的特点，在客户端和服务器的交互过程中，记录用户特征。

### cookie的工作流程

1. 用户访问网站，站点对该用户生成一个唯一的标识（假设为123），以该标识作为索引在后端数据库中生成一个表项
2. 服务器返回的**响应报文**中，包含一个cookie首部行：```Set-cookie:123```
3. 用户接收到该响应后，在它管理的*cookie文件*中添加一行，包括该服务器的主机名称和cookie值（123）
4. 该用户后续访问该域名时，会附带一个**cookie首部行**：```cookie:123```
5. 网站根据接收到的cookie值，做出相应的响应

### 有效时间

cookie的有效时间通过`Expires`和`Max-Age`属性来设置。
- Expires定义的是过期的时间戳，是相对于服务器的时间的。如果客户端时间和服务器不一致，或是手动更改了时间，就没有意义了
- max-age定义的是时间间隔，单位为秒，从浏览器收到报文开始计算

### 作用域

通过domain和path两个属性确定cookie的有效域名和路径。
- 父域名的cookie子域名可以使用，**反之不成立**
- 与域名对应的IP地址不能共享
- 指定路径的子路径，都可以共享cookie

### 安全性

- 设置`secure`属性的cookie，只允许使用https发送。
- 设置`HttpOnly`属性的cookie，不能通过JS进行操作
- 设置`SameSite`属性，来控制跨站请求时不能携带cookie

### 缺点

- 容量上，cookie的容量只有4KB，存储内容有限
- 性能上，域名下的页面无论是否需要都会发送cookie，造成浪费
- 安全性上，cookie通过明文传输，容易被拦截窃取

## Session

### 特点

- 存储在服务器端
- 对每一个用户，生成唯一的Session ID，每个ID对应一份用户信息。并将ID返回给用户
- 用户在后续请求时附带这个Session ID，服务端即可识别用户的身份

### 与cookie的区别

- cookie是将信息直接全部存入cookie中
- session方法只将ID放入cookie，而用户信息存在服务器上，避免了信息泄露

### 缺点

- 大量用户信息会占用服务器资源
- 如果Session信息存储在一台服务器上，则访问集群中其他服务器时无法获取登录状态
- 如果将所有Session信息集中到一台服务器上，则该服务器一旦出现故障所有登录状态会出现丢失

## Token

### 流程

1. 用户登录
2. 认证成功后，生成一个JSON对象（JSON Web Token，简称jwt）
3. 对jwt使用自己的秘钥进行加密，然后返回给客户端
4. 客户端再次请求时，附带这个jwt
    - 可以附带在Cookie中，但不能跨域。解决方法是放在POST请求的body里
    - 可以放在请求头的`Authorization`字段中
5. 服务端对jwt的合法性进行验证，若合法则返回相关数据

### jwt的结构

#### Header（头部）

一个JSON对象，包含两部分：
1. 使用的签名算法
2. Token类型（JWT）

#### Payload（负载）

一个JSON对象，用于存放需要传递的数据。官方定义了七个字段：
- iss (issuer)：签发人
- exp (expiration time)：过期时间
- sub (subject)：主题
- aud (audience)：受众
- nbf (Not Before)：生效时间
- iat (Issued At)：签发时间
- jti (JWT ID)：编号

#### Signature（签名）

对前两部分的签名，是为了**防止数据被篡改**

1. 首先指定一个只有服务端自己知道的秘钥secret
2. 使用Header里指定的算法对Header、Payload、secret进行签名。

### 缺点

- 默认不加密，此时不能写入私密信息
- 无法在token到期前终止token的权限，除非在服务端部署额外逻辑
- jwt一旦被盗用，则盗用者可以获得权限