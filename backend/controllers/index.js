
const Report = require('../models/Report');
const User = require('../models/user');


const getUserReports = async (req, res) => {
  const { id } = req.headers; // Correctly access the headers

  try {
    if (!id) {
      return res.status(400).json({ message: 'User ID is required in the headers.' });
    }

    // Fetch reports specific to the user
    const reports = await Report.find({ userId: id }); // Assuming your reports have a `userId` field

    res.status(200).json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};



const createReport=async(req,res)=>{
  try {
    const { type, description, location, media } = req.body;
    console.log(req.body);
    
    // const newReport = new Report({ type, description, location, media });
    // const savedReport = await newReport.save();
    // res.status(201).json(savedReport);
} catch (error) {
    res.status(500).json({ message: 'Server Error' });
}
}
const SignUp=async(req,res)=>{
  try {
    const {name,phone,password } = req.body;
    const newReport = new User({ name, phone,password});
    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
} catch (error) {
    res.status(500).json({ message: 'Server Error' });
}
}
const SignIn=async(req,res)=>{
  try {
    const {phone,password} = req.body;
    const reports = await User.find();
    res.json(reports);
} catch (error) {
    res.status(500).json({ message: 'Server Error' });
}
}
module.exports={SignIn,SignUp,createReport,getUserReports}