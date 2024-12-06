"use client";
import { MessageWithUser, User } from "@/app/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import styles from "./ChatRoom.module.css";

type ChatRoomProps = {
  chatId: number;
  chatName: string;
  users: User[];
  messages: MessageWithUser[];
  currentUser: Required<User> | string;
};

export const ChatRoom = ({
  chatId,
  chatName,
  users,
  messages,
  currentUser,
}: ChatRoomProps) => {
  const [currentMessages, setCurrentMessages] =
    useState<MessageWithUser[]>(messages);

  const [currentUsers, setCurrentUsers] = useState<User[]>(users);

  const [newMessage, setNewMessage] = useState("");

  const router = useRouter();
  const [socket, setSocket] = useState<Socket | null>(null);

  // When the current user is just a string, it is an Anonymous user.
  // If it is not string, it is an User.
  const isAnonymous = typeof currentUser === "string";

  const userId = isAnonymous ? currentUser : currentUser.id;

  useEffect(() => {
    const socketInstance = io("ws://localhost:8000");
    setSocket(socketInstance);

    socketInstance.emit(
      "joinChat",
      JSON.stringify({
        userId: userId,
        chatId: chatId,
        anonymous: isAnonymous,
      })
    );

    socketInstance.on("onJoinChat", (data: { user: User; message: string }) => {
      setCurrentUsers((prevUsers) => {
        if (prevUsers.find((user) => user.id === data.user.id)) {
          return prevUsers;
        }

        return [...prevUsers, data.user];
      });
    });

    socketInstance.on("onNewMessage", (data: MessageWithUser) => {
      setCurrentMessages((prevMessages) => [data, ...prevMessages]);
    });

    socketInstance.on(
      "onLeaveChat",
      (data: { user: User; message: string }) => {
        setCurrentUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== data.user.id)
        );
      }
    );

    return () => {
      socketInstance.disconnect();
    };
  }, [chatId, currentUser, isAnonymous, userId]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) {
      return;
    }

    const messageToSend = {
      content: newMessage,
      chatId: chatId,
      userId: userId,
      anonymous: isAnonymous,
    };

    socket?.emit("newMessage", JSON.stringify(messageToSend));
    setNewMessage("");
  };

  const handleLeaveChat = () => {
    socket?.emit(
      "leaveChat",
      JSON.stringify({ userId, chatId, anonymous: isAnonymous })
    );

    router.push("/");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const minutes =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const formattedDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${minutes}`;

    return formattedDate;
  };

  return (
    <div className={styles.chatRoom}>
      <h1>{chatName}</h1>

      <div className={styles.participantsSection}>
        <h3>Participants</h3>

        <div className={styles.participantsList}>
          {currentUsers.length > 0 ? (
            currentUsers.map((user, index) => {
              const text = `${user.username}${
                index < currentUsers.length - 1 ? "," : ""
              }`;

              return <div key={`${user.id}`}>{text}</div>;
            })
          ) : (
            <div>No participants</div>
          )}
        </div>
      </div>

      <div className={styles.messagesSection}>
        <h3>Messages</h3>

        <div className={styles.messageList}>
          {currentMessages.length > 0 ? (
            currentMessages.map((message) => {
              return (
                <div key={`${message.id}`} className={styles.messageWrapper}>
                  <div className={styles.message}>
                    <div className={styles.messageUsername}>
                      {`${message.user?.username}: `}
                    </div>

                    <div>{message.content}</div>
                  </div>

                  <div className={styles.messageSentAt}>
                    {formatDate(message.sentAt)}
                  </div>
                </div>
              );
            })
          ) : (
            <div>No messages</div>
          )}
        </div>

        <input
          className={styles.messageInput}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Write a new message"
          disabled={isAnonymous}
        />
        <button
          className={styles.sendMessageButton}
          onClick={handleSendMessage}
          disabled={isAnonymous}
        >
          Send
        </button>
      </div>
      <button
        className={styles.leaveChatButton}
        onClick={handleLeaveChat}
        disabled={isAnonymous}
      >
        Leave Chat
      </button>
    </div>
  );
};
