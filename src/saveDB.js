const client = require("./DBConnection");
client.connect();
var teste = localStorage.getItem("LotesUsados");
async function savingDB() {
  await client.connect();
  const result = await client.query(
    "insert into art(geom,artista,edificio,logradouro,ano)values($1,$2,$3,$4,$5) RETURNING *",
    [teste, "123", "123", "123", "123"]
  );
  console.log(result.rows);
  console.log(result.rowCount);
  client.end();
}
