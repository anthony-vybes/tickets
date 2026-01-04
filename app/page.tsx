"use client";

import { useState, useEffect } from "react";
import { eventConfig, EventConfig } from "@/lib/event-config";
import Image from "next/image";

type TicketTier = "access" | "premium";

export default function Home() {
    const [config, setConfig] = useState<EventConfig>(eventConfig);
    const [selectedTicket, setSelectedTicket] = useState<TicketTier | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showHelpModal, setShowHelpModal] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        // In production, fetch configuration from your event creation app
        // const loadConfig = async () => {
        //   const eventId = new URLSearchParams(window.location.search).get('eventId');
        //   if (eventId) {
        //     const data = await fetchEventConfig(eventId);
        //     setConfig(data);
        //   }
        // };
        // loadConfig();

        // Countdown timer
        const eventDate = new Date("2026-01-04T19:00:00-05:00").getTime(); // 7:00 PM EST

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = eventDate - now;

            if (distance > 0) {
                setTimeRemaining({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000),
                });
            }
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleBuyTicket = (tier: TicketTier) => {
        setSelectedTicket(tier);
        setShowModal(true);
    };

    const handleConfirmPurchase = async () => {
        if (!selectedTicket) return;

        try {
            // Create Stripe checkout session
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ticketType: selectedTicket,
                    eventTitle: config.event.title,
                }),
            });

            const data = await response.json();

            if (data.url) {
                // Redirect to Stripe checkout
                window.location.href = data.url;
            } else {
                alert('Error creating checkout session. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error creating checkout session. Please try again.');
        }
    };

    const getTicketPrice = (tier: TicketTier) => {
        return config.tickets[tier].price;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <Image
                                src="/logo.png"
                                alt="Vybes Logo"
                                width={40}
                                height={40}
                                className="h-10 w-auto flex-shrink-0 object-contain"
                                unoptimized
                            />
                            <span className="text-2xl font-bold tracking-tight leading-none text-slate-900">
                                vybes
                            </span>
                        </div>
                        <button
                            onClick={() => setShowHelpModal(true)}
                            className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                            aria-label="Help"
                        >
                            <svg
                                className="w-6 h-6 text-blue-600 hover:text-blue-700"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">


                {/* Streamer Profile */}
                <div className="flex flex-col items-center mb-8">
                    <div className="relative mb-4">
                        <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-4 ring-blue-200 shadow-lg">
                            <Image
                                src={config.streamer.photo}
                                alt={config.streamer.name}
                                width={128}
                                height={128}
                                className="w-full h-full object-cover"
                                unoptimized
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                                {config.streamer.name}
                            </h2>
                            {config.streamer.verified && (
                                <svg
                                    className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0"
                                    viewBox="0 0 24 24"
                                    aria-label="Verified"
                                >
                                    <circle cx="12" cy="12" r="10" fill="#1D9BF0" />
                                    <path
                                        d="M9 12L11 14L15 10"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="none"
                                    />
                                </svg>
                            )}
                        </div>
                        <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto px-4">
                            {config.streamer.bio}
                        </p>
                    </div>
                </div>

                {/* Event Details */}
                <div className="bg-white border border-slate-200 shadow-md rounded-2xl p-6 mb-8">
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                        {config.event.title}
                    </h3>

                    {/* Date and Time Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                        {/* Date Card */}
                        <div className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200 hover:border-blue-300 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
                            <div className="flex items-center gap-3">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-blue-600 font-medium mb-0.5">Date</p>
                                    <p className="text-slate-900 font-semibold text-sm sm:text-base truncate">
                                        {config.event.date}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Time Card */}
                        <div className="group relative bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-4 border border-violet-200 hover:border-violet-300 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
                            <div className="flex items-center gap-3">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-violet-600 font-medium mb-0.5">Time</p>
                                    <p className="text-slate-900 font-semibold text-sm sm:text-base truncate">
                                        {config.event.time}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="text-slate-600 leading-relaxed">
                        {config.event.description}
                    </p>
                </div>

                {/* Countdown Timer */}
                {timeRemaining.days > 0 || timeRemaining.hours > 0 || timeRemaining.minutes > 0 || timeRemaining.seconds > 0 ? (
                    <div className="flex justify-center mb-8 px-2">
                        <div className="bg-white border border-slate-200 shadow-md rounded-2xl p-4 sm:p-6 w-full max-w-2xl">
                            <div className="text-center mb-3">
                                <p className="text-xs sm:text-sm text-slate-600 font-medium tracking-wide">Event starts in</p>
                            </div>
                            <div className="flex gap-2 sm:gap-4 items-center justify-center flex-wrap">
                                {timeRemaining.days > 0 && (
                                    <>
                                        <div className="text-center">
                                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl px-2 sm:px-4 py-2 sm:py-3 min-w-[50px] sm:min-w-[70px] border border-blue-200">
                                                <div className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                                    {timeRemaining.days}
                                                </div>
                                                <div className="text-[10px] sm:text-xs text-slate-600 mt-0.5 sm:mt-1">days</div>
                                            </div>
                                        </div>
                                        <div className="text-lg sm:text-2xl text-slate-400 font-bold">:</div>
                                    </>
                                )}
                                <div className="text-center">
                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl px-2 sm:px-4 py-2 sm:py-3 min-w-[50px] sm:min-w-[70px] border border-blue-200">
                                        <div className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                            {timeRemaining.hours.toString().padStart(2, '0')}
                                        </div>
                                        <div className="text-[10px] sm:text-xs text-slate-600 mt-0.5 sm:mt-1">hours</div>
                                    </div>
                                </div>
                                <div className="text-lg sm:text-2xl text-slate-400 font-bold">:</div>
                                <div className="text-center">
                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl px-2 sm:px-4 py-2 sm:py-3 min-w-[50px] sm:min-w-[70px] border border-blue-200">
                                        <div className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                            {timeRemaining.minutes.toString().padStart(2, '0')}
                                        </div>
                                        <div className="text-[10px] sm:text-xs text-slate-600 mt-0.5 sm:mt-1">mins</div>
                                    </div>
                                </div>
                                <div className="text-lg sm:text-2xl text-slate-400 font-bold">:</div>
                                <div className="text-center">
                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl px-2 sm:px-4 py-2 sm:py-3 min-w-[50px] sm:min-w-[70px] border border-blue-200">
                                        <div className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
                                            {timeRemaining.seconds.toString().padStart(2, '0')}
                                        </div>
                                        <div className="text-[10px] sm:text-xs text-slate-600 mt-0.5 sm:mt-1">secs</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}

                {/* Ticket Section */}
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                        Choose Your Experience
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Access Ticket */}
                        <div className="bg-white border border-slate-200 shadow-md rounded-2xl p-6 hover:border-slate-300 transition-all hover:shadow-lg">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h4 className="text-xl font-bold text-slate-900 mb-1">
                                        Basic
                                    </h4>
                                    <p className="text-sm text-slate-600">
                                        Join the live stream
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-slate-900">
                                        ${getTicketPrice("access")}
                                    </div>
                                    <div className="text-xs text-slate-500">
                                        {config.tickets.access.currency}
                                    </div>
                                </div>
                            </div>

                            <ul className="space-y-3 mb-6">
                                <li className="flex items-start gap-3">
                                    <svg
                                        className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    <span className="text-slate-700 text-sm">
                                        Live stream access
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg
                                        className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    <span className="text-slate-700 text-sm">
                                        Participate in chat
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg
                                        className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    <span className="text-slate-700 text-sm">
                                        HD quality streaming
                                    </span>
                                </li>

                            </ul>

                            <button
                                onClick={() => handleBuyTicket("access")}
                                className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-sm"
                            >
                                Buy Basic Ticket
                            </button>
                        </div>

                        {/* Premium Ticket */}
                        <div className="relative bg-gradient-to-br from-violet-50 to-purple-50 border-2 border-violet-300 shadow-lg rounded-2xl p-6 hover:border-violet-400 transition-all hover:shadow-xl">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md">
                                    MOST POPULAR
                                </div>
                            </div>

                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h4 className="text-xl font-bold text-slate-900 mb-1">
                                        Premium
                                    </h4>
                                    <p className="text-sm text-violet-700">
                                        Make your voice stand out
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-slate-900">
                                        ${getTicketPrice("premium")}
                                    </div>
                                    <div className="text-xs text-slate-600">
                                        {config.tickets.premium.currency}
                                    </div>
                                </div>
                            </div>

                            <ul className="space-y-3 mb-6">
                                <li className="flex items-start gap-3">
                                    <svg
                                        className="w-5 h-5 text-violet-600 mt-0.5 flex-shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    <span className="text-slate-700 text-sm">
                                        Everything in Basic
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg
                                        className="w-5 h-5 text-violet-600 mt-0.5 flex-shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    <span className="text-slate-900 text-sm font-semibold">
                                        Highlighted chat messages
                                    </span>
                                </li>
                            </ul>

                            <button
                                onClick={() => handleBuyTicket("premium")}
                                className="w-full py-3 px-6 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg"
                            >
                                Buy Premium Ticket
                            </button>
                        </div>
                    </div>
                </div>

                {/* Vybes Promo Banner */}
                <a
                    href="https://vybesapp.live"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 hover:border-blue-300 transition-all group shadow-sm hover:shadow-md"
                >
                    <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                fill="none"
                                className="h-6 w-6"
                            >
                                <defs>
                                    <linearGradient id="banner-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#ffffff" />
                                        <stop offset="100%" stopColor="#ffffff" />
                                    </linearGradient>
                                </defs>
                                <path
                                    d="M 6 16 Q 6 8, 16 6 Q 26 8, 26 16 Q 26 24, 16 26 Q 6 24, 6 16"
                                    stroke="url(#banner-gradient)"
                                    strokeWidth="2.5"
                                    fill="none"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M 10 16 Q 10 11, 16 10 Q 22 11, 22 16 Q 22 21, 16 22 Q 10 21, 10 16"
                                    stroke="url(#banner-gradient)"
                                    strokeWidth="2.5"
                                    fill="none"
                                    strokeLinecap="round"
                                />
                                <circle
                                    cx="16"
                                    cy="16"
                                    r="3"
                                    fill="url(#banner-gradient)"
                                />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-blue-700 font-semibold group-hover:text-blue-800 transition-colors">
                                    Create your own ticketed live stream
                                </h4>
                            </div>
                            <p className="text-xs text-slate-600 group-hover:text-slate-700 transition-colors">
                                Build your audience and monetize with vybes
                            </p>
                        </div>
                        <svg
                            className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </a>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 bg-white/80 backdrop-blur-md py-6 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-600 text-sm">
                    <p>&copy; 2026 Vybes Media Ltd. All rights reserved.</p>
                </div>
            </footer>

            {/* Purchase Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-purple-500/30 rounded-3xl p-8 max-w-md w-full shadow-2xl shadow-purple-500/20 animate-in zoom-in-95 duration-300">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="text-center mb-6">
                            <div className="relative inline-block mb-4">
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                                <div className="relative w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                                    <svg
                                        className="w-10 h-10 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                                Complete Your Purchase
                            </h3>
                            <p className="text-gray-400 text-sm">
                                Review your selection before checkout
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-5 mb-6 border border-purple-500/20">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm text-gray-400">Ticket Type</span>
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${selectedTicket === 'premium'
                                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                                    : 'bg-purple-500/20 text-purple-300'
                                    }`}>
                                    {selectedTicket === 'premium' ? 'Premium' : 'Basic'}
                                </span>
                            </div>

                            <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                                <span className="text-sm text-gray-400">Event</span>
                                <span className="text-white font-medium text-sm text-right max-w-[200px] truncate">
                                    {config.event.title}
                                </span>
                            </div>

                            <div className="flex items-baseline justify-between">
                                <span className="text-gray-400">Total</span>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-white">
                                        ${selectedTicket && getTicketPrice(selectedTicket)}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        {selectedTicket && config.tickets[selectedTicket].currency}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={handleConfirmPurchase}
                                className="w-full py-4 px-6 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    Continue to Payment
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="w-full py-3 px-6 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-semibold rounded-xl transition-all border border-white/10"
                            >
                                Go Back
                            </button>
                        </div>

                        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <span>Secure checkout powered by Stripe</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Help Modal - Bottom Sheet */}
            {showHelpModal && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
                    onClick={() => setShowHelpModal(false)}
                >
                    <div
                        className="absolute bottom-0 left-0 right-0 bg-slate-900 border-t border-purple-500/30 rounded-t-3xl max-h-[80vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="max-w-2xl mx-auto">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold text-white">
                                        How to Buy a Ticket
                                    </h3>
                                    <button
                                        onClick={() => setShowHelpModal(false)}
                                        className="text-gray-400 hover:text-white"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="space-y-6 pb-4">
                                    {/* Tip 1 */}
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                            1
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-white mb-2">
                                                Choose Your Ticket
                                            </h4>
                                            <p className="text-gray-300 text-sm leading-relaxed">
                                                Select between Basic (live stream only) or Premium (includes highlighted chat and exclusive features) based on your needs.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Tip 2 */}
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                            2
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-white mb-2">
                                                Complete Payment
                                            </h4>
                                            <p className="text-gray-300 text-sm leading-relaxed">
                                                After clicking the buy button, you&apos;ll be redirected to our secure payment processor. We accept all major credit cards and payment methods.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Tip 3 */}
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                            3
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-white mb-2">
                                                Access Your Event
                                            </h4>
                                            <p className="text-gray-300 text-sm leading-relaxed">
                                                After purchase, you&apos;ll receive a confirmation email with your ticket and stream access link. Save this link to join the live event!
                                            </p>
                                        </div>
                                    </div>

                                    {/* Tip 4 */}
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                            4
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-white mb-2">
                                                Join at Event Time
                                            </h4>
                                            <p className="text-gray-300 text-sm leading-relaxed">
                                                Make sure to join a few minutes early! The stream will be accessible during the scheduled event time.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Important Note */}
                                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 mt-6">
                                        <div className="flex gap-3">
                                            <svg className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <div>
                                                <h5 className="text-purple-300 font-semibold mb-1">
                                                    Important
                                                </h5>
                                                <p className="text-sm text-gray-300">
                                                    Tickets are non-refundable. Please double-check the event date and time before purchasing. Need help? Contact our support team at support@vybesapp.live
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setShowHelpModal(false)}
                                    className="w-full mt-6 py-3 px-6 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all"
                                >
                                    Got it!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
