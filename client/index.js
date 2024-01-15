const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  let name = 'Phil Murray';
  let merkleTree = new MerkleTree(niceList);
  let index = niceList.findIndex(n => n === name);
  let root = merkleTree.getRoot();
  
  let proof = merkleTree.getProof(index)
 
  let { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
     proof,
    name,
     root
  });

  console.log({ gift });
}

main();