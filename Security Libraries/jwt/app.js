const express = require("express");
const app = express();

const jwt = require("jsonwebtoken")
const fs = require('fs');

const fakeLocal = require("./fakeLocal.json")

app.get('/', (req, res) => {
    res.send("Nothing to see here. Visit /createtoken to create your token");
});

app.get('/createtoken', async (req, res) => {

    let user = {
        name: "joey",
        favColor: "blue",
        id: "123"
    }

    const token = jwt.sign(
      {
        user: user,
      },
      "TOP_SECRET_KEY"
    );

    console.log("token: ", token)

    await fs.writeFileSync(
        "fakeLocal.json",
        JSON.stringify({
            Authorization: `Bearer ${token}`
        }),
        (err) => {
            if (err) throw err;
            console.log("update the fake localstorage in the fake browser")
        }
    )

    res.send("You just made a token and stored it in json file. Now visit /profile and /wrongsecret");
});

app.get("/profile", async (req, res) => {
    console.log("authorization token: ", fakeLocal.Authorization);

    const result = await jwt.verify(
        fakeLocal.Authorization.substring(7),
        "TOP_SECRET_KEY"
    );

    result.message = "We were able to decrypt the token because we have a valid secret in the app, and the token. The users data is inside the token";

    console.log("result: ", result);

    res.json(result)
});

app.get("/wrongsecret", async (req, res) => {
    try {
        await jwt.verify(
            fakeLocal.Authorization.substring(7),
            "INCORRECT_SECRET"
        )

        res.send('/profile')
    } catch (error) {
        console.log("err: ", error)

        return res 
                    .status(400)
                    .send("You failed to hack me! Or your token is invalid.")
    }
    res.send("coming soon wrongsecret");
});

app.listen(3000, () => {
    console.log("Listening on port 3000")
})