# node-crawler

>本人比较喜欢漂亮事物，比较小姐姐，各种风景名胜，也经常在刷一些相关的网站。刚好最近在学 Node.js , 就用Node.js 做一个爬虫扒一下网上的小姐姐，刚好也试试自己的水平

## V1.0版本使用模块
1. cheerio 
2. https
3. fs 流文件系统

### cheerio

**cheerio 本质上类似jquery语法来操作HTML文档的库，可以让你在服务器端愉快地跟 HTML文档玩耍。但是使用 cherrio 爬取数据，请求到的只是静态文档，如果网页内部的数据有通过 ajax动态获取的，那么便爬取不到相应的数据。在我第一版，使用的就是 cheerio, 爬取的数据数据，也就是小姐姐的照片，都是清一色的压缩图，gif格式的图片内容则一动不动**

### 如何解决以上难题
 在看了网页之后，发现网页加载时，给出的是同规格大小的压缩图，如果要看大图，长图，gif动图，就需要点击按钮来显示隐藏的标签， cheerio 就露出了自己短板所在。百度上一顿giao, 发现 puppeteer 能够模拟一个浏览器的运行环境，能够请求网站信息，并运行网站内部的逻辑。实在是吊到不行。还能够模似用户行为，比如各种操作（点击、滑动、hover等），支持跳转页面，多页面管理。

 ## V2.0版本使用模块
 1. puppeteer
 2. fs 流文件系统
 3. chalk 