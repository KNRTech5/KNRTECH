import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

export async function POST(req: Request) {
  try {
    const { price } = await req.json();

    if (!price || typeof price !== "number" || price <= 0) {
      return Response.json(
        { error: "Invalid price" },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: "Pricing Plan" },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/pricing`,
    });

    if (!session.url) {
      return Response.json(
        { error: "Failed to create checkout session" },
        { status: 500 }
      );
    }

    return Response.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    return Response.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}