import { NextResponse } from "next/server";

export async function POST() {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;
  const storeId = process.env.LEMONSQUEEZY_STORE_ID;
  const productId = process.env.LEMONSQUEEZY_PRODUCT_ID;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (!apiKey || !storeId || !productId) {
    return NextResponse.json({ error: "Missing configuration" }, { status: 500 });
  }

  // Step 1: Get the variant ID for the product
  const variantsRes = await fetch(
    `https://api.lemonsqueezy.com/v1/variants?filter[product_id]=${productId}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/vnd.api+json",
      },
    }
  );

  if (!variantsRes.ok) {
    return NextResponse.json({ error: "Failed to fetch variants" }, { status: 500 });
  }

  const variantsData = await variantsRes.json();
  const variantId = variantsData.data?.[0]?.id;

  if (!variantId) {
    return NextResponse.json({ error: "No variant found" }, { status: 500 });
  }

  // Step 2: Create a checkout
  const checkoutRes = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
    },
    body: JSON.stringify({
      data: {
        type: "checkouts",
        attributes: {
          checkout_options: {
            embed: true,
            media: false,
            logo: true,
          },
          product_options: {
            redirect_url: `${appUrl}/builder?paid=true`,
            receipt_button_text: "Download Resume",
            receipt_thank_you_note: "Thank you! Your resume PDF is downloading now.",
          },
        },
        relationships: {
          store: {
            data: { type: "stores", id: storeId },
          },
          variant: {
            data: { type: "variants", id: variantId },
          },
        },
      },
    }),
  });

  if (!checkoutRes.ok) {
    const err = await checkoutRes.text();
    return NextResponse.json({ error: "Failed to create checkout", details: err }, { status: 500 });
  }

  const checkoutData = await checkoutRes.json();
  const checkoutUrl = checkoutData.data?.attributes?.url;

  return NextResponse.json({ url: checkoutUrl });
}
