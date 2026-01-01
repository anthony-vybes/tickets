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
    }, []);

    const handleBuyTicket = (tier: TicketTier) => {
        setSelectedTicket(tier);
        setShowModal(true);
    };

    const handleConfirmPurchase = () => {
        // In production, redirect to external payment processor
        // window.location.href = `/checkout?ticket=${selectedTicket}&eventId=${eventId}`;
        alert(
            `Redirecting to payment for ${selectedTicket?.toUpperCase()} ticket...`
        );
        setShowModal(false);
    };

    const getTicketPrice = (tier: TicketTier) => {
        return config.tickets[tier].price;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-black/30 backdrop-blur-md border-b border-purple-500/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                fill="none"
                                className="h-8 w-8 flex-shrink-0"
                            >
                                <defs>
                                    <linearGradient id="vybes-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#a855f7" />
                                        <stop offset="50%" stopColor="#ec4899" />
                                        <stop offset="100%" stopColor="#ef4444" />
                                    </linearGradient>
                                </defs>
                                <path
                                    d="M 6 16 Q 6 8, 16 6 Q 26 8, 26 16 Q 26 24, 16 26 Q 6 24, 6 16"
                                    stroke="url(#vybes-gradient)"
                                    strokeWidth="2.5"
                                    fill="none"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M 10 16 Q 10 11, 16 10 Q 22 11, 22 16 Q 22 21, 16 22 Q 10 21, 10 16"
                                    stroke="url(#vybes-gradient)"
                                    strokeWidth="2.5"
                                    fill="none"
                                    strokeLinecap="round"
                                />
                                <circle
                                    cx="16"
                                    cy="16"
                                    r="3"
                                    fill="url(#vybes-gradient)"
                                />
                            </svg>
                            <span className="text-2xl font-bold tracking-tight leading-none text-white">
                                vybes
                            </span>
                        </div>
                        <button
                            onClick={() => setShowHelpModal(true)}
                            className="p-2 rounded-full hover:bg-white/10 transition-colors"
                            aria-label="Help"
                        >
                            <svg
                                className="w-6 h-6 text-purple-300 hover:text-purple-200"
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
                {/* Live Badge */}
                {config.event.isLive && (
                    <div className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-full backdrop-blur-sm">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                            <span className="text-red-100 font-semibold text-sm tracking-wide">
                                LIVE EVENT
                            </span>
                        </div>
                    </div>
                )}

                {/* Streamer Profile */}
                <div className="flex flex-col items-center mb-8">
                    <div className="relative mb-4">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 blur-xl opacity-50"></div>
                        <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-4 ring-purple-500/50">
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
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                        {config.streamer.name}
                    </h2>
                    {config.streamer.verified && (
                        <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/20 rounded-full border border-purple-500/30">
                            <svg
                                className="w-4 h-4 text-purple-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 0l2.5 7.5L20 8.5l-6 5.5L15.5 22 10 17.5 4.5 22 6 14 0 8.5l7.5-1L10 0z" />
                            </svg>
                            <span className="text-sm text-purple-300 font-medium">
                                Verified
                            </span>
                        </div>
                    )}
                </div>

                {/* Event Details */}
                <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-purple-500/20 p-6 mb-8">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                        {config.event.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center gap-2 text-purple-300">
                            <svg
                                className="w-5 h-5"
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
                            <span className="text-sm sm:text-base">
                                {config.event.time}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-purple-300">
                            <svg
                                className="w-5 h-5"
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
                            <span className="text-sm sm:text-base">
                                {config.event.date}
                            </span>
                        </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                        {config.event.description}
                    </p>
                </div>

                {/* Ticket Section */}
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">
                        Choose Your Experience
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Access Ticket */}
                        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-purple-500/20 p-6 hover:border-purple-500/40 transition-all">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h4 className="text-xl font-bold text-white mb-1">
                                        Access Ticket
                                    </h4>
                                    <p className="text-sm text-gray-400">
                                        Join the live stream
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-white">
                                        ${getTicketPrice("access")}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        {config.tickets.access.currency}
                                    </div>
                                </div>
                            </div>

                            <ul className="space-y-3 mb-6">
                                <li className="flex items-start gap-3">
                                    <svg
                                        className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0"
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
                                    <span className="text-gray-300 text-sm">
                                        Live stream access
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg
                                        className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0"
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
                                    <span className="text-gray-300 text-sm">
                                        Participate in chat
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg
                                        className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0"
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
                                    <span className="text-gray-300 text-sm">
                                        HD quality streaming
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg
                                        className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                    <span className="text-gray-500 text-sm">
                                        No replay access
                                    </span>
                                </li>
                            </ul>

                            <button
                                onClick={() => handleBuyTicket("access")}
                                className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors"
                            >
                                Buy Access Ticket
                            </button>
                        </div>

                        {/* Premium Ticket */}
                        <div className="relative bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-md rounded-2xl border-2 border-purple-500 p-6 hover:border-purple-400 transition-all">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                                    MOST POPULAR
                                </div>
                            </div>

                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h4 className="text-xl font-bold text-white mb-1">
                                        Premium Ticket
                                    </h4>
                                    <p className="text-sm text-purple-300">
                                        Get the full experience
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-white">
                                        ${getTicketPrice("premium")}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        {config.tickets.premium.currency}
                                    </div>
                                </div>
                            </div>

                            <ul className="space-y-3 mb-6">
                                <li className="flex items-start gap-3">
                                    <svg
                                        className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0"
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
                                    <span className="text-gray-300 text-sm">
                                        Everything in Access
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg
                                        className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0"
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
                                    <span className="text-white text-sm font-semibold">
                                        Highlighted chat messages
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg
                                        className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0"
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
                                    <span className="text-white text-sm font-semibold">
                                        48-hour replay access
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg
                                        className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0"
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
                                    <span className="text-gray-300 text-sm">
                                        Priority support
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg
                                        className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0"
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
                                    <span className="text-gray-300 text-sm">
                                        Exclusive badges
                                    </span>
                                </li>
                            </ul>

                            <button
                                onClick={() => handleBuyTicket("premium")}
                                className="w-full py-3 px-6 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-purple-500/50"
                            >
                                Buy Premium Ticket
                            </button>
                        </div>
                    </div>
                </div>

                {/* Info Banner */}
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 backdrop-blur-sm">
                    <div className="flex gap-3">
                        <svg
                            className="w-6 h-6 text-blue-400 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <div>
                            <h4 className="text-blue-300 font-semibold mb-1">
                                Live-Only Access
                            </h4>
                            <p className="text-sm text-gray-300">
                                This is a live-only event. Access tickets do not
                                include replay. Premium tickets include 48-hour
                                replay access after the stream ends.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-purple-500/20 bg-black/30 backdrop-blur-md py-6 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
                    <p>&copy; 2026 Vybes. All rights reserved.</p>
                </div>
            </footer>

            {/* Purchase Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-slate-900 border border-purple-500/30 rounded-2xl p-6 max-w-md w-full">
                        <button
                            onClick={() => setShowModal(false)}
                            className="float-right text-gray-400 hover:text-white text-2xl leading-none"
                        >
                            &times;
                        </button>
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    className="w-8 h-8 text-purple-400"
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
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">
                                Confirm Purchase
                            </h3>
                            <p className="text-gray-400">
                                You&apos;re about to purchase a ticket for this event
                            </p>
                        </div>

                        <div className="bg-white/5 rounded-xl p-4 mb-6 space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-400">
                                    Ticket Type:
                                </span>
                                <span className="text-white font-semibold capitalize">
                                    {selectedTicket}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Price:</span>
                                <span className="text-white font-semibold">
                                    $
                                    {selectedTicket &&
                                        getTicketPrice(selectedTicket)}
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 py-3 px-6 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmPurchase}
                                className="flex-1 py-3 px-6 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all"
                            >
                                Continue to Payment
                            </button>
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
                        className="absolute bottom-0 left-0 right-0 bg-slate-900 border-t border-purple-500/30 rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
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

                            <div className="space-y-6">
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
                                            Select between Access (live stream only) or Premium (includes replay and highlighted chat) based on your needs. Premium gives you 48 hours to watch the replay after the event ends.
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
                                            Make sure to join a few minutes early! The stream will be accessible only during the scheduled time for Access tickets, or for 48 hours after for Premium tickets.
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
                                                Tickets are non-refundable. Please double-check the event date and time before purchasing. Need help? Contact our support team at support@vybes.com
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
            )}
        </div>
    );
}
