const express = require("express")
const cors = require("cors")


const IngredientRoute = require("./routes/IngredientRoute")
const DifficulteRoute = require("./routes/DifficulteRoute")
const CategorieRoute = require("./routes/CategorieRoute")
const RecetteRoute = require("./routes/RecetteRoute")
const EtapeRoute = require("./routes/EtapeRoute")
const ComprendRoute = require("./routes/ComprendRoute")
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json")

const sms = require("./sms")


const app = express()
const port = process.env.APP_PORT || 5000

app.use(cors())
app.use(express.urlencoded())


app.use("/api",IngredientRoute)
app.use("/api",DifficulteRoute)
app.use("/api",CategorieRoute)
app.use("/api",RecetteRoute)
app.use("/api",EtapeRoute)
app.use("/api",ComprendRoute)


app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);


app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})