/*
 * @Author: Cat 
 * @Date: 2020-07-31 16:03:40 
 * @Last Modified by: Cat
 * @Last Modified time: 2020-07-31 17:58:14
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const chalk = require('chalk');

const setting = {
  headless: false
}

async function getHtml() {
  const browser = await puppeteer.launch(setting);
  log(chalk.green('服务正常启动'));
  try {
    const page = await browser.newPage();
  } catch (error) {
    
  }
  
  await page.goto('https://www.hahamx.cn/topic/1/new/1');
  await page.screenshot({path: '1.png'});
  await browser.close();
}


getHtml();