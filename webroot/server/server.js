/*
 * 
 *          Starts the server
 * 
 */

// Imports express
const app = require('./app');

// Grabs the port from the enviroment variable
console.log(process.env.PORT);
const PORT = process.env.PORT;

// Starts the server and will trigger express listening for requests
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});