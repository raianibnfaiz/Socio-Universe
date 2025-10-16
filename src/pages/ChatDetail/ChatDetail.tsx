import React from "react";
import BottomNavigation from "../../shared/BottomNavigation/bottomNavigation";

const ChatDetail: React.FC = () => {
  return (
    <div>
      <h1>Chat Detail</h1>
      <BottomNavigation activeTab="chat" onTabChange={() => {}} />
    </div>
  );
};

export default ChatDetail;
