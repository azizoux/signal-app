import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  console.log(req.params);
  try {
    const userId = req.params.userId;
    const users = await User.find({ _id: { $ne: userId } });
    res.status(200).json(users);
  } catch (error) {
    console.log("Server Error", error);
  }
};

export const sendRequest = async (req, res) => {
  const { senderId, receiverId, message } = req.body;
  const receiver = await User.findById(receiverId);
  if (!receiver) {
    return res.status(404).json({ message: "Receiver not found" });
  }
  receiver.requests.push({ from: senderId, message });
  await receiver.save();
  res.status(200).json({ message: "request sent succesfully" });
};
