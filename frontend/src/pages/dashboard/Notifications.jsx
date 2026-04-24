import React, { useState, useEffect } from 'react';
import { getNotifications } from '../../services/api';
import { Bell, Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const data = await getNotifications();
                setNotifications(data);
            } catch (error) {
                console.error("Failed to fetch notifications", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    const getIcon = (type) => {
        switch(type) {
            case 'warning': return <AlertTriangle className="text-yellow-500" />;
            case 'success': return <CheckCircle className="text-green-500" />;
            case 'error': return <XCircle className="text-red-500" />;
            default: return <Info className="text-blue-500" />;
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                <p className="text-sm text-gray-500">Stay updated with the latest announcements</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        <Bell size={18} className="text-gray-500" />
                        All Notifications
                    </h3>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        Mark all as read
                    </button>
                </div>
                
                <div className="divide-y divide-gray-100">
                    {loading ? (
                        <div className="p-8 text-center text-gray-500">Loading notifications...</div>
                    ) : notifications.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">No new notifications.</div>
                    ) : (
                        notifications.map((notif) => (
                            <div key={notif._id} className="p-4 hover:bg-gray-50 transition-colors flex gap-4">
                                <div className="mt-1">
                                    {getIcon(notif.type)}
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-gray-900">{notif.title}</h4>
                                    <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                                    <span className="text-xs text-gray-400 mt-2 block">
                                        {new Date(notif.createdAt).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notifications;
