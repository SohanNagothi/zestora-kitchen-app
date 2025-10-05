/* PAGE: /notifications */
import { useState } from "react";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Bell, CheckCheck, Trash2, ChefHat, Heart, MessageSquare, Star } from "lucide-react";
import { toast } from "sonner";

interface Notification {
  id: string;
  type: "recipe" | "like" | "comment" | "update";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "recipe",
    title: "New Recipe Match!",
    message: "We found 3 new recipes matching your ingredients.",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    type: "like",
    title: "Recipe Liked",
    message: "Someone loved your 'Creamy Tomato Pasta' recipe!",
    timestamp: "5 hours ago",
    read: false,
  },
  {
    id: "3",
    type: "comment",
    title: "New Comment",
    message: "John commented on your recipe: 'Looks delicious!'",
    timestamp: "1 day ago",
    read: true,
  },
  {
    id: "4",
    type: "update",
    title: "Weekly Digest",
    message: "Check out the top 10 recipes this week!",
    timestamp: "2 days ago",
    read: true,
  },
];

const iconMap = {
  recipe: ChefHat,
  like: Heart,
  comment: MessageSquare,
  update: Star,
};

export default function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.success("Notification deleted");
  };

  const toggleRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-2">Notifications</h1>
              <p className="text-xl text-muted-foreground">
                {unreadCount > 0 ? `${unreadCount} unread` : "You're all caught up!"}
              </p>
            </div>
            {unreadCount > 0 && (
              <Button onClick={markAllAsRead} variant="outline" className="btn-scale">
                <CheckCheck className="mr-2 h-5 w-5" />
                Mark all read
              </Button>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="glass-card rounded-2xl p-16 shadow-soft text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
                <Bell className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-heading font-semibold mb-2">No notifications yet</h3>
              <p className="text-muted-foreground">
                We'll notify you when something important happens
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification, index) => {
                const Icon = iconMap[notification.type];
                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`glass-card rounded-xl p-4 shadow-soft transition-all hover:shadow-medium ${
                      !notification.read ? "border-l-4 border-primary" : ""
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                        !notification.read ? "bg-primary/20" : "bg-muted"
                      }`}>
                        <Icon className={`h-6 w-6 ${!notification.read ? "text-primary" : "text-muted-foreground"}`} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-semibold">{notification.title}</h3>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {notification.timestamp}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm">{notification.message}</p>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleRead(notification.id)}
                          title={notification.read ? "Mark as unread" : "Mark as read"}
                        >
                          <CheckCheck className={`h-4 w-4 ${notification.read ? "text-primary" : ""}`} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteNotification(notification.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
