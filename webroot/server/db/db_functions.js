const { client } = require('./db');

// Client will call this as when the page is first loaded and store it in cache 
async function getRecentPosts() {
    // Connect the client to the server    (optional starting in v4.7)
    try{
    
        // filters posts by most recent
        const recents = await client.db('GregsList').collection('Posts').find().sort({ timestamp : -1}).toArray();

        console.log(recents);

        //client.close();

        return recents
    }catch(error){
        console.error("Big Error getting recent posts");
    }

    // Send a ping to confirm a successful connection
    //const collection = client.db("sample_mflix").collection("movies").find({title:'One Week'});
}

module.exports = { getRecentPosts };
/*

    await client.db("GregsList").collection("Posts").insertOne({
        title:"Transformer",
        plot:"Lorem ipsum"
    }, function(err,result){
        if(err) throw err;
        console.log(result);
        client.close();
    })
    /
client.connect(async err => {
    const result = client.db("sample_mflix").collection("movies").deleteOne({title:'One Week'});
    console.log(result);
});


  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

*/
