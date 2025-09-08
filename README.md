# Youtube-Blog

# 📌 1. Global Middleware (applied with app.use)
app.use(checkForAuthenticationCookie("token"));

Runs for every request, regardless of route.

Middleware is in the global chain — every request passes through it before reaching any route handler.

Useful for things that should always run (like parsing cookies, checking auth, logging, etc.).

✅ Example:
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.get("/profile", (req, res) => {
  res.render("profile", { user: req.user });
});

app.get("/settings", (req, res) => {
  res.render("settings", { user: req.user });
});

# 📌 2. Route-specific Middleware (applied inline in a route)
app.get("/profile", checkForAuthenticationCookie("token"), (req, res) => {
  res.render("profile", { user: req.user });
});


Runs only for this route.

If you want to protect just a few endpoints (like /profile or /dashboard), you attach it here.

Useful for strict authentication: if no valid user, stop immediately.


# req.file = metadata about uploaded file, added by multer.

# 🔑 With .populate()

If you query like this:

const blogs = await Blog.find({}).populate("createdBy");


Now Mongoose:

- Sees createdBy in your schema has ref: "user".
- Looks up the user document in the users collection.
- Replaces the ObjectId with the actual user object.

# ✅ Role of .populate() in one sentence
👉 .populate() automatically fetches the full document(s) referenced by an ObjectId and replaces the IDs with the actual objects.

# Using slice() (if quotes are only at start and end)
const name = '"Raju Chaiwala"';  
console.log(name); // "Raju Chaiwala"

const cleanName = name.slice(1, -1);
console.log(cleanName); // Raju Chaiwalaa


