const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

const port = 3000;
const usersFilePath = path.join(__dirname, 'users.json');

const user = [
    { id: 1, name: 'Alice', age: 30, city: 'New York' },
    { id: 2, name: 'Bob', age: 25, city: 'Los Angeles' },
    { id: 3, name: 'Charlie', age: 35, city: 'Chicago' },
]
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/user', (req, res) => {
    res.json(user);
});
app.get('/user/city/:city', (req, res) => {
    const city = req.params.city;
    const filteredUsers = user.filter(u => u.city === city);
    res.json(filteredUsers);
});
app.get('/user/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = user.findIndex(u => u.id === userId);
    const data = user[userIndex];
    if (data) {
        res.json(data);
    } else {
        res.status(404).send('User not found');
    }

});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.post('/user/register', (req, res) => {
    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading users.json:', err);
            return res.status(500).json({ error: 'Failed to read user data' });
        }
        const { name, age, city } = req.body;
        const newUser = { id: user.length + 1, name, age, city };
        user.push(newUser);

        fs.writeFile(usersFilePath, JSON.stringify(user, null, 2), (err) => {
            if (err) {
                console.error('Error writing to users.json:', err);
                return res.status(500).json({ error: 'Failed to save user data' });
            }
            res.json({ message: 'User registered successfully', user: newUser });
        });
    });
});
app.put('/user/update/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, age, city } = req.body;
    const userIndex = user.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        user[userIndex] = { id: userId, name, age, city };
        res.json({ message: 'User updated successfully', user: user[userIndex] });
    } else {
        res.status(404).
            send('User not found');
    }
    fs.writeFile(usersFilePath, JSON.stringify(user, null, 2), (err) => {
        if (err) {
            console.error('Error writing to users.json:', err);
            return res.status(500).json({ error: 'Failed to save user data' });
        }
    });

    app.delete('/user/delete/:id', (req, res) => {
        const userId = parseInt(req.params.id);
        const userIndex = user.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            const deletedUser = user.splice(userIndex, 1);
            res.json({ message: 'User deleted successfully', user: deletedUser[0] });
        } else {
            res.status(404).send('User not found');
        }
    });
});

app.put("/user/:id",(req,res)=>{
  const userId=parseInt(req.params.id)
  const foundIndex=students.findindex(u => u.id===userId);
  if(foundIndex==-1){
    return res.status(404).send("user not found")
  }
  user[foundIndex]={...user[foundIndex], ...req.body};
  const result={message:"user record upadated succefully",user:user};
  return res.status(200).json(result)
})


app.delete("/user/delete/:id",(req,res)=>{
  const userId=parseInt(req.params.id);
  const userIndex=-user.findIndex(u => u.id===userId);
  if(userId===-1){
    return res.status(404).send("user not found")
  }
  const deleteUser=user.splice(userIndex,1)[0];
  fs.writeFile(usersFilePath,JSON.stringify(user,null,2),(err)=>{
    if(err){
      return res.status(500).json({error: "failed to delete user"});
    }
    res.json({
      message:'user delted succefully',
      user: deleteUser
    });
  });
});


