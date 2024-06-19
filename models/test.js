const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({

        title:{
            type:String,
            required:true
        },
        category:{
            type:String,
            enum:['Maths',"Physics"],
            default:'Maths'
        },
        content:[{type:mongoose.Schema.Types.ObjectId,ref:"questions"}]
}, { timestamps: true });
const Test = mongoose.model("test", testSchema);

module.exports = Test;
