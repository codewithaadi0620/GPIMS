import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Lock, AlertCircle, Settings, Cloud, Shield } from 'lucide-react';

const StaffLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const result = await login(email, password);

        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.message);
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] relative overflow-hidden font-sans p-4">
            
            {/* Faint Background Pattern Simulation */}
            <div className="absolute inset-0 z-0 opacity-5 pointer-events-none flex items-center justify-center">
                <Settings size={800} className="text-gray-900 animate-spin-slow" style={{ animationDuration: '60s' }} />
            </div>

            {/* Split Card Container */}
            <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden max-w-4xl w-full relative z-10 border border-gray-100 min-h-[450px]">
                
                {/* Left Side (Dark Gray) */}
                <div className="bg-[#4d4d4f] text-white p-12 flex flex-col justify-center items-center w-full md:w-5/12 text-center">
                    {/* Logo */}
                    <div className="flex items-center justify-center gap-1 mb-8">
                        <div className="bg-[#e60000] text-white font-black text-3xl px-2 py-1 rounded-full w-16 h-16 flex items-center justify-center">
                            GP
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-white font-black text-4xl tracking-tighter leading-none">IMS</span>
                            <span className="text-white font-bold text-[8px] tracking-[0.1em] uppercase opacity-80 mt-1">
                                Govt Polytechnique
                            </span>
                            <span className="text-white font-bold text-[6px] tracking-[0.1em] uppercase opacity-80">
                                Management System
                            </span>
                        </div>
                    </div>

                    <h2 className="text-2xl font-light tracking-wide mb-16 leading-tight">
                        GP Information<br/>Management System <span className="font-bold">2.0</span>
                    </h2>

                    {/* Bottom Logos */}
                    <div className="flex items-center justify-center gap-6 mt-auto">
                        <div className="flex flex-col items-center gap-1 text-[#e60000]">
                            <Cloud size={28} />
                            <span className="text-[8px] font-bold">GP Cloud</span>
                        </div>
                        <div className="text-[#e60000] font-black tracking-widest text-2xl">
                            ERP
                        </div>
                        <div className="flex flex-col items-center gap-1 text-[#e60000]">
                            <Shield size={28} />
                            <span className="text-[8px] font-bold">Secure</span>
                        </div>
                    </div>
                </div>

                {/* Right Side (White Form) */}
                <div className="bg-white p-10 md:p-16 flex flex-col justify-center w-full md:w-7/12">
                    
                    <h2 className="text-2xl font-bold text-gray-800 mb-10">
                        Staff Login - <span className="text-[#e60000] font-normal">Mohali Campus</span>
                    </h2>

                    {error && (
                        <div className="bg-red-50 border-l-4 border-[#e60000] p-3 mb-6 flex items-start">
                            <AlertCircle className="h-5 w-5 text-[#e60000] mr-2 flex-shrink-0" />
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="flex items-stretch border border-gray-300 rounded-lg overflow-hidden focus-within:border-gray-400 transition-colors">
                            <div className="bg-gray-500 px-4 flex items-center justify-center text-white">
                                <User size={18} />
                            </div>
                            <input
                                type="email"
                                required
                                className="block w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 outline-none text-sm"
                                placeholder="Enter User Id / Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="flex items-stretch border border-gray-300 rounded-lg overflow-hidden focus-within:border-gray-400 transition-colors">
                            <div className="bg-gray-500 px-4 flex items-center justify-center text-white">
                                <Lock size={18} />
                            </div>
                            <input
                                type="password"
                                required
                                className="block w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 outline-none text-sm"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-[#e60000] text-white px-8 py-2.5 rounded hover:bg-[#cc0000] transition-colors text-sm font-bold shadow-md w-fit"
                        >
                            {isLoading ? 'WAIT...' : 'NEXT'}
                        </button>
                    </form>

                    <div className="mt-auto pt-16 flex justify-between items-center text-[10px] text-gray-500">
                        <span>Copyright © | Ver. 2.0.0</span>
                        <a href="#" className="text-[#e60000] hover:underline">Need Help?</a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StaffLogin;
