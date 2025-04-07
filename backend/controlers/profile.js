
const viewProfile = (req,res) =>{
    res.send("this is the VIEW PROFILE page ");
}

const updateProfile  =  (req,res) =>{
    res.send("this is the UPDATE PROFILE page ");

}

module.exports = {viewProfile,updateProfile};