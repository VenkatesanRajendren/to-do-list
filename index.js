import express from "express";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "Venky@2001",
    database: "to_do_list",
});

db.connect();

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM items ORDER BY id");
        const items  = result.rows;
        res.render("index.ejs", {items: items});
    } catch (err) {
        console.log(err);
        res.send("Error occured while accessing this page");
    }
    
});

app.post("/add", async (req, res) => {
    try {
        const data = [req.body.title];
        await db.query("INSERT INTO items (title) VALUES ($1)", data);
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.send("Error occured while adding an item");
    }
});

app.post("/update", async (req, res) => {
    try {
        const data = [req.body.title, req.body.id];
        await db.query("UPDATE items SET title = $1 WHERE id = $2", data);
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.send("Error occured while updating the item");
    }
});

app.post("/delete", async (req, res) => {
    try {
        const data = [req.body.id];
        await db.query("DELETE FROM items WHERE id = $1", data);
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.send("Error occured while deleting the item");
    }
});

app.listen(port, () => {
    console.log(`Server listening to the port : ${port}`);
});