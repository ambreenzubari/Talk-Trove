const messageModel = require("../model/message");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = messageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) {
      res.json({ msg: "Message added successfully", status: true });
    } else {
      res.json({ msg: "Failed to add message to firebase", status: false });
    }
  } catch (err) {
    next({ status: false, msg: err.message });
  }
};

module.exports.getAllMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await messageModel
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({
        updatedAt: 1,
      });

    const projectMessage = messages.map((msg) => {
      return {
        message: msg.message.text,
        fromSelf: msg.sender.toString() === from,
      };
    });
    return res.json(projectMessage);
  } catch (err) {
    next({ status: false, msg: err.message });
  }
};
