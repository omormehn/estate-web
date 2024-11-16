import prisma from "../config/prismaConfig.js";

export const getChats = async (req, res) => {
  const token = req.user.userId;
  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIds: {
          hasSome: [token],
        },
      },
    });
    res.status(200).json({ success: true, chats });
  } catch (error) {
    console.error("Error in get chats", error);
    res.status(500).json({ message: "Failed to get chats" });
  }
};
export const getChat = async (req, res) => {
  const token = req.user.userId;
  const { id } = req.params;
  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id,
        userIds: {
          hasSome: [token],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
    await prisma.chat.update({
      where: {
        id,
      },
      data: {
        seenBy: {
          set: [token],
        },
      },
    });
    res.status(200).json({ chat });
  } catch (error) {
    res.status(401).json({ message: "Failed to get chat" });
    console.log("failed to get chat", error);
  }
};
export const addChat = async (req, res) => {
  const token = req.user.userId;
  const receiver = req.body.receiverId;
  try {
    const newChat = await prisma.chat.create({
      data: {
        userIds: [token, receiver],
      },
    });
    res.status(200).json(newChat);
  } catch (error) {
    res.status(401).json({ message: "Failed to add chat" });
    console.log("failed to add chat", error);
  }
};
export const readChat = async (req, res) => {
   const token = req.user.userId;

   try {
    const chat = await prisma.chat.update({
      where: {
        id,
        userIds: {
          hasSome: [token]
        }
      },
      data: {
        seenBy: {
          set: [token]
        }
      }
    });
    res.status(200).json(chat)
   } catch (error) {
    
   }
};
export const deleteChat = async (req, res) => {};
