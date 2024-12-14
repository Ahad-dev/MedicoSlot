const express =  require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require('./config/db')
const bodyParser = require("body-parser")

const authRouter = require("./routes/authRoute");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//get enviourment variables
dotenv.config();
const PORT = process.env.PORT;


app.use(cors({
    //allow multiple origins
    origin: ['http://localhost:5173', 'https://medico-slot-rb7a.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
//   credentials: true, // Enable cookies
}));

app.options('*', cors());

//connect to database
connectDB();

//middlewares

app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))

//Routes
app.use("/api/auth",authRouter);
app.use("/api/patient",require("./routes/patientRoute"));
app.use("/api/doctor",require("./routes/doctorRoute"));
app.use("/api/admin",require("./routes/adminRoute"));


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})