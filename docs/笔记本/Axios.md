# 请求方法

## 通用的请求方法

```javascript
axios({
  url: "", // 请求路径
  method: "", // 请求方法
  data: "", // 作为请求主题发送出去的数据，用于POST、PUT等方法
  params: "", // 请求的URL参数，通常用于get请求
  timeout: 1000, // 请求的超时的判定时间（毫秒）
})
  .then()
  .catch();
```

##快捷 GET 请求

```javascript
axios
  .get("url", {
    // 这里填请求的url参数，等同于params参数
  })
  .then()
  .catch();
```

## 快捷 POST 请求

```javascript
axios
  .post("url", {
    // 请求发送的数据，等同于data参数
  })
  .then()
  .catch();
```

# 进行公共配置

> **默认值的顺序：**请求的 config 参数 > 实例中的默认值 > 全局默认值

## 创建 axios 实例

创建实例的目的：复用一些公共配置，之后每次用这个 axios 实例发送请求

```javascript
const instance = axios.create({
  baseUrl: "", // 后续请求开头相同的URL
  // 任意其他参数
});
```

## 全局默认值

```javascript
axios.defaults.baseURL = "";
```

# 请求的响应结构

> 在请求的 then 回调函数中，会接受到的参数 response

```javascript
respon = {
    status:200,			// 请求的状态码
    statusText:''		// 来自服务器的HTTP状态信息
    data:{},			// 服务器提供的相应内容
}
```

# 拦截器

> 在发送请求之前或响应被 then/catch 处理之前进行某些操作

**请求**的拦截器：

```javascript
axios.interceptors.request.use(
  function(config) {
    // 在这里进行请求发送前的操作；
    return config;
  },
  function(error) {
    // 若请求出错，做些什么
    return error;
  }
);
```

**响应**的拦截器：

```javascript
axios.interceptors.response.use(
  function(res) {
    // 对响应数据做点什么
    return res;
  },
  function(err) {
    // 对响应错误做点什么
    return Promise.reject(err);
  }
);
```

为实例添加拦截器：

```javascript
const instance = axios.create({});
instance.interceptors.request.use(/*...*/);
instance.interceptors.response.use(/*...*/);
```

# 错误处理

```javascript
axios.get("url").catch((err) => {
  if (err.response) {
    // 该请求得到了服务器的响应，但状态码显示这次请求出错；
    // 状态码：2xx
  } else if (err.request) {
    // 请求发送成功，但没有收到服务器的回应
  } else {
    // 请求发送失败
  }
});
```

# 并发请求

返回一个 Promise，当请求全部完成时其状态会变为 resolved

> ​ 效果和 Promise.all 相同

```javascript
const request1 = axios.get("url1");
const request2 = axios.get("url2");
const request3 = axios.get("url3");

axios.all([request1, request2, request3]).then(
  axios.spread(function(...responses) {
    const responseOne = responses[0];
    const responseTwo = responses[1];
    const responesThree = responses[2];
    // 利用返回的结果进行各种需要的操作
  })
);
```
