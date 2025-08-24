require("dotenv").config();

const { Database } = require("./services/db");
const { Scraper } = require("./services/scrap");

async function run() {
  const searchTerm = process.argv[2];

  if (!searchTerm) {
    console.error("Por favor, forneça um termo de busca.");
    console.log('Exemplo: pnpm scrap "termo de pesquisa"');
    process.exit(1);
  }

  const instance = await new Database();
  const db = await instance.getDatabase();
  const scrap = new Scraper(db);

  const resultados = await scrap.scrapeTerm({
    searchTerm,
  });

  const result = await instance.insertInCollection({
    name: "search_results",
    data: resultados.map((resultado) => ({
      title: resultado.title,
      link: resultado.link,
      scrapedAt: new Date(),
    })),
  });

  console.log(`${result.insertedCount} resultados salvos no banco de dados.`);

  await instance.close();
}

run();
