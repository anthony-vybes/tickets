"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function SuccessPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 flex items-center justify-center p-4">
            <div className={`max-w-2xl w-full transition-all duration-500 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                {/* Success Icon */}
                <div className="flex justify-center mb-8">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                        <div className="relative w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                            <svg
                                className="w-12 h-12 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Success Message */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
                        Purchase Successful!
                    </h1>
                    <p className="text-xl text-slate-600 mb-2">
                        Thank you for your purchase
                    </p>
                </div>

                {/* Info Card */}
                <div className="bg-white border border-slate-200 shadow-md rounded-2xl p-8 mb-6">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                            <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-slate-900 mb-2">
                                Check Your Email
                            </h2>
                            <p className="text-slate-600 leading-relaxed">
                                We&apos;ve sent a confirmation email to your inbox with your ticket details and access link for the event.
                            </p>
                        </div>
                    </div>

                    {/* Important Notice */}
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                        <div className="flex gap-3">
                            <svg
                                className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                            <div>
                                <h3 className="text-amber-800 font-semibold mb-1">
                                    Check Your Spam Folder
                                </h3>
                                <p className="text-sm text-amber-700">
                                    If you don&apos;t see the email in your inbox within a few minutes, please check your spam or junk folder. Mark it as &quot;Not Spam&quot; to ensure you receive future updates.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* What's Next */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 mb-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">What&apos;s Next?</h3>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-sm font-bold">
                                1
                            </div>
                            <p className="text-slate-700 text-sm">
                                Save the access link from your email
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-sm font-bold">
                                2
                            </div>
                            <p className="text-slate-700 text-sm">
                                Add the event to your calendar
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-sm font-bold">
                                3
                            </div>
                            <p className="text-slate-700 text-sm">
                                Join a few minutes early to test your connection
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        href="/"
                        className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg text-center"
                    >
                        Back to Event Page
                    </Link>
                    <a
                        href="https://vybesapp.live"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 px-6 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 hover:text-slate-900 font-semibold rounded-xl transition-all text-center shadow-sm"
                    >
                        Explore Vybes
                    </a>
                </div>

                {/* Support */}
                <div className="text-center mt-8">
                    <p className="text-slate-600 text-sm">
                        Need help?{" "}
                        <a
                            href="mailto:support@vybes.com"
                            className="text-blue-600 hover:text-blue-700 underline"
                        >
                            Contact Support
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
