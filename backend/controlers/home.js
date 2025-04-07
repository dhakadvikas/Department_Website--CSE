
const homepage = (req,res)=>{
    res.send("this is home page form controless ");

}
const about= (req,res)=>{
    res.send("this is about page in home ")
}

module.exports={homepage, about};