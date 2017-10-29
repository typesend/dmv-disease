const puppeteer = require('puppeteer');
const findRemoveSync = require('find-remove');

const headlessMode = (process.env.HEADLESS === 'true');
const ua = 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:39.0) Gecko/20100101 Firefox/39.0';

class Geppetto {
  constructor() {
    this.steps = 0;
    this.lastStepTime = new Date();
    this.ua = ua;
  }

  async initialize(startingURL) {
    this.cleanupScreenshots();
    this.browser = await puppeteer.launch({
      headless: headlessMode,
      slowMo: (headlessMode ? 0 : 222)
    });
    this.tab = await this.browser.newPage();
    await this.tab.emulate({
      userAgent: this.ua,
      viewport: { width: 1024, height: 768, deviceScaleFactor: 1}
    })
    console.log("Navigating to " + startingURL);
    await this.tab.goto(startingURL);
    await this.takeScreenshot('_open');
    await this.tab.waitFor(500);
    // this.tab.on('frameattached', (frame) => {
    //   console.log('attached', frame.name())
    // });
    // this.tab.on('framedetached', (frame) => {
    //   console.log('detached', frame.name())
    // });
    this.tab.on('framenavigated', this.injections)
    return this.step();
  }

  injections(frame) {
    const whitelist = ['navbar', 'main', 'message', 'hidden'];
    if (!frame.name().includes(whitelist)) return;
    console.log('INJECTIONS FOR', frame.name());
    (async () => {
      await frame.addScriptTag({'path': 'injections/disease.js'});
      await frame.addStyleTag({'path': 'injections/disease.css'});
    })();
  }

  async login(ease_username, ease_password) {
    let login = await this.tab.mainFrame().evaluate(
      (u, p) => {
        user = document.getElementById('username').value = u;
        document.getElementById('password').value = p;
        console.log("login creds", u, p)
        submitButton = document.getElementsByClassName('commandbutton')[0];
        submitButton.click();
        return user;
      },
      ease_username,
      ease_password
    );
    console.log('LOGGED IN:', login);
    await this.tab.waitFor(800);
    this.dumpFrameset();
    return this.step();
  }

  async modeSelection(officeId=undefined, processType='C', workType='D', workDate=undefined) {
    console.log('modeSelection')
    const screenName = await this.footer().screenName;
    const affordances = {
      processType: 'select#MAIN_FORM\\:operationalMode',
      workType: 'select#MAIN_FORM\\:functionalMode',
      workDate: 'select#MAIN_FORM\\:workDate',
      enterButton: 'input[type=submit]#MAIN_FORM\\:button1',
    };
    // ensure all affordances are present
    for (let affordance in affordances) {
      if (object.hasOwnProperty(affordance)) {
        await this.frame('main').waitForSelector(affordance);
      }
    }
  }

  frame(name) {
    return this.tab.frames().filter(
      (f) => { return f.name() == name }
    )[0];
  }

  async footer() {
    await this.frame('main').waitForSelector('table#panelGrid_footer');
    const text = (n) => {
      [
        'table#panelGrid_footer',
        'td',
        'span#MAIN_FORM\\:outputText' + n
      ].join(' > ')
    };
    return await this.frame('main').evaluate(
      () => {
        var output = function(n) {
          var prefix = 'MAIN_FORM\\:outputText';
          return window.frames.main.document.getElementById(prefix+n).text();
        };
        return {
          screenName: output(1),
          easeVersion: output(18),
          officeEmployee: output(8)
        };
      }
    );
  }

  step() {
    (async () => {
      this.steps = this.steps += 1;
      let elapsed = new Date() - this.lastStepTime;
      console.log("Time since last step:", elapsed);
      await this.tab.waitFor(100);
      await this.takeScreenshot();
    })();
    return this;
  }

  async takeScreenshot(name) {
    let title = await this.tab.title();
    let filename = name || [this.steps, title].join('-');
    const path = 'screenshots/' + filename + '.png';
    let result = await this.tab.screenshot({path: path});
    console.log("Screenshot: " + path);
    return this;
  }

  cleanupScreenshots() {
    return findRemoveSync('screenshots', {extensions: ['.png']});
  }

  dumpFrameset() {
    console.log('DUMPING FRAMESET TREE');
    dumpFrameTree(this.tab.mainFrame(), '');
    console.log('END FRAMESET TREE');

    function dumpFrameTree(frame, indent) {
      console.log(indent + frame.name() + '[' + frame.url() + ']');
      for (let child of frame.childFrames())
        dumpFrameTree(child, indent + '  ');
    }
  }

  close() {
    if (process.env.HEADLESS) return;
    (async () => {
      await this.takeScreenshot('_close');
      await this.browser.close();
    })();
    console.log("BROWSER CLOSED");
  }

}

module.exports = Geppetto;
