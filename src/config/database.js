const mongoose = require('mongoose');



// async function connecttToDb() {
//     await mongoose.connect('mongodb://gaurav:cqbn0G4NdIpMgcYN@ac-hf9zsgu-shard-00-00.1obghap.mongodb.net:27017,ac-hf9zsgu-shard-00-01.1obghap.mongodb.net:27017,ac-hf9zsgu-shard-00-02.1obghap.mongodb.net:27017/?ssl=true&replicaSet=atlas-gizxzt-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0')
//     //  await mongoose.connect('mongodb+srv://gaurav:cqbn0G4NdIpMgcYN@cluster0.1obghap.mongodb.net/')
// }
// mongodb+srv://gaurav:cqbn0G4NdIpMgcYN@cluster0.1obghap.mongodb.net/

// const mongoose = require('mongoose');

const connectToDb = async () => {
  try {
    // await mongoose.connect('');
    await mongoose.connect('mongodb://gkkush523:abcd@cluster0-shard-00-00.i1ycf.mongodb.net:27017,cluster0-shard-00-01.i1ycf.mongodb.net:27017,cluster0-shard-00-02.i1ycf.mongodb.net:27017/devTinder?ssl=true&replicaSet=atlas-10xew2-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0');
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// module.exports = connectToDb;

module.exports = connectToDb

