import express from "express";
import cors from 'cors';
import usersArray from "./data/usersData.mjs";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173"}))

const PORT = process.env.PORT || 3000

app.get(("/api/users"), (req, res) => {
    return res.status(200).send(usersArray)
})

app.post(("/api/users"), (req, res) => {
    const { body } = req;

    const newIndex = usersArray.length === 0 ? 1 : usersArray.at(-1)?.id + 1

    usersArray.push({id: newIndex, user: body.user, username: body.username})

    return res.status(200).send(usersArray)
})

app.get("/api/users/:id", (req, res) => {
    const {
        params: { id },
    } = req;

    const parsedIndex = parseInt(id);
    if(isNaN(parsedIndex)) return res.status(400).send("Invalid id");

    const userIndex = usersArray.findIndex((user) => user.id === parsedIndex);
    if(userIndex === -1) return res.status(404).send("User not found");

    return res.status(200).send(usersArray[userIndex]);
})

app.patch("/api/users/:id", (req, res) => {
    const {
        params: { id },
        body
    } = req;

    const parsedIndex = parseInt(id);
    if(isNaN(parsedIndex)) return res.status(400).send("Invalid id");

    const userIndex = usersArray.findIndex((user) => user.id === parsedIndex);
    if(userIndex === -1) return res.status(404).send("User not found");
    
    usersArray[userIndex] = {...usersArray[userIndex], ...body};
    return res.status(200).send(usersArray);
})

app.delete("/api/users/:id", (req, res) => {
    const {
        params: { id },
    } = req;

    const parsedIndex = parseInt(id);
    if(isNaN(parsedIndex)) return res.status(400).send("Invalid id");

    const userIndex = usersArray.findIndex((user) => user.id === parsedIndex);
    if(userIndex === -1) return res.status(404).send("User not found");
    
    usersArray.splice(userIndex, 1);
    
    return res.sendStatus(200)
})


app.listen(PORT, () => console.log(`Running on port: ${PORT}`))