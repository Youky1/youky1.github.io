const { config } = require("vuepress-theme-hope")
const fs = require("fs")

const category = ["前端", "后端", "计算机网络", "浏览器", "操作系统", "其他"]

let readme = "# Personal blog of Youky\n"

// 自动生成Readme

for (const cate of category) {
  readme += `\n## ${cate}\n`
  const baseUrl = `https://youky1.github.io/${cate}`
  const dirs = fs.readdirSync(`./docs/${cate}`)
  for (const content of dirs) {
    // 一级目录下直接是文件
    if (content.endsWith(".md")) {
      const fileName = content.slice(0, -3)
      readme += `- [${fileName}](${baseUrl}/${fileName})\n`
    } else {
      // 嵌套的层级结构
      readme += `\n### ${content}\n`
      fs.readdirSync(`./docs/${cate}/${content}`).forEach((item) => {
        const name = item.slice(0, -3)
        readme += `- [${name}](${baseUrl}/${content}/${name}) \n`
      })
    }
  }
}

fs.writeFileSync("./README.md", readme)

// 自动生成侧边栏
const sidebar = {}
for (let item of category) {
  sidebar[`/${item}/`] = []
}
for (let category in sidebar) {
  const dir = category.slice(1, -1)
  const files = fs.readdirSync(`./docs/${dir}`)
  for (let file of files) {
    if (file.endsWith(".md")) {
      sidebar[category].push(file.slice(0, -3))
    } else {
      const blogs = fs
        .readdirSync(`./docs/${dir}/${file}`)
        .map((item) => item.slice(0, -3))
      const obj = {
        title: file,
        prefix: file + "/",
        children: blogs
      }
      sidebar[category].push(obj)
    }
  }
}

const nav = [
  ...category.map((item) => ({
    text: item,
    link: `/category/${item}/`
  })),
  {
    text: "GitHub",
    link: "https://github.com/Youky1/Youky1.github.io"
  }
]

module.exports = config({
  themeConfig: {
    author: "Youky",
    logo: "/author.jpg",
    displayAllHeaders: true,
    nav,
    sidebar
  }
})
