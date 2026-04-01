import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("WordPress Theme Dev Server is active. Please use the WordPress dashboard to manage your theme.");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
