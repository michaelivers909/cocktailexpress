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
      "INSERT into cocktail(user_Id, gif, drink_Id, drink, ingredients, instructions) VALUES(?,?,?,?,?,?,?)",
      [
        cocktail.user_Id,
        cocktail.gif,
        cocktail.drink_Id,
        cocktail.drink,
        cocktail.ingredients,
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

async function remove(res, id) {
  try {
    await pool.query("DELETE from cocktails WHERE cocktails.id = ?", [id]);
    return res.send({
      success: true,
      data: " Saved cocktail successfully deleted.",
      error: null,
    });
  } catch (err) {
    return res.send({
      success: false,
      data: null,
      error: err,
    });
  }
}

async function byUser_id(res, user_Id) {
  try {
    const [cocktails] = await pool.query(
      "SELECT * FROM cocktails WHERE cocktails.user_id = ?,"[user_id]
    );
    return res.send({
      success: true,
      data: cocktails,
      error: null,
    });
  } catch (err) {
    return res.send({
      success: false,
      data: null,
      error: err,
    });
  }
}

module.exports = { add, remove, byUser_id };
