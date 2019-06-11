const express = require('express');
const server = express();

const port = process.env.PORT || 5000;

server.get('/', (req,res) => {
  res.send({message: 'I am alive'})
})

server.listen(port, () => {
  console.log(`listening on localhost:${port}`);
});
