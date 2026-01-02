// Event Configuration
// This configuration should be populated from your event creation app

export interface EventConfig {
    streamer: {
        name: string;
        photo: string;
        verified: boolean;
    };
    event: {
        title: string;
        description: string;
        date: string;
        time: string;
        isLive: boolean;
    };
    tickets: {
        access: {
            price: number;
            currency: string;
        };
        premium: {
            price: number;
            currency: string;
        };
    };
}

// Example configuration - Replace this with data from your event creation app
export const eventConfig: EventConfig = {
    streamer: {
        name: "Sarah Chen",
        photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop",
        verified: true,
    },
    event: {
        title: "Wealth Building Masterclass: From Zero to Financial Freedom",
        description: "Join renowned financial advisor Sarah Chen for an exclusive live masterclass on building wealth, smart investing strategies, and achieving financial independence. Learn proven methods to grow your money and secure your financial future.",
        date: "January 4, 2026",
        time: "7:00 PM EST",
        isLive: true,
    },
    tickets: {
        access: {
            price: 5,
            currency: "USD",
        },
        premium: {
            price: 15,
            currency: "USD",
        },
    },
};

// Function to fetch event configuration from your API
export async function fetchEventConfig(eventId: string): Promise<EventConfig> {
    // TODO: Replace with actual API call to your event creation app
    // const response = await fetch(`/api/events/${eventId}`);
    // return response.json();

    // For now, return the example configuration
    return eventConfig;
}
