const mongoose=require('mongoose');

const restaurantSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        lowercase: true
    },
    description:{
        type:String,
        trim:true
    },
    cuisine: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true
    },
    menu: [
        {
            itemName: String,
            price: Number,
            description: String
        }
    ]
});

const RestaurantSchema=mongoose.model('RestaurantSchema',restaurantSchema);
module.exports=RestaurantSchema;