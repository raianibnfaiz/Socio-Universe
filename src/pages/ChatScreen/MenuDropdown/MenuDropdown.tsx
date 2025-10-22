import React from "react";
import styles from "./MenuDropdown.module.css";

interface MenuDropdownProps {
  isVisible: boolean;
  onClose: () => void;
  position?: {
    top?: number;
    right?: number;
    left?: number | string;
    bottom?: number | string;
  };
}

export const MenuDropdown: React.FC<MenuDropdownProps> = ({
  isVisible,
  onClose,
  position = { top: 50, right: 3 },
}) => {
  if (!isVisible) return null;

  const handleItemClick = (action: string) => {
    console.log(`Menu action: ${action}`);
    // Add specific functionality for each menu item here
    onClose();
  };

  return (
    <div
      className={styles.popup}
      style={{
        top: position.top,
        right: position.right,
        left: position.left || "auto",
        bottom: position.bottom || "auto",
      }}
    >
      <div
        className={styles.popupItem}
        onClick={() => handleItemClick("view-members")}
      >
        メッセージを見た人 <br /> Người xemmm
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
