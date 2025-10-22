import React, { useState, useRef, useEffect } from "react";
import { Clock } from "lucide-react";
import user1 from "../../assets/images/user1.png";
import user2 from "../../assets/images/user2.png";
import user4 from "../../assets/images/user4.png";
import styles from "./ChatScreen.module.css";
import { SendIcon } from "../../icon/sendIcon";
import { TranslationIcon } from "../../icon/translation";
import { CameraImageIcon } from "../../icon/cameraImageIcon";
import { GalleryImageIcon } from "../../icon/galleryImageicon";
import { BackIcon } from "../../icon/backIcon";
import { MenuIcon } from "../../icon/menuIcon";
import { EditIcon } from "../../icon/editIcon";
import { MenuDropdown } from "./MenuDropdown/MenuDropdown";
import { UserMessageClickDropdown } from "./UserMessageClickDropdown/UserMessageClickDropdown";
import { MemberPopup } from "./MemberPopup/MemberPopup";
import { AButtonIcon } from "../../icon/aButtonIcon";
import { CloseIcon } from "../../icon/closeIcon";

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

interface Member {
  name: string;
  avatar: string;
  subtitle?: string;
}

const ChatDetailScreen: React.FC = () => {
  const [message, setMessage] = useState("");
  const [showTemplates, setShowTemplates] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("tempA");
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const [showMemberPopup, setShowMemberPopup] = useState(false);
  const [messagePopup, setMessagePopup] = useState({
    visible: false,
    top: 0,
    left: 0,
  });
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

  const [selectedTemplateItem, setSelectedTemplateItem] = useState<{
    vietnamese: string;
    japanese: string;
  } | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const members: Member[] = [
    { name: "Nguyễn Minh Quân（自分)", avatar: user2 },
    { name: "Mamiko Hayashi (VN)", avatar: user4 },
    { name: "Yuichi Kanzaki", avatar: user1 },
    { name: "Naoto Ishigaki", avatar: user2 },
    { name: "Takashi Miyashita", avatar: user4 },
    { name: "Keiko Tokunaga", avatar: user1 },
    { name: "Hoàng Thị Trang", avatar: user2 },
  ];

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
    tempF: [],
  };
  // Enable mouse drag scroll for horizontal tab bar

  const templateTabs = ["tempA", "tempB", "tempC", "tempD", "tempE", "tempF"];

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);
  useEffect(() => {
    // Fix mobile viewport height issues
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVH();
    window.addEventListener("resize", setVH);
    window.addEventListener("orientationchange", setVH);

    return () => {
      window.removeEventListener("resize", setVH);
      window.removeEventListener("orientationchange", setVH);
    };
  }, []);

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
    //setMessage(`${template.vietnamese}\n${template.japanese}`);
  };

  const handleTabSelect = (tab: string) => {
    setSelectedTemplate(tab);
  };

  const handleChatAreaClick = () => {
    if (showTemplates) {
      setShowTemplates(false);
    }
    if (messagePopup.visible) {
      // Updated from popup to messagePopup
      setMessagePopup({ visible: false, top: 0, left: 0 });
    }
    if (showMenuDropdown) {
      setShowMenuDropdown(false);
    }
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent chat area click
    setShowMenuDropdown(!showMenuDropdown);
  };

  const handleBackClick = () => {
    setShowMemberPopup(true);
  };

  const handleUserMessageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const containerRect = chatContainerRef.current?.getBoundingClientRect();

    if (containerRect) {
      setMessagePopup({
        visible: true,
        top: rect.top - containerRect.top + rect.height / 2,
        left: rect.left - containerRect.left - 200,
      });
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
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
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.iconCursor} onClick={handleBackClick}>
            <BackIcon />
          </div>

          <div className={styles.headerTitle}>
            <span className={styles.titleText}>トークルーム名（7）</span>
            <div className={styles.iconCursor}>
              <EditIcon />
            </div>
          </div>
          <div onClick={handleMenuClick} className={styles.iconCursor}>
            <MenuIcon />
          </div>
          <MenuDropdown
            isVisible={showMenuDropdown}
            onClose={() => setShowMenuDropdown(false)}
            position={{ top: 50, right: 3 }}
          />
        </div>

        <div className={styles.dateSeparator}>
          <span className={styles.dateText}>今日</span>
        </div>

        <div className={styles.mainContent}>
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

                    <div className={styles.messageRow}>
                      <div
                        onClick={
                          msg.isUser ? handleUserMessageClick : undefined
                        }
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

                      <div className={styles.timeContainer}>
                        {msg.avatar === null && (
                          <div className={styles.readStatus}>既読 6</div>
                        )}
                        <div
                          className={`${styles.timeText} ${
                            msg.isUser
                              ? styles.timeTextRight
                              : styles.timeTextLeft
                          }`}
                        >
                          {msg.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <UserMessageClickDropdown
              isVisible={messagePopup.visible}
              onClose={() =>
                setMessagePopup({ visible: false, top: 0, left: 0 })
              }
              position={{ top: messagePopup.top, left: messagePopup.left }}
            />
          </div>
          <div className={styles.inputSection}>
            {selectedTemplateItem && (
              <div className={styles.extensionContainer}>
                <div className={styles.extensionText}>
                  <div className={styles.extensionVietnamese}>
                    {selectedTemplateItem.vietnamese}
                  </div>
                </div>
                {/* <button
                  className={styles.extensionCross}
                  onClick={closeExtension}
                >
                  ×
                </button> */}
                <div onClick={closeExtension} className={styles.extensionCross}>
                  <CloseIcon />
                </div>
              </div>
            )}

            <div
              className={`${styles.inputContainer} ${
                selectedTemplateItem ? styles.inputContainerAttached : ""
              }`}
            >
              <div className={styles.inputWrapper}>
                <div className={styles.iconGroup}>
                  <div className={styles.iconCursor}>
                    <TranslationIcon />
                  </div>
                  <div className={styles.iconCursor}>
                    <CameraImageIcon />
                  </div>
                  <div className={styles.iconCursor}>
                    <GalleryImageIcon />
                  </div>
                </div>

                <div className={styles.inputBox}>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={styles.textarea}
                    placeholder="Aa"
                    rows={1}
                    style={{ fontSize: "16px" }}
                  />
                  <div
                    onClick={() => setShowTemplates(!showTemplates)}
                    className={styles.templateToggle}
                  >
                    <AButtonIcon />
                  </div>
                </div>
                <button
                  onClick={handleSendMessage}
                  className={styles.sendButton}
                >
                  <SendIcon />
                </button>
              </div>
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
                  {templates[selectedTemplate]
                    ?.slice(0, 8)
                    .map((template, index) => (
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
          </div>
        </div>
      </div>
      <MemberPopup
        isVisible={showMemberPopup}
        onClose={() => setShowMemberPopup(false)}
        members={members}
      />
    </>
  );
};

export default ChatDetailScreen;
