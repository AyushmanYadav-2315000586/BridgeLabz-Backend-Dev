console.log("task1")
setTimeout(()=>{
    console.log("task2")
},0)
Promise.resolve().then(()=> console.log("task3"))
console.log("task4")