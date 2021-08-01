require('dotenv').config();
const fs = require('fs');

function loadUsers() {
    // Lade die Nutzer aus der Datenbank.
    let savedData = fs.readFileSync(__dirname + process.env.JSON_DATABASE_NAME);
    return JSON.parse(savedData);
}

function saveUsers(users) {
    // Speichere die Nutzer in der Datenbank.
    fs.writeFileSync(__dirname + process.env.JSON_DATABASE_NAME, JSON.stringify(users, null, 4));
}

function saveUser(user) {
    var users = loadUsers();
    users.forEach(function(nutzer, index) {
        if (nutzer['id'] == user['id']) {
            users[index] = user;
        }
    })
    saveUsers(users);
}

function addUser(user) {
    let users = loadUsers();
    users.push(user);
    saveUsers(users);
}

function getUserById(id) {
    let users = loadUsers();
    return users.find(user => { return user['id'] == id });
}

function getUserByMail(mail) {
    let users = loadUsers();
    return users.find(user => { return user['mail'] == mail });
}



module.exports = {
    loadUsers, 
    saveUsers,
    getUserByMail,
    getUserById,
    saveUser,
    addUser
}