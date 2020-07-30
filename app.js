/*
 * @Author: Cat 
 * @Date: 2020-07-30 16:54:48 
 * @Last Modified by:   Cat 
 * @Last Modified time: 2020-07-30 16:54:48 
 */


const https = require('https');  // http 网络
const cheerio = require('cheerio'); // html 解析
const fs = require('fs') // 文件流

const queryHref = "https://www.hahamx.cn/topic/1/new/";  // 被查询的目标网址
let querySearch = 1;  // 设置分页位置
let urls = [];  // 所有待下载的图片地址
const pageMax = 1;
let satrtIndex = 1;

let sumCount = 0;
let reptCount = 0;
let downCount = 0;

/**
 * 根据 url 和参数获取分页内容
 * @param {String}: url
 * @param {int}: search
 */


function getHtml(href, search) { 
  console.log("正在获取第"+ search + "页的图片");
  let pageData = "";
  const req = https.get(href+search, res=> {
    res.setEncoding('utf8');
    res.on('data', function (chunk) { 
      pageData += chunk;
    });

    res.on('end', function () { 
      $ = cheerio.load(pageData);
      let html = $(".joke-list-item .joke-list-item-main .joke-main-content a img");
      // console.log('html',html);
      for (let i = 0; i < html.length; i++) {
        const src = html[i].attribs['data-original'];
        console.log('src',html[i].attribs);
        // 筛选部分广告
        if (src && src.indexOf("image.yangpinwang.com") > -1) {
          urls.push(src)
        }
      }
      // console.log('urls',urls);

      // 递归调用
      if (search < pageMax) {
        getHtml(href, ++search)
      } else {
        console.log("图片链接获取完毕！");
        sumCount = urls.length;
        console.log("链接总数量："+ urls.length);
        console.log("开始下载.......");
        downImg(urls.shift());
      }
    })
  })
}

/**
 * 下载图片
 * @param {String} imgurl 图片地址
 */

function downImg(imgurl) { 
  const narr = imgurl.replace("https://image.yangpinwang.com/","").split('/');
  // console.log(narr);
  const fileName = './upload/' + narr[0] + narr[1] + narr[2] + "_"  + narr[4];
  fs.exists(fileName, function(b) {
    if(!b) {
      https.get(imgurl.replace("/small",'/big'),function (res) { 
        let imgData = "";
        //一定要设置response的编码为binary否则会下载下来的图片打不开
        res.setEncoding('binary');
        res.on("data",function(chunk) {
          imgData += chunk;
        })

        res.on('end',function() {
          let savePath = './upload/'  + narr[0]  + narr[1] + narr[2] + "_" + narr[4];
          fs.writeFile(savePath, imgData, "binary", function(err) {
            if (err) {
              console.log(err);
            } else {
              console.log(narr[0]  + narr[1] + narr[2] + "_" + narr[4]);
              if (urls.length > 0) {
                downImg(urls.shift());
                downCount++;
                console.log("剩余图片数量.....");
              }
            }
          })
        })
      })
    } else {
      // 统计重复的图片
      console.log('该图片已经存在重复')
      reptCount++;
      if (urls.length > 0) {
        downImg(urls.shift());
      }
    }

    if (urls.length <= 0) {
      console.log('下载完毕');
      console.log("重复图片："+ reptCount);
      console.log("实际下载："+ downCount);
    }
  })
}

function start() { 
  console.log("开始获取图片连接");
  getHtml(queryHref,satrtIndex);
}

start();