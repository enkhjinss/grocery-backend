// import { async } from "@firebase/util";
import express from "express";
import cors  from "cors";
import {
    collection,
    getDocs,
    addDoc,
    getDoc,
    doc,
    setDoc,
    deleteDoc
} from "firebase/firestore";
import { db } from "./firebase.js";

const app = express();
const port = 8080;
app.use(cors())

app.use(express.json());
// app.use((req, res, next) => {
//     next();
// });

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
    const data = req.body;
    const docRef = await addDoc(collection(db, "products"), data);

    res.status(201).send({
        id: docRef.id,
        ...data,
    });
});

const errorHandleWrapper = (fun) => {
    return async (req, res, next) => {
        try {
            return await fun(req, res, next);
        } catch (e) {
            next(e);
        }
    };
};

//Product detail
app.get(
    "/products/:id",
    errorHandleWrapper(async (req, res) => {
        const docRef = doc(db, "products", req.params.id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            throw new Error(`Document with id not exist}`);
        }

        res.status(200).send({
            id: docSnap.id,
            ...docSnap.data(),
        });
    })
);

//Edit product

app.patch("/products/:id", async (req, res) => {
    const docRef = doc(db, "products", req.params.id);
    await setDoc(docRef, req.body, { merge: true });
    const docSnapshot = await getDoc(docRef);

    res.send({
        id: docSnapshot.id,
        ...docSnapshot.data(),
    });
});

//Delete product
app.delete("/products/:id", async (req, res) => {
    await deleteDoc(doc(db, "products", req.params.id));
    res.send(`${req.params.id} id-tai product ustlaa`);
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
    console.log("started");
});
