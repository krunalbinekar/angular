const express = require("express");
const cors = require("cors");
const addUser = require("./adduser");

const app = express();
app.use(express.json());
app.use(cors());

//Insert data for register
app.post("/register",async (req, res) => {

    try {
        const input = req.body;
        await addUser.insertData(input);
        res.json({ Message: "Successfully Executed :) " });
    }
    catch (err) {
        res.sendStatus(500);
    }
});

//login authentication
app.post("/login", async(req, res) => {

    try {
        const input = req.body;
       await addUser.loginUser(input);
        res.json({ opr:true });
    }
    catch (err) {
        res.sendStatus(500);
    }
});


//const PORT = process.env.PORT || 3000
app.listen(3000);
console.log(`Server is running on Port: 3000.`);


