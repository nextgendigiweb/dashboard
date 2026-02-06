
import React, { useState } from 'react';
import { useSignUp } from '@clerk/clerk-react';
import { COLORS, HUDFrame } from '../../constants';
import VerifyEmail from './VerifyEmail';
import {
    ShieldCheck, Lock, Mail,
    ArrowRight, Loader2, User, Eye, EyeOff
} from 'lucide-react';

interface SignupProps {
    onSignup: () => void;
    onSwitchToLogin: () => void;
}

const Signup: React.FC<SignupProps> = ({ onSignup, onSwitchToLogin }) => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [authStep, setAuthStep] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [verifying, setVerifying] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded) return;

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setIsAuthenticating(true);
        setError('');
        setAuthStep('Creating_Entity_Profile...');

        try {
            await signUp.create({
                emailAddress: formData.email,
                password: formData.password,
                firstName: formData.name.split(' ')[0],
                lastName: formData.name.split(' ').slice(1).join(' '),
            });

            setAuthStep('Generating_Security_Keys...');
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

            setAuthStep('Awaiting_Email_Validation...');
            setTimeout(() => {
                setVerifying(true);
                setIsAuthenticating(false);
            }, 500);
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
            setError(err.errors?.[0]?.message || 'Registration failed.');
            setIsAuthenticating(false);
        }
    };

    const handleVerifyComplete = async () => {
        setAuthStep('Identity_Created_Successfully.');
        if (signUp.status === 'complete') {
            await setActive({ session: signUp.createdSessionId });
            onSignup();
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    if (verifying) {
        return (
            <VerifyEmail
                email={formData.email}
                onVerify={handleVerifyComplete}
                onCancel={() => setVerifying(false)}
            />
        );
    }

    return (
        <div className="w-full max-w-md md:max-w-2xl relative animate-in fade-in zoom-in duration-700">
            <div className="bg-black border border-white/10 p-4 sm:p-6 md:p-10 relative group shadow-2xl">
                <HUDFrame color={COLORS.cyan} />


                <div className="text-center mb-6 sm:mb-8 md:mb-10 mt-4">
                    <div className="flex justify-center mb-6">
                        <img src="/Logo.svg" alt="Logo" className="w-32 h-auto sm:w-40 md:w-48" />
                    </div>
                    <h1 className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] mb-1 sm:mb-2">
                        Create Identity
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Name field */}
                                <div className="relative group/field">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/field:text-cyan-500 transition-colors">
                                        <User size={14} className="sm:w-4 sm:h-4" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        autoComplete="name"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className="w-full bg-zinc-950 border border-white/5 p-3 sm:p-3.5 md:p-4 pl-10 sm:pl-11 md:pl-12 text-[11px] sm:text-xs font-mono text-white outline-none focus:border-cyan-500/40 transition-all rounded-sm placeholder:text-white/10"
                                    />
                                </div>

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
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Password field */}
                                <div className="relative group/field">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/field:text-cyan-500 transition-colors">
                                        <Lock size={14} className="sm:w-4 sm:h-4" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        autoComplete="new-password"
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

                                {/* Confirm Password field */}
                                <div className="relative group/field">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/field:text-cyan-500 transition-colors">
                                        <Lock size={14} className="sm:w-4 sm:h-4" />
                                    </div>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        required
                                        autoComplete="new-password"
                                        placeholder="Confirm your password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                        className="w-full bg-zinc-950 border border-white/5 p-3 sm:p-3.5 md:p-4 pl-10 sm:pl-11 md:pl-12 pr-10 sm:pr-11 md:pr-12 text-[11px] sm:text-xs font-mono text-white outline-none focus:border-cyan-500/40 transition-all rounded-sm placeholder:text-white/10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-cyan-500 transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff size={14} className="sm:w-4 sm:h-4" /> : <Eye size={14} className="sm:w-4 sm:h-4" />}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <p className="text-red-500 font-mono text-[9px] uppercase tracking-wider text-center">
                                    Error: {error}
                                </p>
                            )}
                        </div>

                        {/* <label className="flex items-start gap-2 cursor-pointer group text-[8px] sm:text-[9px] font-mono">
                            <div className="w-3 h-3 border border-white/20 rounded-sm group-hover:border-cyan-500 transition-all flex items-center justify-center mt-0.5">
                                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-[1px] opacity-0 group-hover:opacity-40" />
                            </div>
                            <span className="text-white/20 uppercase tracking-widest leading-relaxed">
                                I agree to the <span className="text-cyan-500/60 hover:text-cyan-400">Terms_of_Service</span> and <span className="text-cyan-500/60 hover:text-cyan-400">Privacy_Policy</span>
                            </span>
                        </label> */}

                        <button
                            type="submit"
                            className="w-full py-4 sm:py-4.5 md:py-5 bg-white text-black font-black uppercase text-[10px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.4em] hover:bg-zinc-200 active:scale-95 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2 sm:gap-3"
                        >
                            <span className="truncate">Create Account</span>
                            <ArrowRight size={14} className="sm:w-4 sm:h-4 shrink-0" />
                        </button>

                        <div className="pt-4 sm:pt-6 md:pt-8 border-t border-white/5 text-center">
                            <button
                                type="button"
                                onClick={onSwitchToLogin}
                                className="text-[8px] sm:text-[9px] font-mono text-white/20 hover:text-white transition-all uppercase tracking-[0.3em] sm:tracking-[0.4em]"
                            >
                                Return To Login
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Signup;
