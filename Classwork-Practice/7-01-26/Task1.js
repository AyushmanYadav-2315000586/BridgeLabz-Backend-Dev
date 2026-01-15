const rawUsers = [
{ id: 1, name: "Rahul", password: "fb_password", role: "admin" },
{ id: 2, name: "Sanya", password: "123_password", role: "user" },
{ id: 3, name: "Amit", password: "secret_password", role: "user" }
];
const no_password_Users=rawUsers.map(({password,...rest})=>rest); /* Create a new array of users without the password field */
console.log(no_password_Users); /* ...rest operator is used to exclude the password field */ /* => rest operator collects the remaining properties into a new object */
const admins=rawUsers.filter(user => user.role === "admin"); /* Create a new array containing only admin users */
console.log(admins);