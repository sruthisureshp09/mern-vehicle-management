// Create Express app
const express= require('express')
const connectDB= require('./config/db')
const adminRoutes = require("./routes/adminRoutes");
const app= express()
const dotenv= require("dotenv")
const cors= require("cors")
const helmet= require("helmet")

// Load environment variables from .env file
dotenv.config()

// Import MongoDB connection and establish the database connection
connectDB();

// Middleware to handle JSON data only for a specific route
app.use(express.json());
// Set up middleware to parse incoming JSON and urlencoded data
app.use(express.urlencoded({extended:false}))
app.use(cors({
    origin: '*'
}))
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    next(); 
})
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(function (req, res, next) {
    res.set('cache-control', 'no-cache , no-store,must-revalidate,max-stale=0,post-check=0,pre-checked=0');
    next();
}); 

/**
 * Define application routes
 */
app.use("/api", adminRoutes);
app.use('/assets/images', express.static('assets/images' ));

// Start the server and listen on the specified port and hostname
app.listen(process.env.PORT, () => {
  console.log(`Server running at PORT ${process.env.PORT}`);
});




