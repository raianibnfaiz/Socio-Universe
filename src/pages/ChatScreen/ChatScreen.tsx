import React, { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  Edit3,
  Menu,
  Camera,
  Image,
  Languages,
  Send,
  Clock,
  SendIcon,
  SendHorizonalIcon,
  SendHorizonal,
  LucideSendHorizonal,
  LucideSend,
} from "lucide-react";
import user1 from "../../assets/images/user1.png";
import user2 from "../../assets/images/user2.png";
import user4 from "../../assets/images/user4.png";
import styles from "./ChatScreen.module.css";

interface Message {
  id: number;
  sender: string;
  avatar: string | null;
  time: string;
  content: {
    japanese?: string;
    vietnamese?: string;
    image?: string;
  };
  isUser?: boolean;
}

const ChatDetailScreen: React.FC = () => {
  const [message, setMessage] = useState("");
  const [showTemplates, setShowTemplates] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("tempA");
  const [popup, setPopup] = useState({ visible: false, top: 0, left: 0 });
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "Naoto Ishigaki",
      avatar: user1,
      time: "9:12",
      content: {
        japanese:
          "10月5日、工場内で消毒が入ります。皆さん、注意して準備してください。",
        vietnamese:
          "Ngày 5 tháng 10, trong nhà máy sẽ có khử trùng xin mọi người lưu ý và chuẩn bị.",
      },
    },
    {
      id: 2,
      sender: "Naoto Ishigaki",
      avatar: user2,
      time: "9:12",
      content: {
        japanese: "時間や場所の詳細は、あらためて送ります。",
        vietnamese: "Chi tiết về thời gian và khu vực sẽ được gửi lại sau.",
      },
    },
    {
      id: 3,
      sender: "健太",
      avatar: null,
      time: "8:36",
      content: {
        vietnamese: "Vâng, em đã hiểu.",
        japanese: "はい、承知しました。",
      },
      isUser: true,
    },
    {
      id: 4,
      sender: "Hoang Thi Trang",
      avatar: user4,
      time: "8:42",
      content: {
        vietnamese:
          "Nếu có điều gì cần chú ý, xin mọi người cũng chia sẻ thông tin。",
        japanese: "気を付けることがあれば、その情報も共有いたしますね。",
      },
    },
  ]);
  const [uploading, setUploading] = useState(false);
  const [selectedTemplateItem, setSelectedTemplateItem] = useState<{
    vietnamese: string;
    japanese: string;
  } | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const templates: {
    [key: string]: { vietnamese: string; japanese: string }[];
  } = {
    tempA: [
      { vietnamese: "Cảm ơn bạn", japanese: "ありがとうございます" },
      { vietnamese: "Xin lỗi", japanese: "もうしわけありません" },
      { vietnamese: "Chào buổi sáng", japanese: "おはようございます" },
      { vietnamese: "Chào buổi trua", japanese: "こんにちは" },
      { vietnamese: "Chào buổi tối", japanese: "こんばんは" },
      { vietnamese: "Chào mừng bạn", japanese: "おつかれさまです" },
      { vietnamese: "Xin phép", japanese: "しつれいします" },
      { vietnamese: "Tôi đã về", japanese: "ただいまもどりました" },
    ],
    tempB: [],
    tempC: [],
    tempD: [],
    tempE: [],
  };

  const templateTabs = ["tempA", "tempB", "tempC", "tempD", "tempE"];

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleTemplateSelect = (template: {
    vietnamese: string;
    japanese: string;
  }) => {
    setSelectedTemplateItem(template);
    setMessage(`${template.vietnamese}\n${template.japanese}`);
    setShowTemplates(false);
  };

  const handleTabSelect = (tab: string) => {
    setSelectedTemplate(tab);
  };

  const handleChatAreaClick = () => {
    if (showTemplates) {
      setShowTemplates(false);
    }
    if (popup.visible) {
      setPopup({ visible: false, top: 0, left: 0 });
    }
    if (showMenuDropdown) {
      // Add this
      setShowMenuDropdown(false);
    }
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent chat area click
    setShowMenuDropdown(!showMenuDropdown);
  };

  const handleUserMessageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const containerRect = chatContainerRef.current?.getBoundingClientRect();

    if (containerRect) {
      setPopup({
        visible: true,
        top: rect.top - containerRect.top + rect.height / 2,
        left: rect.left - containerRect.left - 200,
      });
    }
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleCameraCapture = () => {
    cameraInputRef.current?.click();
  };

  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) {
      return;
    }
    await uploadImage(file);
  };

  const uploadImage = async (file: File) => {
    setUploading(true);

    setTimeout(() => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        const newMessage: Message = {
          id: chatMessages.length + 1,
          sender: "健太",
          avatar: null,
          time: getCurrentTime(),
          content: {
            image: imageUrl,
          },
          isUser: true,
        };
        setChatMessages((prev) => [...prev, newMessage]);
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
        if (cameraInputRef.current) cameraInputRef.current.value = "";
      };
      reader.readAsDataURL(file);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const lines = message.split("\n");
      const newMessage: Message = {
        id: chatMessages.length + 1,
        sender: "健太",
        avatar: null,
        time: getCurrentTime(),
        content: {
          vietnamese: lines[0] || "",
          japanese: lines[1] || "",
        },
        isUser: true,
      };
      setChatMessages((prev) => [...prev, newMessage]);
      setMessage("");
      setSelectedTemplateItem(null);
    }
  };

  const closeExtension = () => {
    setSelectedTemplateItem(null);
    setMessage("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ChevronLeft className={styles.headerIcon} />
        <div className={styles.headerTitle}>
          <span className={styles.titleText}>トークルーム名（7）</span>
          <Edit3 className={styles.editIcon} />
        </div>
        <Menu className={styles.menuIcon} onClick={handleMenuClick} />

        {showMenuDropdown && (
          <div
            className={styles.popup}
            style={{ top: 50, left: "auto", right: 3, bottom: "auto" }}
          >
            <div className={styles.popupItem}>
              メッセージを見た人 <br /> Người xem
            </div>
            <div className={`${styles.popupItem} ${styles.popupItemDisabled}`}>
              送信を取り消す <br /> Thu hồi
            </div>
            <div className={styles.popupItem}>
              定型文へ追加 <br /> Thêm mẫu
            </div>
            <div className={`${styles.popupItem} ${styles.popupItemLast}`}>
              復習用に登録 <br /> Lưu ôn tập
            </div>
          </div>
        )}
      </div>

      <div className={styles.dateSeparator}>
        <span className={styles.dateText}>今日</span>
      </div>

      <div
        ref={chatContainerRef}
        className={styles.chatContainer}
        onClick={handleChatAreaClick}
      >
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.messageWrapper} ${
              msg.isUser ? styles.messageWrapperUser : ""
            }`}
          >
            <div
              className={
                msg.isUser
                  ? styles.userMessageContainer
                  : styles.otherMessageContainer
              }
            >
              {!msg.isUser && (
                <div className={styles.avatar}>
                  {msg.avatar ? (
                    <img
                      src={msg.avatar}
                      alt={msg.sender}
                      className={styles.avatarImage}
                    />
                  ) : (
                    <span>👤</span>
                  )}
                </div>
              )}

              <div className={msg.isUser ? "" : styles.messageContent}>
                {!msg.isUser && (
                  <div className={styles.senderName}>{msg.sender}</div>
                )}

                <div
                  onClick={msg.isUser ? handleUserMessageClick : undefined}
                  className={`${styles.messageBubble} ${
                    msg.isUser ? styles.userBubble : styles.otherBubble
                  }`}
                >
                  {msg.content.image ? (
                    <img
                      src={msg.content.image}
                      alt="Uploaded"
                      className={styles.messageImage}
                    />
                  ) : (
                    <>
                      {msg.content.japanese && (
                        <div className={styles.japaneseText}>
                          {msg.content.japanese}
                        </div>
                      )}
                      {msg.content.vietnamese && (
                        <div className={styles.vietnameseText}>
                          {msg.content.vietnamese}
                        </div>
                      )}
                    </>
                  )}
                </div>

                <div
                  className={`${styles.timeText} ${
                    msg.isUser ? styles.timeTextRight : ""
                  }`}
                >
                  {msg.time}
                </div>
              </div>
            </div>
          </div>
        ))}

        {uploading && (
          <div className={styles.uploadingWrapper}>
            <div className={styles.uploadingBubble}>
              <div className={styles.uploadingText}>Uploading...</div>
            </div>
          </div>
        )}

        {popup.visible && (
          <div
            className={styles.popup}
            style={{ top: 355, bottom: "auto", right: 190, left: "auto" }}
          >
            <div className={styles.popupItem}>
              メッセージを見た人 <br /> Người xem
            </div>
            <div className={`${styles.popupItem} ${styles.popupItemDisabled}`}>
              送信を取り消す <br /> Thu hồi
            </div>
            <div className={styles.popupItem}>
              定型文へ追加 <br /> Thêm mẫu
            </div>
            <div className={`${styles.popupItem} ${styles.popupItemLast}`}>
              復習用に登録 <br /> Lưu ôn tập
            </div>
          </div>
        )}
      </div>

      {showTemplates && (
        <div className={styles.templateContainer}>
          <div className={styles.templateTabs}>
            <Clock className={styles.clockIcon} />
            <div className={styles.tabsWrapper}>
              {templateTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabSelect(tab)}
                  className={`${styles.tabButton} ${
                    selectedTemplate === tab ? styles.tabButtonActive : ""
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.templateGrid}>
            {templates[selectedTemplate]?.slice(0, 8).map((template, index) => (
              <button
                key={index}
                onClick={() => handleTemplateSelect(template)}
                className={styles.templateButton}
              >
                <div className={styles.templateVietnamese}>
                  {template.vietnamese}
                </div>
                <div className={styles.templateJapanese}>
                  {template.japanese}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedTemplateItem && (
        <div className={styles.extensionContainer}>
          <div className={styles.extensionText}>
            <div className={styles.extensionVietnamese}>
              {selectedTemplateItem.vietnamese}
            </div>
            <div className={styles.extensionJapanese}>
              {selectedTemplateItem.japanese}
            </div>
          </div>
          <button className={styles.extensionCross} onClick={closeExtension}>
            ×
          </button>
        </div>
      )}

      <div
        className={`${styles.inputContainer} ${
          selectedTemplateItem ? styles.inputContainerAttached : ""
        }`}
      >
        <div className={styles.inputWrapper}>
          <div className={styles.iconGroup}>
            <Languages className={styles.inputIcon} />
            <button
              onClick={handleCameraCapture}
              disabled={uploading}
              className={styles.iconButton}
            >
              <Camera
                className={
                  uploading
                    ? `${styles.inputIcon} ${styles.iconDisabled}`
                    : styles.inputIcon
                }
              />
            </button>
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              className={styles.hiddenInput}
              disabled={uploading}
            />
            <button onClick={handleImageUpload} className={styles.iconButton}>
              <Image className={styles.inputIcon} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={styles.hiddenInput}
            />
          </div>

          <div className={styles.inputBox}>
            <textarea className={styles.textarea} placeholder="Aa" rows={1} />
            <button
              onClick={() => setShowTemplates(!showTemplates)}
              className={styles.templateToggle}
            >
              A
            </button>
          </div>

          <button onClick={handleSendMessage} className={styles.sendButton}>
            <LucideSend className={styles.sendIcon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatDetailScreen;
