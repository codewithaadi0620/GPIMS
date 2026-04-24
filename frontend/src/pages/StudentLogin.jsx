import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Lock, AlertCircle, Apple } from 'lucide-react';

const StudentLogin = () => {
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
        <div 
            className="min-h-screen flex items-center justify-start p-8 lg:p-24 relative overflow-hidden font-sans"
            style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0"></div>

            {/* Login Card - Screenshot 1 Style */}
            <div className="bg-[#242424]/95 backdrop-blur-xl p-10 rounded-[2rem] shadow-2xl max-w-sm w-full relative z-10 border border-white/5">
                
                {/* Logo */}
                <div className="flex items-center justify-center gap-1 mb-6">
                    <div className="bg-[#e60000] text-white font-black text-2xl px-2 py-1 rounded-full w-12 h-12 flex items-center justify-center">
                        GP
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white font-black text-3xl tracking-tighter leading-none">IMS</span>
                        <span className="text-white font-bold text-[6px] tracking-[0.1em] uppercase opacity-70">
                            Govt Polytechnique Information
                        </span>
                    </div>
                </div>

                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">Log in</h2>
                    <p className="text-xs text-gray-400">
                        Welcome to University Information <br/>
                        Management System - <span className="text-[#e60000] font-medium">GP Campus</span>
                    </p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 p-3 rounded-xl flex items-start mb-4">
                        <AlertCircle className="h-4 w-4 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-red-200">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <input
                            type="text"
                            required
                            className="block w-full px-4 py-3 bg-[#3a3a3a] border border-transparent rounded-xl focus:ring-1 focus:ring-[#e60000] text-white placeholder-gray-400 transition-all outline-none text-sm"
                            placeholder="Enter User Id (UID) or Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <User className="absolute right-4 top-3.5 h-4 w-4 text-gray-400" />
                    </div>

                    <div className="relative">
                        <input
                            type="password"
                            required
                            className="block w-full px-4 py-3 bg-[#3a3a3a] border border-transparent rounded-xl focus:ring-1 focus:ring-[#e60000] text-white placeholder-gray-400 transition-all outline-none text-sm"
                            placeholder="Enter Password (DOB)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Lock className="absolute right-4 top-3.5 h-4 w-4 text-gray-400" />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3.5 px-4 text-sm font-bold rounded-xl text-white bg-[#e60000] hover:bg-[#cc0000] transition-colors mt-2"
                    >
                        {isLoading ? 'PLEASE WAIT...' : 'NEXT'}
                    </button>
                </form>

                <div className="flex items-center justify-center my-4">
                    <div className="h-px bg-gray-600 flex-1"></div>
                    <span className="text-[10px] text-gray-400 px-2 uppercase font-bold">OR</span>
                    <div className="h-px bg-gray-600 flex-1"></div>
                </div>

                <Link
                    to="/register"
                    className="block text-center w-full py-3.5 px-4 text-sm font-bold rounded-xl text-white bg-[#3b7b9d] hover:bg-[#2f6380] transition-colors"
                >
                    CLICK HERE FOR REGISTRATION
                </Link>

                <div className="flex justify-between items-center mt-8 gap-3">
                    <button className="flex-1 bg-black border border-gray-700 rounded-lg p-2 flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Play Store" className="h-6" />
                    </button>
                    <button className="flex-1 bg-black border border-gray-700 rounded-lg p-2 flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors">
                        <Apple className="h-6 w-6 text-white" />
                        <div className="text-left leading-none">
                            <span className="text-[8px] text-gray-300 block">Download on the</span>
                            <span className="text-sm text-white font-semibold block">App Store</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentLogin;
