const { config } = require("vuepress-theme-hope");
const fs = require('fs');

const category = ["前端", "计算机网络", "浏览器", "操作系统", "其他"]

// 自动生成侧边栏
const sidebar = {}
for(let item of category){
	sidebar[`/${item}/`] = [];
}
for(let category in sidebar){
	const dir = category.slice(1,-1);
	const files = fs.readdirSync(`./docs/${dir}`);
	for(let file of files){
		if(file.endsWith('.md')){
			sidebar[category].push(file.slice(0,-3));
		}else{
			const blogs = fs.readdirSync(`./docs/${dir}/${file}`).map(item => item.slice(0,-3));
			const obj = {
				title: file,
				prefix: file + "/",
				children: blogs,
			};
			sidebar[category].push(obj);
		}
	}
}


let nav = [
	...category.map(item => ({text:item})),
	{
		text:'GitHub',
		link:'https://github.com/Youky1/Youky1.github.io',
	}
]
for(let i = 0; i < nav.length-1; i++){
	nav[i].link = `/category/${nav[i].text}/`
}

module.exports = config({
    themeConfig:{
        author: 'Youky',
		logo:'/author.jpg',
		displayAllHeaders: true,
        nav,
		sidebar,
    },
});