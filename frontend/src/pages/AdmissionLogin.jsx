import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Lock, AlertCircle } from 'lucide-react';

const AdmissionLogin = () => {
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
            className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden font-sans"
            style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop")', // Graduation theme
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            {/* Heavy Blur Overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-0"></div>

            {/* Centered Login Form - Screenshot 4 Style */}
            <div className="flex flex-col items-center justify-center w-full max-w-[400px] relative z-10 p-6">
                
                {/* Logo */}
                <div className="flex items-center justify-center gap-1 mb-6">
                    <div className="bg-[#e60000] text-white font-black text-3xl px-2 py-1 rounded-full w-16 h-16 flex items-center justify-center shadow-2xl">
                        GP
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white font-black text-4xl tracking-tighter leading-none drop-shadow-md">IMS</span>
                        <span className="text-white font-bold text-[8px] tracking-[0.1em] uppercase opacity-90 drop-shadow-md">
                            Govt Polytechnique Information
                        </span>
                        <span className="text-white font-bold text-[6px] tracking-[0.1em] uppercase opacity-70 drop-shadow-md">
                            Management System
                        </span>
                    </div>
                </div>

                <div className="text-center mb-8 w-full">
                    <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">Log in</h2>
                    <p className="text-xs text-gray-300 drop-shadow-md">
                        Welcome to University Information <br/>
                        Management System - <span className="text-[#e60000] font-medium drop-shadow-sm">GP Campus</span>
                    </p>
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-500/50 p-3 rounded flex items-start mb-4 w-full backdrop-blur-sm">
                        <AlertCircle className="h-4 w-4 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-red-200">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 w-full">
                    <div className="relative">
                        <input
                            type="email"
                            required
                            className="block w-full px-4 py-3 bg-white/40 backdrop-blur-md border border-white/20 rounded-full focus:ring-2 focus:ring-[#e60000] text-white placeholder-white/70 transition-all outline-none text-sm text-center shadow-inner"
                            placeholder="Enter User Id"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <User className="absolute right-5 top-3.5 h-4 w-4 text-white/70" />
                    </div>

                    <div className="relative">
                        <input
                            type="password"
                            required
                            className="block w-full px-4 py-3 bg-white/40 backdrop-blur-md border border-white/20 rounded-full focus:ring-2 focus:ring-[#e60000] text-white placeholder-white/70 transition-all outline-none text-sm text-center shadow-inner"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Lock className="absolute right-5 top-3.5 h-4 w-4 text-white/70" />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 px-4 text-sm font-bold rounded-full text-white bg-[#e60000] hover:bg-[#cc0000] transition-colors mt-2 shadow-lg"
                    >
                        {isLoading ? 'PLEASE WAIT...' : 'NEXT'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdmissionLogin;
