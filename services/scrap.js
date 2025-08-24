const puppeteer = require("puppeteer");

class Scraper {
  constructor(db) {
    this.db = db;
  }

  async scrapeTerm({ searchTerm }) {
    let browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Navegar para o Google e pesquisar
    await page.goto(
      "https://www.google.com/search?q=" + searchTerm + "&tbm=nws",
      {
        waitUntil: "networkidle2",
      }
    );

    console.log("Buscando notícias...");

    // Extrair os resultados
    const noticias = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll("a[jsname='YKoRaf']"));
      return items.map((item) => {
        const title = item.querySelector('div[role="heading"]').innerText;
        const link = item.href;
        return {
          title,
          link,
          scrapedAt: new Date().toLocaleString("pt-BR", {
            timeZone: "America/Sao_Paulo",
          }),
        };
      });
    });

    console.log(`Encontradas ${noticias.length} notícias.`);

    await browser.close();

    return noticias;
  }
}

module.exports = { Scraper };
