
import React, { useState } from 'react';
import { useSignIn } from '@clerk/clerk-react';
import { COLORS, HUDFrame } from '../../constants';
import {
    ShieldCheck, Lock, Mail,
    ArrowRight, Loader2, User, Eye, EyeOff
} from 'lucide-react';

interface LoginProps {
    onLogin: () => void;
    onSwitchToSignup: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onSwitchToSignup }) => {
    const { isLoaded, signIn, setActive } = useSignIn();
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [authStep, setAuthStep] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded) return;

        setIsAuthenticating(true);
        setError('');
        setAuthStep('Establishing_Secure_Tunnel...');

        try {
            const result = await signIn.create({
                identifier: formData.email,
                password: formData.password,
            });

            if (result.status === 'complete') {
                setAuthStep('Decrypting_Session_Keys...');
                await setActive({ session: result.createdSessionId });
                setAuthStep('Access_Granted.');
                setTimeout(onLogin, 500);
            } else {
                console.error(JSON.stringify(result, null, 2));
                setError('Login failed. Please check your credentials.');
                setIsAuthenticating(false);
            }
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
            setError(err.errors?.[0]?.message || 'Authentication error.');
            setIsAuthenticating(false);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="w-full max-w-md relative animate-in fade-in zoom-in duration-700">
            <div className="bg-black border border-white/10 p-4 sm:p-6 md:p-10 relative group shadow-2xl">
                <HUDFrame color={COLORS.cyan} />


                <div className="text-center mb-6 sm:mb-8 md:mb-10 mt-4">
                    <div className="flex justify-center mb-6">
                        <img src="/Logo.svg" alt="Logo" className="w-32 h-auto sm:w-40 md:w-48" />
                    </div>
                    <h1 className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] mb-1 sm:mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-[7px] sm:text-[8px] md:text-[9px] font-mono text-white/30 uppercase tracking-widest px-2">
                        Secured by Protocol X-99 // Node: {Math.random().toString(16).slice(2, 6).toUpperCase()}
                    </p>
                </div>

                {isAuthenticating ? (
                    <div className="py-8 sm:py-10 md:py-12 flex flex-col items-center justify-center gap-4 sm:gap-5 md:gap-6 animate-in fade-in duration-500">
                        <div className="relative">
                            <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-500 animate-spin" strokeWidth={1} />
                            <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full animate-pulse" />
                        </div>
                        <div className="text-[8px] sm:text-[9px] md:text-[10px] font-mono text-cyan-500 font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] animate-pulse text-center px-2">
                            {authStep}
                        </div>
                        <div className="w-full max-w-xs h-1 bg-white/5 rounded-full overflow-hidden mt-2 sm:mt-4">
                            <div className="h-full bg-cyan-500 animate-[shimmer_2s_infinite] w-full" />
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleAuth} className="space-y-4 sm:space-y-5 md:space-y-6">
                        <div className="space-y-3 sm:space-y-4">
                            {/* Email field */}
                            <div className="relative group/field">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/field:text-cyan-500 transition-colors">
                                    <Mail size={14} className="sm:w-4 sm:h-4" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    autoComplete="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className="w-full bg-zinc-950 border border-white/5 p-3 sm:p-3.5 md:p-4 pl-10 sm:pl-11 md:pl-12 text-[11px] sm:text-xs font-mono text-white outline-none focus:border-cyan-500/40 transition-all rounded-sm placeholder:text-white/10"
                                />
                            </div>

                            {/* Password field */}
                            <div className="relative group/field">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/field:text-cyan-500 transition-colors">
                                    <Lock size={14} className="sm:w-4 sm:h-4" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    className="w-full bg-zinc-950 border border-white/5 p-3 sm:p-3.5 md:p-4 pl-10 sm:pl-11 md:pl-12 pr-10 sm:pr-11 md:pr-12 text-[11px] sm:text-xs font-mono text-white outline-none focus:border-cyan-500/40 transition-all rounded-sm placeholder:text-white/10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-cyan-500 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={14} className="sm:w-4 sm:h-4" /> : <Eye size={14} className="sm:w-4 sm:h-4" />}
                                </button>
                            </div>

                            {error && (
                                <p className="text-red-500 font-mono text-[9px] uppercase tracking-wider text-center">
                                    Error: {error}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 sm:py-4.5 md:py-5 bg-white text-black font-black uppercase text-[10px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.4em] hover:bg-zinc-200 active:scale-95 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2 sm:gap-3"
                        >
                            <span className="truncate">Login</span>
                            <ArrowRight size={14} className="sm:w-4 sm:h-4 shrink-0" />
                        </button>

                        <div className="pt-4 sm:pt-6 md:pt-8 border-t border-white/5 text-center">
                            <button
                                type="button"
                                onClick={onSwitchToSignup}
                                className="text-[8px] sm:text-[9px] font-mono text-white/20 hover:text-white transition-all uppercase tracking-[0.3em] sm:tracking-[0.4em]"
                            >
                                Register New Entity
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;
