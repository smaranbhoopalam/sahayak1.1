import React from 'react';
import { Bell, AlertCircle, Info, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { NotificationItem } from '../../types';

interface NotificationCardProps {
  notification: NotificationItem;
  onDismiss?: (id: string) => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => {
  const navigate = useNavigate();

  const getIcon = () => {
    switch (notification.type) {
      case 'alert':
        return <AlertCircle className="w-5 h-5 text-rose-500" />;
      case 'reminder':
        return <Bell className="w-5 h-5 text-amber-500" />;
      default:
        return <Info className="w-5 h-5 text-brand-500" />;
    }
  };

  const handleClick = () => {
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`p-4 rounded-xl border transition-all duration-200 flex items-start gap-3.5 ${
        notification.actionUrl ? 'cursor-pointer hover:bg-slate-50 hover:border-brand-200' : ''
      } ${notification.read ? 'bg-white border-slate-100 text-slate-600' : 'bg-brand-50/30 border-brand-100/60 text-slate-800'}`}
    >
      <div className="p-2 rounded-lg bg-white shadow-xs border border-slate-100 shrink-0">
        {getIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-sm font-semibold text-slate-900 truncate">{notification.title}</h4>
          <span className="text-[11px] text-slate-400 shrink-0">{notification.timestamp}</span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{notification.description}</p>
      </div>
      {notification.actionUrl && (
        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 self-center" />
      )}
    </div>
  );
};
