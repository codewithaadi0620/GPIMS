import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const PlaceholderPage = ({ title }) => {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 flex flex-col items-center text-center"
            >
                <div className="h-20 w-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                    <AlertCircle className="h-10 w-10 text-blue-500" />
                </div>
                <h1 className="text-3xl font-black text-gray-900 mb-4">{title}</h1>
                <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
                    This section is currently under development. Soon you will be able to access all information regarding {title.toLowerCase()} directly from this portal.
                </p>
                <div className="mt-10 flex gap-4">
                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
            </motion.div>
        </div>
    );
};

export default PlaceholderPage;
