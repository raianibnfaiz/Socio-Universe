import React from "react";
import styles from "./MemberPopup.module.css";

interface Member {
  name: string;
  avatar: string;
  subtitle?: string;
}

interface MemberPopupProps {
  isVisible: boolean;
  onClose: () => void;
  members: Member[];
}

export const MemberPopup: React.FC<MemberPopupProps> = ({
  isVisible,
  onClose,
  members,
}) => {
  if (!isVisible) return null;

  const handleMemberClick = (member: Member) => {
    console.log(`Member clicked: ${member.name}`);
    // Add specific functionality for member selection here
    // For example: navigate to member profile, start private chat, etc.
  };

  return (
    <div className={styles.memberOverlay} onClick={onClose}>
      <div className={styles.memberPopup} onClick={(e) => e.stopPropagation()}>
        {/* <div className={styles.memberHeader}>
          <h3 className={styles.memberTitle}>メンバー一覧</h3>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div> */}

        <div className={styles.memberList}>
          {members.map((member, index) => (
            <div
              key={index}
              className={styles.memberItem}
              onClick={() => handleMemberClick(member)}
            >
              <div className={styles.memberAvatar}>
                <img
                  src={member.avatar}
                  alt={member.name}
                  className={styles.memberAvatarImage}
                />
              </div>
              <div className={styles.memberInfo}>
                <div className={styles.memberName}>{member.name}</div>
                {member.subtitle && (
                  <div className={styles.memberSubtitle}>{member.subtitle}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
