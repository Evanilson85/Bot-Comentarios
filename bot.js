const puppeteer = require("puppeteer");
const readline = require("readline-sync");
const bot = async () => {
  let url = "https://www.instagram.com/";
  let options = {
    headless: false,
    // devtools: true,
    defaultViewport: {
      width: 775,
      height: 812
    }
  };
  let user = readline.question("Qual o seu usuario ou email?") || "email";
  let password = readline.question("Qual a sua senha?") || "senha";
  let pesquisarUsuario = readline.question("Qual o usuario de buscar?") || "pesquisar Usuario";
  //   const numberPost = readline.question("Qual a posição do post?") || "numero do post";
  const menssage = readline.question("Qual a sua mensagem?") || "mensagem post";
  const loops = readline.question("Quantas vezes devo repetir a mensagem?") || "numero do loop";

  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  await page.goto(url);

  let inputName = await page.waitForSelector("input[name=username]");
  let inputPassword = await page.waitForSelector("input[name=password]");

  await inputName.click();
  await page.keyboard.type(user, { delay: 50 });

  await inputPassword.click();
  await page.keyboard.type(password, { delay: 50 });

  let button = await page.waitForSelector("[type=submit]");
  await button.click();

  await page.waitForNavigation();
  
  //  await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });

  //   let agoraNao = await page.$(".cmbtv [type=button]");
  //   if(agoraNao) await agoraNao.click();

  await delay(5000);

  let close = await page.$(".HoLwm");
  await close.click();

  let pesquisar = await page.$(".x3qfX");
  await pesquisar.click();
  await page.keyboard.type(pesquisarUsuario, { delay: 50 });

  await delay(6000);

  let usuarioSelect = await page.$$(".fuqBx a");
  await usuarioSelect[0].click();

  await page.waitForNavigation();

  await delay(5000);

  await page.evaluate((e) => {
    let links = document.querySelectorAll(".KL4Bh");
    let linkList = [...links];
    linkList[0].click(); //! atribuir manual

    return;
  });

  await delay(5000);
  for (let i = 1; i <= Number(loops); i++) {
    let mensagem = await page.waitForSelector("form textarea");
    await mensagem.click();
    await page.keyboard.type(menssage, { delay: 50 });

    let submitText = await page.waitForSelector("[type=submit]");
    await submitText.click();

    await delay(30000);
  }
};

bot();

function delay(timeout) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}
