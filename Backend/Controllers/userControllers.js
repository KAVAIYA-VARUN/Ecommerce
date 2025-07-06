import userModel from "../Models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) =>
{
    return jwt.sign({id}, process.env.JWT_SECRET);
}

// Route for user login
const loginUser = async (req,res) =>
{
    console.log(req.body);
    try
    {
        const { email, password, phone } = req.body;

        if(!/^\d{10}$/.test(phone))
        {
            return res.json({ success: false, message: "Phone number must be exactly 10 digits" });
        }

        const user = await userModel.findOne({email});

        // checking if the user exists or not
        if(!user)
        {
            return res.json({message: "User Doesn't Exists"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        // now if the password is true then will generate the token
        if(isMatch)
        {
            // Check if phone number matches
            if(user.phone.toString() !== phone)
            {
                return res.json({ success: false, message: "Phone number does not match" });
            }

            const token = createToken(user._id);
            res.status(200).json({success: true, token});
        }
        else
        {
            res.json({success: false, message: "Incorrect Credentials"});
        }
    }
    catch(error)
    {
        console.log(error);
        res.json({message: "Error While Logging The User"});
    }
}

// Route for user register
const registerUser = async (req,res) =>
{
    try
    {
        let name = req.body.name?.trim();
        let email = req.body.email?.trim();
        let password = req.body.password?.trim();
        let phone = req.body.phone?.trim();

        if(!name || !email || !password || !phone)
        {
        return res.json({ success: false, message: "All fields are required" });
        }

        if(/[A-Z]/.test(req.body.email))
        {
            return res.json({ success: false, message: "Email must be in lowercase only — no uppercase letters allowed" });
        }

        email = email.toLowerCase();

        // check if email already exists
        const emailExists = await userModel.findOne({ email });
        if(emailExists)
        {
            return res.json({ success: false, message: "Email is already registered" });
        }

        // check if phone already exists
        const phoneExists = await userModel.findOne({ phone });
        if(phoneExists)
        {
            return res.json({ success: false, message: "Phone number is already registered" });
        }


        // validation part

        if (name.length < 3)
        {
            return res.json({ success: false, message: "Name must be at least 3 characters long" });
        }

        // Name must contain only letters, and exactly one space between two words (e.g. "John Doe")
        if(!/^[A-Za-z]+(?: [A-Za-z]+)?$/.test(name))
        {
            return res.json({
                success: false,
                message: "Name must contain only letters with at most one space between first and last name"
            });
        }


        // validating email format and strong password
        if(!validator.isEmail(email))
        {
            return res.json({success:false, message: "Please Enter A Valid Email"});
        }

        if(!/^\d{10}$/.test(phone))
        {
            return res.json({ success: false, message: "Phone number must be exactly 10 digits" });
        }


        if(password.length < 8)
        {
            return res.json({ success: false, message: "Password must be at least 8 characters long" });
        }

        if(!/[A-Z]/.test(password))
        {
            return res.json({ success: false, message: "Password must contain at least one uppercase letter" });
        }

        if(!/\d/.test(password))
        {
            return res.json({ success: false, message: "Password must contain at least one number" });
        }

        if(/\s/.test(password))
        {
            return res.json({ success: false, message: "Password must not contain any whitespace" });
        }


        if(!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password))
        {
            return res.json({ success: false, message: "Password must contain at least one special character" });
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        // now a user is created so we need to store the user

        const newUser = new userModel(
            {
                name,
                email,
                phone,
                password: hashedPassword
            }
        );

        const user = await newUser.save();
        // as a new user is created it will have a unique id with the help of which we can create the token for their login

        const token = createToken(user._id);
        // _id is auto generated by mongoDB

        res.json({success: true, token});
    }
    catch(error)
    {
        console.log(error);
        return res.json({success: false, message: "Error Creating The User"});
    }
}

// Route for admin login
const adminLogin = async (req,res) =>
{
    try
    {
        const { email, password } = req.body;

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD)
        {
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            res.json({success: true, token, message: "LoggedIn Successfully"});
        }
        else
        {
            res.json({success: false, message: "Invalid Credentials"});
        }
    }
    catch(error)
    {
        console.log(error);
        res.json({success: false, message: "Error Admin Not Found"});
    }
}

// this might need to change
const getUser = async (req, res) => 
{
  try
  {
    const token = req.headers.token;

    if(!token)
    {
      return res.json({ success: false, message: "Not Authorized" });
    }

    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Fetch user
    const user = await userModel.findById(userId).select("-password"); // exclude password
    if(!user)
    {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json(user);
  }
  catch(error)
  {
    console.log(error);
    res.json({ success: false, message: "Failed to fetch user" });
  }
}

const addAddress = async (req,res) => 
{
    try
    {
        const { token } = req.headers;
        const { street, city, state, pincode, country } = req.body;

        if(!token)
        {
            return res.json({success: false, message: "Unauthorized"});
        }

        const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded_token.id;

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            {
                $push:
                {
                    address: { street, city, state, pincode, country }
                }
            },
            {new: true}
        );

        if(!updatedUser)
        {
            return res.json({success: false, message: "User not Found"});
        }

        res.status(200).json({success: true, message: "Address Updated Successfully", user: updatedUser});
    }
    catch(error)
    {
        console.log(error);
        res.json({ success: false, message: "Failed to Add the Address" });
    }
}

export { loginUser, registerUser, adminLogin, getUser, addAddress }