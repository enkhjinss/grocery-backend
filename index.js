import express from "express";

const app = express();
const port = 8080;

app.get("/", (req, res) => {
    res.send("OK");
});

//List products
app.get("/products", (req, res) => {
    res.send("products");
});
//Create product
app.post("/products", (req, res) => {
    res.send("created");
});
//Product detail
app.get("/products/1", (req, res) => {
    // get product from database by id
    res.send({
        name: "Banana",
        price: 123.312,
        description: "Blablabal",
    });
});
//Edit product
app.patch("/products/:id", (req, res) => {
    // get product from database by id
    res.send("edited");
});
//Delete product
app.delete("/products/:id", (req, res) => {
    res.send("deleted");
});




//List categories
app.get("/categories", (req, res) => {
    res.send("categories");
});
//Create category
app.post("/products", (req, res) => {
    res.send("created products");
});




// Get current user details
app.get("/me", (req, res) => {
    res.send("user");
});

app.listen(port, () => {
    console.log("gsd");
});
