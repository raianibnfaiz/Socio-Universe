import React from "react";
import {
  MessageSquare,
  CreditCard,
  Settings,
  Home as HomeIcon,
  type LucideIcon,
  CardSimIcon,
  CreditCardIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./bottomNavigation.module.css";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
  path?: string;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs: Tab[] = [
    { id: "home", label: "Home", icon: HomeIcon, path: "/" },
    { id: "chat", label: "Chat", icon: MessageSquare, path: "/chat" },
    { id: "card", label: "Card", icon: CreditCardIcon, path: "/card" },
    { id: "setting", label: "Setting", icon: Settings },
  ];

  return (
    <div className="bottom-nav-container">
      <div className="bottom-nav">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const classes = `nav-item ${isActive ? "active" : ""}`;

          return tab.path ? (
            <Link key={tab.id} to={tab.path} className={classes}>
              <Icon className="nav-icon" />
              <span className="nav-label">{tab.label}</span>
            </Link>
          ) : (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={classes}
            >
              <Icon className="nav-icon" />
              <span className="nav-label">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
