import express from "express";

const app = express();
const port = 3000;

const items = [
    {id: 1, title: "Wake up"},
];

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs", {items: items});
});

app.post("/add", (req, res) => {
    const lastItemID = items.reduce((prev, cur) => {
        if(cur.id > prev)
            prev = cur.id;
        return prev;
    }, 0);
    const data = {
        id: lastItemID + 1,
        title: req.body.title,
    }
    items.push(data);
    res.redirect("/");
});

app.post("/update", (req, res) => {
    try {
        const id = req.body.id;
        const title = req.body.title;
        const index = items.findIndex((item) => item.id === parseInt(id));
        if(index > -1) items[index].title = title;
        res.redirect("/");
    } catch (err) {
        console.log(err);
    }
});

app.post("/delete", (req, res) => {
    try {
        const id = req.body.id;
        const index = items.findIndex((item) => item.id === parseInt(id) );
        items.splice(index, 1);
        res.redirect("/");
    } catch (err) {
        console.log(err);
    }
});

app.listen(port, () => {
    console.log(`Server listening to the port : ${port}`);
});