# Vybes Ticketing App

A mobile-friendly Next.js web app for selling tickets to live-streamed events on the Vybes platform.

## Features

- 🎭 **Streamer Profile Display**: Shows streamer name, photo, and verified badge
- 🎫 **Two Ticket Tiers**:
  - **Access Ticket**: Basic live stream access with chat
  - **Premium Ticket**: Enhanced experience with highlighted chat messages and 48-hour replay access
- 📱 **Mobile-Friendly**: Fully responsive design optimized for mobile devices
- ⚡ **Live Event Badge**: Animated indicator for live events
- 🎨 **Modern UI**: Beautiful gradient design with backdrop blur effects
- 🔧 **Configurable**: Easy event configuration system

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Configuration

### Event Configuration

Edit the configuration in `lib/event-config.ts`:

```typescript
export const eventConfig: EventConfig = {
    streamer: {
        name: "DJ Nova",
        photo: "https://example.com/photo.jpg",
        verified: true,
    },
    event: {
        title: "Late Night Vibes: Electronic Music Session",
        description: "Join me for an incredible live electronic music performance...",
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
```

### Integration with Event Creation App

To dynamically load event data from your event creation app:

1. Implement the `fetchEventConfig` function in `lib/event-config.ts`:

```typescript
export async function fetchEventConfig(eventId: string): Promise<EventConfig> {
    const response = await fetch(`https://your-api.com/events/${eventId}`);
    return response.json();
}
```

2. Uncomment the useEffect code in `app/page.tsx`:

```typescript
useEffect(() => {
    const loadConfig = async () => {
        const eventId = new URLSearchParams(window.location.search).get('eventId');
        if (eventId) {
            const data = await fetchEventConfig(eventId);
            setConfig(data);
        }
    };
    loadConfig();
}, []);
```

3. Access the page with: `http://localhost:3000/?eventId=YOUR_EVENT_ID`

## Ticket Tiers

### Access Ticket ($9)
- ✅ Live stream access
- ✅ Participate in chat
- ✅ HD quality streaming
- ❌ No replay access

### Premium Ticket ($19)
- ✅ Everything in Access
- ✅ **Highlighted chat messages** - Stand out in the chat
- ✅ **48-hour replay access** - Watch the stream again
- ✅ Priority support
- ✅ Exclusive badges

## Payment Integration

The app is designed to redirect to an external payment processor. To integrate:

1. Update the `handleConfirmPurchase` function in `app/page.tsx`:

```typescript
const handleConfirmPurchase = () => {
    // Redirect to your payment processor
    window.location.href = `/api/checkout?ticket=${selectedTicket}&eventId=${eventId}`;
};
```

2. Create a payment API route or redirect to services like:
   - Stripe
   - PayPal
   - Square
   - Your custom payment solution

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Other Platforms

Build the production bundle:

```bash
npm run build
```

Deploy the `.next` folder to your hosting platform.

## Project Structure

```
vybes/tickets/
├── app/
│   ├── page.tsx          # Main ticketing page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── lib/
│   └── event-config.ts   # Event configuration
├── public/               # Static assets
└── package.json          # Dependencies
```

## Customization

### Colors

The app uses a purple/pink gradient theme. To customize, update the Tailwind classes in `app/page.tsx`:

- Primary gradient: `from-pink-500 to-purple-500`
- Background: `from-slate-950 via-purple-950 to-slate-950`
- Borders: `border-purple-500/20`

### Typography

The app uses system fonts for optimal performance. To use custom fonts, update `app/layout.tsx`.

## Mobile Optimization

The app is fully responsive with:
- Mobile-first design approach
- Touch-friendly buttons (min 44px height)
- Optimized images with Next.js Image component
- Responsive grid layouts
- Sticky header for easy navigation

## Browser Support

- Chrome/Edge (latest)
- Safari (latest)
- Firefox (latest)
- iOS Safari (latest)
- Chrome Mobile (latest)

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Image Optimization**: Next.js Image component

## Future Enhancements

- [ ] User authentication
- [ ] Real-time ticket availability
- [ ] Countdown timer to event start
- [ ] Email notifications
- [ ] Social media sharing
- [ ] Multiple currency support
- [ ] Discount codes

## License

Copyright © 2026 Vybes. All rights reserved.

## Support

For questions or support, contact: support@vybes.com
