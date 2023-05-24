exports.createPackage = async (req, res) => {
    // console.log(req.body)

    let data= `https://mainnet.infura.io/v3/9992ea8e1df4426782245acd1d14989f`
    try {

        const {name,cost} = req.body;
    const { Package } = req.db.models;

 

    
    console.log("Name")
    Package.create({
     name:name,
     cost:cost
    }).then((resp)=>{
         console.log("Dot")
        res.status(200).send(resp);
    }).catch((err)=>{
        console.log("Yes")
        console.log(err)
        res.status(400).send(err)
    })
    // const transactive = await Transactions.create(req.body);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error });
  }  
};
