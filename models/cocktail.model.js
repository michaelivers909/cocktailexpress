const pool = require("../config/mysql.config");

async function add(res, drink, gif) {
  try {
    if (
      !drink.drink_Id ||
      drink.drink_Id < 1 ||
      drink.drink_Id > 40 ||
      isNaN(drink.drink_Id)
    ) {
      throw "Unable to retrieve cocktail data.";
    }
    await pool.query(
      "INSERT into cocktail(user_Id, gif, drink_Id, drink, indredients, measurements, instructions) VALUES(?,?,?,?,?,?,?)",
      [
        cocktail.user_Id,
        cocktail.gif,
        cocktail.drink_Id,
        cocktail.drink,
        cocktail.ingredients,
        cocktail.measurements,
        cocktail.instructions,
      ]
    );

    res.send({
      success: true,
      data: "Successfully added to Saved Cocktails.",
      error: null,
    });
  } catch (err) {
    console.log(err);
    return res.send({
      success: false,
      data: null,
      error: err,
    });
  }
}
