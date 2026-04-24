import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap } from 'lucide-react';

const Results = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Academic Results</h1>
                <p className="text-sm text-gray-500">
                    {user?.role === 'admin' ? 'Manage student grades and marks' : 'View your academic performance'}
                </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center min-h-[400px]">
                <div className="h-20 w-20 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-4">
                    <GraduationCap size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Results Module Under Construction</h3>
                <p className="text-gray-500 max-w-md">
                    This section will allow {user?.role === 'admin' ? 'administrators to upload and edit' : 'students to securely view their'} academic grades and final marks.
                </p>
            </div>
        </div>
    );
};

export default Results;
