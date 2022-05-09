const puppeteer = require("puppeteer");
const loginlink = 'https://www.hackerrank.com/auth/login';
const email = 'apreetsingh1610@gmail.com';
const password = 'Am@npreet1250';
const ansobj= require('./code');

(async function(){
    try {
       
let browseropen =await puppeteer.launch({
    headless: false,

    args: ['--start-maximized'],
    defaultViewport: null

}); 
let newtab= await browseropen.newPage();
await newtab.goto(loginlink);
await newtab.type("input[type='text'].input",email,{delay : 50});
await newtab.type("input[type='password'].input",password,{delay : 50});
await newtab.click("button[data-analytics='LoginPassword']",{delay : 50});
await waitandclick('.topic-card a[data-attr1="algorithms"]',newtab);
await waitandclick('input[value="warmup"]',newtab);
let allquestion= await newtab.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', {delay: 50});
console.log("total questions:", allquestion.length);
await questionSolver(newtab,allquestion[0],ansobj.answers[0]);


    } catch (error) {
        console.log(error);
    }

})();

async function waitandclick(selector,cpage){
await cpage.waitForSelector(selector);
let selectorclick=await cpage.click(selector);
return selectorclick;

}

async function questionSolver(page ,question, answer){
    await question.click();
    await waitandclick(".monaco-editor.no-user-select.vs", page);
    await waitandclick('.checkbox-input',page);
    await waitandclick('textarea.input.text-area.custominput.auto-width',page);
    await page.type('textarea.input.text-area.custominput.auto-width',answer, {delay:50});
    await page.keyboard.down('Control');
    await page.keyboard.press('A',{delay:100});
    await page.keyboard.press('X',{delay:100});
    await page.keyboard.up('Control');
    await waitandclick('.monaco-editor.no-user-select.vs',page);
    await page.keyboard.down('Control');
    await page.keyboard.press('A',{delay:100});
    await page.keyboard.press('V',{delay:100});
    await page.keyboard.up('Control');
    let submited= await page.click('.hr-monaco-submit',{delay:50});
    return submited;  


}