

const {app} = require("./server.js");

const PORT = process.env.PORT || 8080;




app.listen(PORT, () => {
    console.log("server is running" + PORT)
});