---
category: 其他
---

# 如何用一键下载 B 站视频

为了方便的下载 B 站的视频，我用 Nodejs 写了个小工具，一开始使用了`ibili`这个库进行下载，但由于不能自定义下载目录的问题，不便修改，于是自己造了个轮子。

[仓库地址](https://github.com/Youky1/bilibili-save-nodejs)，欢迎 star。

## 功能

- 根据 URL 下载单个作品
- 根据 UP 主的主页 URL 下载所有作品
- 可选择下载视频或音频

## 环境要求

使用本工具需要有 Node 和 npm，如果还没有的可以去[官网](http://nodejs.cn/download/)下载安装。

## 使用

安装：

```shell
npm i bilibili-save-nodejs
```

### 使用命令行工具

```
bili-download
```

根据命令行菜单选择要下载的内容和形式

> 夹带私货：一键追星，下载[九三](https://space.bilibili.com/313580179)的所有视频：

```
bili-download -d
```

### 使用 Node.js API

| 函数名                | 作用                      |
| --------------------- | ------------------------- |
| `download`            | 下载                      |
| `downloadByVedioPath` | 根据视频 URL 下载单个作品 |
| `downloadByHomePath`  | 根据 UP 主页下载所有作品  |

### API 参数

注：三个函数的参数都为对象形式。

#### download

| 参数名         | 是否必须 | 取值范围                 | 含义                                     |
| -------------- | -------- | ------------------------ | ---------------------------------------- |
| downloadRange  | 是       | `['byAuthor','byVedio']` | 根据**作者主页 URL**或**作品 URL**       |
| downloadType   | 是       | `['mp4','mp3']`          | 下载**视频**或**音频**                   |
| downloadPath   | 是       | 无                       | 合法的**作品 URL**或**UP 主页 URL**      |
| downloadFolder | 否       | 无                       | 存储目录的**完整路径**，缺省时使用默认值 |

目录默认值：

- 视频：根目录下`/video`文件夹中
- 音频：根目录下`/audio`文件夹中

**demo：**

```javascript
const { download } = require("bilibili-download-nodejs");
download({
  downloadRange: "byAuthor",
  downloadType: "mp4",
  downloadPath: "https://space.bilibili.com/313580179",
})
  .then(() => console.log("下载成功"))
  .catch((e) => console.log("下载出错"));
```

#### downloadByVedioPath & downloadByHomePath

| 参数名 | 是否必须 | 取值范围        | 含义                   |
| ------ | -------- | --------------- | ---------------------- |
| type   | 是       | `['mp4','mp3']` | 下载**视频**或**音频** |
| url    | 是       | 无              | 合法的**作品 URL**     |
| folder | 是       | 无              | 存储目录的**完整路径** |

**demo：**

```javascript
const { downloadByVedioPath, downloadByHomePath } = require("./download.js");
const path = require("path");

// 下载单个作品的视频
downloadByVedioPath({
  url: "https://www.bilibili.com/video/BV1AL4y1L7cg",
  type: "mp4",
  folder: path.join(__dirname, "/foo"),
})
  .then(() => console.log("下载成功"))
  .catch((e) => console.log("下载出错"));

// 下载UP主所有作品的音频
downloadByHomePath({
  url: "https://space.bilibili.com/313580179",
  type: "mp3",
  folder: path.join(__dirname, "/bar"),
})
  .then(() => console.log("下载成功"))
  .catch((e) => console.log("下载出错"));
```

## 原理介绍

介绍完用法，简单介绍本项目的原理。

### 根据视频 URL 下载视频

#### 根据 URL 获取 bvid

bvid 是现在 b 站视频的唯一标识，也是后续操作的必备参数。但为了方便使用，直接复制作品的 URL 更好理解和操作。

其实 bvid 就存在于 URL 之中，只需要做简单的字符串操作：

```javascript
const urlList = url.split("/");
const bvid = urlList[urlList.length - 1].split("?")[0];
```

#### 根据 bvid 获取 cid 数组与作品标题

对于多 p 视频，仅通过 bvid 无法确定请求的是哪一 p 视频，此时 cid 起到了唯一标识视频的作用。通过浏览器抓包分析接口，可知获取 cid 的方法为：

```javascript
const getCidByBvid = async (bvid) => {
  const res = await axios.get("https://api.bilibili.com/x/web-interface/view", {
    params: {
      bvid,
    },
  });
  return res.data.data.pages.map((item) => item.cid);
};
```

该接口用于查询作品信息，因此获取作品标题的方法为：

```javascript
const getTitleByBvid = async (bvid) => {
  const res = await axios.get("https://api.bilibili.com/x/web-interface/view", {
    params: {
      bvid,
    },
  });
  return res.data.data.title;
};
```

#### 根据 bvid 获取视频下载地址数组

1. 首先，根据 bvid 获取 cid 数组
2. 对于每个 cid，与 bvid 一起唯一标识了视频，进行请求
3. 根据下载类型的不同（视频或音频），传入参数会不同。

参数含义：

- `fnval`设为 16 时，音视频将会分离，此时可以达到只下载音频的目的
- `qn`参数标识清晰度，对照如下

| 清晰度 | 字段取值 |
| ------ | -------- |
| 4K     | 120      |
| 1080p+ | 112      |
| 1080p  | 80       |
| 720p   | 64       |
| 480p   | 32       |
| 360p   | 16       |

完整实现代码为：

```javascript
const getDownloadPathById = async (bvid, type) => {
  const cidList = await getCidByBvid(bvid);
  const result = [];
  for (const cid of cidList) {
    const params = {
      bvid,
      cid,
      qn: 112,
    };
    if (type === "mp3") {
      params.fnval = 16;
    }
    const res = await axios.get("https://api.bilibili.com/x/player/playurl", {
      params,
    });
    result.push(
      type === "mp3"
        ? res.data.data.dash.audio[0].baseUrl
        : res.data.data.durl[0].url
    );
  }
  return result;
};
```

#### 根据下载地址下载资源

`getDownloadPathById`返回的是下载地址，但直接在浏览器打开会报错，这是因为 request header 必须带有 `referer` 字段。

通过抓包可知， `referer` 字段取值就是视频地址，因此：

```javascript
const getRefererByBvid = (bvid) => `https://www.bilibili.com/video/${bvid}`;
```

下载资源的思路是：

- 检查目标文件是否存在，若存在不重复下载
- 根据 bvid 获取 `referer` 字段
- 请求资源
- 写入文件

完整实现：

```javascript
const downloadResource = async ({ url, referer, folder, title, type }) => {
  const target = path.join(folder, `${title}.${type}`);
  if (fs.existsSync(target)) {
    console.log(`视频 ${title} 已存在`);
    return Promise.resolve();
  }
  const res = await axios.get(url, {
    headers: {
      referer,
    },
    responseType: "stream",
  });
  console.log(`开始下载：${title}.${type}`);
  const writer = fs.createWriteStream(target);
  res.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
};
```

### 根据 UP 主页 URL 下载视频

#### 根据 UP 主页 URL 获取 mid

mid 是每个 B 站用户的唯一标识。同样为了方便理解和使用，暴露的接口使用 UP 主页 URL，进行字符串处理获取 mid：

```javascript
const getMidByUrl = (url) => {
  const reg = /space.bilibili.com\/(?<mid>\d+)/;
  return url.match(reg).groups?.mid;
};
```

#### 根据 up 主 mid 获取视频主页地址

根据抓包可知，获取主页信息需要三个参数：

- mid：账号标识
- ps：每页视频数量
- pn：当前页数

将每页数量使用默认的 30，获取主页的操作可以写为：

```javascript
const getHomeUrl = (mid, currentPage) =>
  `https://api.bilibili.com/x/space/arc/search?mid=${mid}&ps=30&pn=${currentPage}`;
```

通过抓包分析返回的数据，返回结果的`data.list.vlist`即为视频的信息，其中可以获得 bvid，之后的下载流程同上。

## 参考

- [『B 站 API 学习』不使用插件下载 B 站视频](https://www.bilibili.com/read/cv6415114)
- [Bilibili 开放接口](https://www.bilibili.com/read/cv7914570/)
- [一分钟教你发布 npm 包](https://zhuanlan.zhihu.com/p/147804428)
