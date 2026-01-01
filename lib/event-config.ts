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
        name: "DJ Nova",
        photo: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
        verified: true,
    },
    event: {
        title: "Late Night Vibes: Electronic Music Session",
        description: "Join me for an incredible live electronic music performance featuring new tracks and exclusive remixes. This is a one-time live event - don't miss it!",
        date: "January 15, 2026",
        time: "8:00 PM EST",
        isLive: true,
    },
    tickets: {
        access: {
            price: 9,
            currency: "USD",
        },
        premium: {
            price: 19,
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
