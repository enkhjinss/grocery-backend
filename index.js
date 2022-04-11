import express from "express";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebase.js";

const app = express();
// app.use(express.json())
const port = 8080;

app.get("/", (req, res) => {
    res.send("OK");
});


//List product
app.get("/products", async (req, res) => {
    const snapshot = await getDocs(collection(db, "products"));
    const products = [];
    for (const doc of snapshot.docs) {
        products.push({
            id: doc.id,
            ...doc.data(),
        });
    }
    res.send(products);
});



//Create product
app.post("/products", async (req, res) => {

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

app.use("*", (req, res) => {
    res.status(404).send("This page is not found");
});

app.listen(port, () => {
    console.log("hsj");
});
