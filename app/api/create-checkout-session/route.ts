import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-12-15.clover',
});

export async function POST(request: NextRequest) {
    try {
        const { ticketType, eventTitle } = await request.json();

        // Define ticket prices and names
        const tickets = {
            access: {
                price: 500, // $5.00 in cents
                name: 'Basic Ticket',
                stripeId: 'basic_ticket',
            },
            premium: {
                price: 1500, // $15.00 in cents
                name: 'Premium Ticket',
                stripeId: 'premium_ticket',
            },
        };

        const ticket = tickets[ticketType as keyof typeof tickets];

        if (!ticket) {
            return NextResponse.json(
                { error: 'Invalid ticket type' },
                { status: 400 }
            );
        }

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `${ticket.name} - ${eventTitle}`,
                            description: ticketType === 'premium'
                                ? 'Includes highlighted chat messages and all basic features'
                                : 'Live stream access and chat participation',
                        },
                        unit_amount: ticket.price,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${request.headers.get('origin')}`,
            metadata: {
                ticketType,
                eventTitle,
            },
        });

        return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        return NextResponse.json(
            { error: 'Error creating checkout session' },
            { status: 500 }
        );
    }
}
