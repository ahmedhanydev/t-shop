// const stripe = require("stripe")(
//   "sk_test_51LYDjAHNiYvvzMMZbcLK39VZbLap6ctDLgUw73c4DokZBJ1dmJCW0ydFKpjiUTRT3bGe7a5uSl4iLvrHVqICIkPB008tcA3ms5"
// );
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const asyncHandler = require("express-async-handler");
const Factory = require("./handlersFactory");
const cartModel = require("../models/cartModel");
const ApiError = require("../utils/apiError");
const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");
const UserModel = require("../models/userModel");

// @desc create cash order
// @route GET /api/v1/orders/cartId
// @access private
exports.createCashOrder = asyncHandler(async (req, res, next) => {
  const taxPrice = 0;
  const shippingPrice = 0;

  // get cart depend on cartId
  const cart = await cartModel.findById(req.params.cartId);
  if (!cart) {
    return next(
      new ApiError(`there no cart with id  ${req.params.cartId}`, 404)
    );
  }

  //
  const cartPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalCartPrice;

  const totalOrderPrice = cartPrice + taxPrice + shippingPrice;

  // create order
  const order = await orderModel.create({
    user: req.user._id,
    cartItems: cart.cartItems,
    shippingAddress: req.body.shippingAddress,
    totalOrderPrice,
  });
  if (order) {
    const bulkOption = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
      },
    }));
    await productModel.bulkWrite(bulkOption, {});

    // clear cart
    await cartModel.findByIdAndDelete(req.params.cartId);
  }
  res.status(201).json({ status: "success", data: order });
});

exports.filterOrderForLoggedUser = asyncHandler(async (req, res, next) => {
  if (req.user.role === "user") {
    req.filterObj = { user: req.user._id };
  }
  next();
});

// @desc get all orders
// @route GET /api/v1/orders
// @access private/user,admin,manager
exports.getAllOrders = Factory.getAll(orderModel);

// @desc get specific order
// @route GET /api/v1/orders/:id
// @access private/user
exports.getSpecificOrder = Factory.getOne(orderModel);

// @desc update order paid status to paid
// @route PUT /api/v1/orders/:id
// @access private/admin,manager
exports.updateOrderToPaid = asyncHandler(async (req, res, next) => {
  const order = await orderModel.findById(req.params.id);

  if (!order) {
    return next(new ApiError(`there is no order with id ${req.params.id}`));
  }

  order.isPaid = true;
  order.paidAt = Date.now();

  const updatedOrder = await order.save();

  res.status(201).json({ status: "success", data: updatedOrder });
});

// @desc update order deliver status to delivered
// @route PUT /api/v1/orders/:id
// @access private/admin,manager
exports.updateOrderToDelivered = asyncHandler(async (req, res, next) => {
  const order = await orderModel.findById(req.params.id);

  if (!order) {
    return next(new ApiError(`there is no order with id ${req.params.id}`));
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updatedOrder = await order.save();

  res.status(201).json({ status: "success", data: updatedOrder });
});

// @desc get checkout session from stripe and send it as response
// @route GET /api/v1/orders/checkout-session/cartId
// @access private/user
exports.checkoutSession = asyncHandler(async (req, res, next) => {
  const taxPrice = 0;
  const shippingPrice = 0;

  // get cart depend on cartId
  const cart = await cartModel.findById(req.params.cartId);
  if (!cart) {
    return next(
      new ApiError(`there no cart with id  ${req.params.cartId}`, 404)
    );
  }

  //
  const cartPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalCartPrice;

  const totalOrderPrice = cartPrice + taxPrice + shippingPrice;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],

    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: req.user.name,
          },
          unit_amount: totalOrderPrice * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    // success_url: `${req.protocol}://${req.get("host")}/user/allorders`,
    // cancel_url: `${req.protocol}://${req.get("host")}/cart`,
    success_url: `http://localhost:3000/user/allorders`,
    cancel_url: `http://localhost:3000/cart`,
    customer_email: req.user.email,
    client_reference_id: req.params.cartId,
    metadata: req.body.shippingAddress,
  });

  // 4) send session to response
  res.status(200).json({ status: "success", session });
});

const createCardOrder = async (session) => {
  const cartId = session.client_reference_id;
  const shippingAddress = session.metadata;
  const oderPrice = session.amount_total / 100;

  const cart = await cartModel.findById(cartId);
  const user = await UserModel.findOne({ email: session.customer_email });

  // Create order with default paymentMethodType card
  const order = await orderModel.create({
    user: user._id,
    cartItems: cart.cartItems,
    shippingAddress,
    totalOrderPrice: oderPrice,
    isPaid: true,
    paidAt: Date.now(),
    paymentMethodType: "card",
  });

  // After creating order, decrement product quantity, increment product sold
  if (order) {
    const bulkOption = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
      },
    }));
    await productModel.bulkWrite(bulkOption, {});

    // Clear cart depend on cartId
    await cartModel.findByIdAndDelete(cartId);
  }
};
// const webhookForTest = "whsec_KbPNKfeg2JxS8LsUl7ReTpGqbJlRn1pq";

// @desc this webhook run when stripe payment is paid
// @route POST webhook-checkout
// @access private/user
exports.webhookCheckout = asyncHandler(async (req, res, next) => {
  console.log(process.env.STRIPE_WEBHOOK_SECRET);
  const payload = req.body;
  const payloadString = JSON.stringify(payload, null, 2);
  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: process.env.STRIPE_WEBHOOK_SECRET,
  });

  if (process.env.STRIPE_WEBHOOK_SECRET) {
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        payloadString,
        header,
        process.env.STRIPE_WEBHOOK_SECRET
      );
      // data = event.data.oject;
      // eventType = event.type;
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    if (event.type === "checkout.session.completed") {
      console.log(event.type === "checkout.session.completed");
      //  Create order
      createCardOrder(event.data.object);
    }
  }
  res.status(200).json({ received: true });
});
