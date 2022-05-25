import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModal from "../models/user.js";

const secret = "test";

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModal.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist!" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials provided!" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      secret,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
    console.log(error);
  }
};

export const signUp = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const existingUser = await userModal.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "An account with this email exists already!" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await userModal.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "An error occured!" });
    console.log(error);
  }
};
