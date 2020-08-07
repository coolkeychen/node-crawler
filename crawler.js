/*
 * @Author: Cat 
 * @Date: 2020-07-31 16:03:40 
 * @Last Modified by: Cat
 * @Last Modified time: 2020-08-07 15:30:15
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const chalk = require('chalk');  // 一个美化 console 的输出库

const setting = {
  // 设置超时时间
  timeout: 15000,
  // 如果是访问https页面，此属性会忽略 https错误
  ignoreHTTPSErrors: true,
  // 关闭 headlesss模式，不会打开浏览器
  headless: false
}


const log = console.log;
const TOTAL_PAGE = 2;


async function getHtml() {
  const browser = await puppeteer.launch(setting);
  log(chalk.green('服务正常启动'));
  try {
    const page = await browser.newPage();
    
    await page.goto('https://www.hahamx.cn/topic/1/new/1');
    await page.waitFor(2000);

    await page.screenshot({
      path: '1.png',
      type: 'png',
      fullPage: true,
    });
    // 所有的数据爬取完毕后关闭浏览器
    await browser.close();
    log(chalk.green('数据成功爬取完成！！'))
  } catch (error) {
    console.log(error);
    log(chalk.red('服务意外终止'));
    await browser.close();
  } finally {
    // 最后要退出进程
    process.exit(0)
  }
  
};

getHtml();


