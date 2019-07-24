const app = require('./app');

const port = process.env.port || 3000;

app.listen(port ,(port)=>{
  console.log(`App is up and running on port ${port}`)
})