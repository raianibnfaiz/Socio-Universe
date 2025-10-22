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
  };

  return (
    <div className={styles.memberOverlay} onClick={onClose}>
      <div className={styles.memberPopup} onClick={(e) => e.stopPropagation()}>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
