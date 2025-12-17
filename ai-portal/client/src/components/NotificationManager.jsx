import { useEffect } from 'react';

const NotificationManager = () => {
    useEffect(() => {
        // 1. Request Browser Permission
        if (Notification.permission !== "granted") {
            Notification.requestPermission();
        }

        // 2. Poll Backend for Alerts
        const checkAlerts = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/notifications');
                const data = await res.json();

                if (data.alert) {
                    new Notification("⚠️ You missed your AI Lesson!", {
                        body: data.message,
                        icon: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Infowarning_ri.svg"
                    });
                }
            } catch (err) {
                console.error("Notification Poll Error", err);
            }
        };

        // Check every minute
        const interval = setInterval(checkAlerts, 60000);
        checkAlerts(); // Initial check

        return () => clearInterval(interval);
    }, []);

    return null; // Component does not render UI
};

export default NotificationManager;
