const puppeteer = require("puppeteer");
const loginlink = 'https://www.hackerrank.com/auth/login';
const email = 'apreetsingh1610@gmail.com';
const password = 'Am@npreet1250';
const ansobj= require('./code');

let page;

let browseropen = puppeteer.launch({
    headless: false,

    args: ['--start-maximized'],
    defaultViewport: null

});
browseropen.then(function (browser) {
    let browseropenpagepromise = browser.newPage();
    return browseropenpagepromise;
}).then(function (newtab) {
    page = newtab;
    let hackerankopenpromise = page.goto(loginlink);
    return hackerankopenpromise;
}).then(function(){
    let emailentered=page.type("input[type='text'].input",email,{delay : 50});
    return emailentered;

}).then(function(){
    let passwordentered=page.type("input[type='password'].input",password,{delay : 50});
    return passwordentered;
}).then(function(){
    let buttonclick=page.click("button[data-analytics='LoginPassword']",{delay : 50} );
    return buttonclick;
}).then(function(){
    let clickalgopro=waitandclick('.topic-card a[data-attr1="algorithms"]',page);
    return clickalgopro;

}).then(function(){
    let gettowarmup=waitandclick('input[value="warmup"]',page);
    return gettowarmup;
}).then(function(){
    let waitforsometime=page.waitFor(3000);
    return waitforsometime;
}).then(function(){
    let allquest=page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', {delay: 50});
    return allquest;
}).then(function(questionArr){
    console.log('No. of question :',questionArr.length);
    let questionwillsolve= questionsolver(page,questionArr[0],ansobj.answers[0]);
})




function waitandclick(selector,Cpage){
    return new Promise(function(resolve, reject){
        let waitforselectorpromise=Cpage.waitForSelector(selector);
        waitforselectorpromise.then(function(){
            let clickmodel=Cpage.click(selector);
            return clickmodel;
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
    })

}

function questionsolver(page, Question, answer){
   return new Promise(function(resolve, reject){
       let questionclicked= Question.click();
        questionclicked.then(function(){
            let editortoreach=waitandclick(".monaco-editor.no-user-select.vs", page);
            return editortoreach;
        }).then(function(){
            return waitandclick('.checkbox-input',page);
        }).then(function(){
            return page.waitForSelector('textarea.input.text-area.custominput.auto-width',page);
        }).then(function(){
            return page.type('textarea.input.text-area.custominput.auto-width',answer, {delay:50});
        }).then(function(){
            let ctrlpressed=page.keyboard.down('Control');
            return ctrlpressed;
        }).then(function(){
            let Aispressed=page.keyboard.press('A',{delay:100});
            return Aispressed;
        }).then(function(){
            let Xispressed=page.keyboard.press('X',{delay:100});
            return Xispressed;
        }).then(function(){
            let ctrlunpressed=page.keyboard.up('Control');
            return ctrlunpressed;
        }).then(function(){
            let editortoreachagain=waitandclick('.monaco-editor.no-user-select.vs',page);
            return editortoreachagain;
        }).then(function(){
            let ctrlpressed=page.keyboard.down('Control');
            return ctrlpressed;
        }).then(function(){
            let Aispressed=page.keyboard.press('A',{delay:100});
            return Aispressed;
        }).then(function(){
            let Vispressed=page.keyboard.press('V',{delay:100});
            return Vispressed;
        }).then(function(){
            let ctrlunpressed=page.keyboard.up('Control');
            return ctrlunpressed;
        })//.then(function(){
          //  return page.click('.hr-monaco__run-code',{delay:40});
       // })
        .then(function(){
        return page.click('.hr-monaco-submit',{delay:50});
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
   })
}