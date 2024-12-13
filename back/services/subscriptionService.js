const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const subscriptionModel = require('../models/subscriptionModel');

const processSubscription = async ({ userId, userName, packageName, packageId, packagePrice, stripeToken }) => {
  try {
    // Create a charge with Stripe
    const charge = await stripe.charges.create({
      amount: packagePrice * 100, // Convert to smallest currency unit (e.g., pence)
      currency: 'gbp', // Currency code
      source: stripeToken,
      description: `Subscription for ${userName} - ${packageName}`,
    });

    // Save subscription details to the database
    await subscriptionModel.createSubscription(userId, packageName, packageId, packagePrice, charge.id);

    return { success: true, message: 'Subscription successful!' };
  } catch (error) {
    console.error('Error processing payment in service:', error);
    throw new Error('Payment processing failed');
  }
};

module.exports = {
  processSubscription,
};
