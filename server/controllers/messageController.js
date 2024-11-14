import prisma from "../config/prismaConfig.js";


export const addMessage = async (req, res) => {
    const token = req.user.userId;
    const {chatId} = req.params;
    const {text} = req.body;
    try {
        const chat = await prisma.chat.findUnique({
            where: {
                id: chatId,
                userIds: {
                    hasSome: [token]
                }
            }
        });
        if (!chat) return res.status(404).json({message: "Chat not found"});

        const message = await prisma.message.create({
            data: {
                text,
                chatId,
                userId: token
            }
        });

        await prisma.chat.update({
            where: {
                id: chatId
            },
            data: {
                seenBy: [token],
                lastMessage: text
            }
        });
        res.status(200).json(message)
    } catch (error) {
        console.log(error)
         res.status(500).json({message: "Error"});
    }
}