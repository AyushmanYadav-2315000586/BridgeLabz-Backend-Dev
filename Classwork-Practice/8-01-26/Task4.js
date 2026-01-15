const fetchUser=(id)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            const user={
                        1:{name:"Kartikey Verma",phone:"9458019650",address:"Etawah",},
                        2:{name:"Sahil Bansal",phone:"9846372837",address:"Rajashthan",},
                        3:{name:"Ankit Sharma",phone:"8765432190",address:"Uttar Pradesh",},
                    }
            const users=user[id];
            if(users){
                resolve(users)
            }
            else{
                reject("user not found")
            }
        },2000)
    })
}
fetchUser(1)
.then((users)=>console.log(users))
.catch((error)=>console.log(error))
// console.log(fetchUser(1))

const getUserData=async()=>{
    return new Promise((resolve,reject)=>{})
    
}