import Message from "../models/message.model.js";

export const getMessage = async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;
    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    })
      .populate("senderId", "_id name email")
      .populate("receiverId", "_id name email");

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error", error);
  }
};
