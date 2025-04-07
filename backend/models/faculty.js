const mongoose = require("mongoose");


const facultySchema = new mongoose.Schema({
    name: { type: String, required: true },
    img: { type: String  },
    designation: { type: String, default: null  },
    post: { type :String, enum:["regular", "non_regular"]},
    department: { type: String, default: null },
    address: { type: String, default: null  },
    contact: {
        website: { type: String, default: null },
        email: { type: String, unique: true, default: null },
        phone: { type: String, default: null },
        mobile: { type: String, default: null  }
    },
    experience: { type: String, default: null  },
    education_qualification: [{
        qualification: { type: String, default: null  },
        specialization: { type: String, default: null  }
    }],
    memberships: [{ type: String ,default: null }],
    research_areas: [{ type: String, default: null }],
    publications: [{
        title: { type: String , default:null},
        journal: { type: String , default:null},
        year: { type: Number , default:null},
        authors: [{ type: String , default:null}],
        pages: { type: String , default:null}
    }]
}, { timestamps: true });

module.exports = mongoose.model("Faculty", facultySchema);









// const mongoose  = require("mongoose");

// const facultySchema = new mongoose.Schema({
  
//     name:{type : String , required:true },
//     role: {type :String , enum:["regular", "non_regular", "guest"],required:true},
//     levelOfPost:{type :String , enum:["UG & PG", "UG"],required:true},
//     email:{type :String , required:true , unique:true},
//     education_Qulification:{type:[String],required:true},
//     experience:{type:Number, },
//     menbership:{type:[String]},
//     researchArea:{type:[String]},
//     publication:{type: [String]},
//     profileImage:{type:Buffer}

// })

// module.exports = mongoose.model("faculty", facultySchema);