const subscriptionService = require('../services/subscriptionService');

const subscribeUser = async (req, res) => {
  console.log(req.body)
  const { userId, userName, userEmail, userPhone, packageName, packagePrice, stripeToken, packageId } = req.body;
  try {
    const result = await subscriptionService.processSubscription({
      userId,
      userName,
      userEmail,
      userPhone,
      packageId,
      packageName,
      packagePrice,
      stripeToken,
    });

    return res.json(result);
  } catch (error) {
    console.error('Error in subscription controller:', error);
    return res.status(500).json({ success: false, message: 'Payment failed. Please try again.' });
  }
};

module.exports = {
  subscribeUser,
};
