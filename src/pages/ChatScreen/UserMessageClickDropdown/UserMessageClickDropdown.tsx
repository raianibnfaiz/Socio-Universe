import React from "react";
import styles from "./UserMessageClickDropdown.module.css";

interface UserMessageClickDropdownProps {
  isVisible: boolean;
  onClose: () => void;
  position: {
    top: number;
    left: number;
  };
}

export const UserMessageClickDropdown: React.FC<
  UserMessageClickDropdownProps
> = ({ isVisible, onClose, position }) => {
  if (!isVisible) return null;

  const handleItemClick = (action: string) => {
    console.log(`Message action: ${action}`);

    switch (action) {
      case "view-readers":
        // Handle viewing who read the message
        break;
      case "recall-message":
        // Handle message recall (currently disabled)
        break;
      case "add-template":
        // Handle adding to templates
        break;
      case "save-review":
        // Handle saving for review
        break;
      default:
        break;
    }

    onClose();
  };

  return (
    <div
      className={styles.popup}
      style={{
        top: position.top,
        left: position.left,
        bottom: "auto",
        right: "auto",
      }}
    >
      <div
        className={styles.popupItem}
        onClick={() => handleItemClick("view-readers")}
      >
        メッセージを見た人 <br /> Người xem
      </div>
      <div
        className={`${styles.popupItem} ${styles.popupItemDisabled}`}
        onClick={() => handleItemClick("recall-message")}
      >
        送信を取り消す <br /> Thu hồi
      </div>
      <div
        className={styles.popupItem}
        onClick={() => handleItemClick("add-template")}
      >
        定型文へ追加 <br /> Thêm mẫu
      </div>
      <div
        className={`${styles.popupItem} ${styles.popupItemLast}`}
        onClick={() => handleItemClick("save-review")}
      >
        復習用に登録 <br /> Lưu ôn tập
      </div>
    </div>
  );
};
