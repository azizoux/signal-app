import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
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

export const getRequests = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate(
      "requests.from",
      "name email image"
    );
    if (user) {
      res.json(user.requests);
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const acceptRequest = async (req, res) => {
  try {
    const { userId, requestId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { requests: { from: requestId } },
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Request not found" });
    }
    await User.findByIdAndUpdate(userId, {
      $push: { friends: requestId },
    });
    const friendUser = await User.findByIdAndUpdate(requestId, {
      $push: { friends: userId },
    });
    if (!friendUser) {
      return res.status(404).json({ message: "Friend not found" });
    }
    res.status(200).json({ message: "Request accepted succesfully" });
  } catch (error) {
    console.log("Server error", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate(
      "friends",
      "name email image"
    );
    res.status(200).json(user.friends);
  } catch (error) {
    console.log("Error fetching user", error);
  }
};
