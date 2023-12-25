const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const bcrypt = require("bcrypt");

const { v4: uuidv4 } = require("uuid");

const fakeLocal = require("./fakeLocal.json");
const users = require("./users.json");
const secureRoutes = require('./secureRoutes')

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use("/user", secureRoutes);

function getJwt() {
  console.log("in get Jwt");

  return fakeLocal.Authorization?.substring(7);
}

passport.use(
  new JwtStrategy(
    {
      secretOrKey: "TOP_SECRET",
      jwtFromRequest: getJwt,
    },
    async (token, done) => {
      console.log("in jwt strat. token: ", token);

      if (token?.user?.email == "tokenerror") {
        let testError = new Error(
          "Something bad happened. We've simulated an application error in the JwtStrategy callback for users with an email of 'tokenerror'"
        );

        return done(testError, false);
      }

      if (token?.user?.email == "emptytoken") {
        return done(null, false);
      }

      return done(null, token.user);
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      console.log("login named");

      try {
        if (email == "apperror") {
          throw new Error(
            "Oh no! The application crashed! We have reported the issue. You can change next(error) to next(error.message) to hide the stack trace"
          );
        }

        const user = users.find((user) => user.email === email);

        if (!user) {
          return done(null, false, { message: "User not found!" });
        }

        const passwordMatches = await bcrypt.compare(password, user.password);

        if (!passwordMatches) {
          return done(null, false, { message: "Invalid credentials" });
        }

        return done(null, user, {
          message: "Hey congrats! you are logged in!",
        });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        if (password.length <= 4 || !email) {
          done(null, false, {
            message: "Your credential do not match our criteria",
          });
        } else {
          const hashedPass = await bcrypt.hash(password, 10);

          let newUser = {
            email,
            password: hashedPass,
            id: uuidv4(),
          };

          users.push(newUser);

          await fs.writeFile("users.json", JSON.stringify(users), (err) => {
            if (err) return done(err);
            console.log("updated the fake database");
          });

          return done(null, newUser, {
            message: "Signed up successfully!",
          });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

app.get("/", (req, res) => {
  res.send("Nothing to see here.");
});

app.get(
  "/secureroute",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log("------ beginning of /secureroute ------")
    console.log("req.isAuthenticated: ", req.isAuthenticated());
    console.log("req.user: ", req.user);
    console.log("req.login: ", req.login);
    console.log("req.logout: ", req.logout);

    res.send(`welcome to the top of secret place ${req.user.email}`);
  }
);

app.get("/logout", async (req, res) => {

    await fs.writeFile(
        "fakeLocal.json",
        JSON.stringify({Authorization: ``}),

        (err) => {
            if (err) throw err;
        }
    )

    res.redirect("/login")
})

app.get("/login", async (req, res) => {
  res.render("login");
});

app.get("/singup", async (req, res) => {
  res.render("singup");
});

app.get("/failed", async (req, res) => {
  res.send(`failed! ${req.query?.message}`);
});

app.get("/success", async (req, res) => {
  res.send(`success! ${req.query?.message}`);
});

app.post(
  "/login",
  async (req, res, next) => {
    passport.authenticate("login", async (error, user, info) => {
      console.log("error :", error);
      console.log("user :", user);
      console.log("info :", info);

      if (error) {
        return next(error.message);
      }

      if (!user) {
        res.redirect(`/failed?message=${info.message}`);
      }

      const body = {
        _id: user.id,
        email: user.email,
      };

      const token = jwt.sign({ user: body }, "TOP_SECRET");

      await fs.writeFile(
        "fakeLocal.json",
        JSON.stringify({
          Authorization: `Bearer ${token}`,
        }),
        (err) => {
          if (err) throw err;
        }
      );

      return res.redirect(`/success?message=${info.message}`);
    })(req, res, next);
  },
  (req, res, next) => {
    res.send("Hello");
  }
);

app.post("/singup", async (req, res, next) => {
  passport.authenticate("signup", async (error, user, info) => {
    if (error) {
      return next(error);
    }

    if (!user) {
      res.redirect(`/failed?message=${info.message}`);
    }

    const body = {
      _id: user.id,
      email: user.email,
    };

    console.log("body ", body);

    const token = jwt.sign(
      {
        user: body,
      },
      "TOP_SECRET"
    );

    await fs.writeFile(
      "fakeLocal.json",
      JSON.stringify({
        Authorization: `Bearer ${token}`,
      }),
      (err) => {
        if (err) throw err;
      }
    );

    res.redirect(`/success?message=${info.message}`);
  })(req, res, next);
});

app.listen(3001, () => {
  console.log("Listening on port 3000");
});
