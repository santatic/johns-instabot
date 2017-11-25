require('dotenv').config()

if (!process.env.INSTA_USERNAME || !process.env.INSTA_PASSWORD) {
  return console.log('create a .env with your instagram login credentials');
}

// npm
const puppeteer = require('puppeteer');

// actions
const login = require('./actions/singles/login');
const startLiking = require('./actions/multiple/startLiking');
const checkForUnfollows = require('./actions/multiple/checkForUnfollows');
// utils
const {
  msToMin,
  randBetween
} = require('./utils');

const handleManager = require('./modules/handleManager');

// settings
const settings = require('./settings.js');


(run = async () => {


  console.log('starting');

  try {

    await handleManager.init();
    const browser = await puppeteer.launch();

    const cookies = await login({
      username: process.env.INSTA_USERNAME,
      password: process.env.INSTA_PASSWORD
    }, browser);

    // console.log(cookies, 'cookies');
    handleManager.setPuppeteerEnv({
      browser,
      cookies
    });

    if (settings.likes && settings.likes.enabled) {
      startLiking(settings.likes.tags, cookies, browser);
    }

    if (settings.follows && settings.follows.targetFollowCount) {
      checkForUnfollows(cookies, browser);
    }

  } catch (e) {
    console.error('TRY ME', e);
    await run();
  }




})();
