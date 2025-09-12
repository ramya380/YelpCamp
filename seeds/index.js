const mongoose=require('mongoose');
const cities=require('./cities');
const {places,descriptions, descriptors}=require('./seedHelpers');
const Campground=require('../models/campground');

// Connect to MongoDB (local "yelp-camp" database)
mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log("Database Connected");
    })
    .catch(err => {
        console.error("Connection error:", err);
    });

// Utility function: pick a random element from an array
const sample=array=>array[Math.floor(Math.random()*array.length)];

const seedDB=async()=>{
     // First, delete all existing campgrounds (so we don’t duplicate data each run)
    await Campground.deleteMany();
    
    // Create 50 random campgrounds
   for(let i=0;i<200;i++){
    const random1000=Math.floor(Math.random()*1000);
    const price=Math.floor(Math.random()*20)+10;

    // Create a new campground object
    const camp=new Campground({
        author:'68af4332d66afacbd63f5220',
        location:`${cities[random1000].city},${cities[random1000].state}`,
        title:`${sample(descriptors)} ${sample(places)}`,
        //image:`https://picsum.photos/400?random=${Math.random()}`,
        description:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia, quo! Nisi tempora quisquam itaque aliquam cupiditate nemo amet repellat quo perspiciatis sint, dolor, nihil ullam fuga provident mollitia, deleniti!',
        price,
        geometry:{
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
        images:[
             {
      url: 'https://res.cloudinary.com/dgjnpv1h1/image/upload/v1756743947/yelpCamp/a9xnhksb8dy7gwrpuyfo.jpg',
      filename: 'yelpCamp/a9xnhksb8dy7gwrpuyfo',
    },
    {
      url: 'https://res.cloudinary.com/dgjnpv1h1/image/upload/v1756743958/yelpCamp/p4tdyfuolevapgir7rri.jpg',
      filename: 'yelpCamp/p4tdyfuolevapgir7rri',
    },
        ]
    })
     // Save campground to DB
    await camp.save();
   }
}
// Run the seed function, then close DB connection
seedDB().then(()=> {
    mongoose.connection.close();// Important! Otherwise, Node process keeps running
})