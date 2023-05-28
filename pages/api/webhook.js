import { mongooseConnect } from "@/lib/mongoose";
const stripe = require("stripe")(process.env.STRIPE_SK);
import { buffer } from "micro";
import { Order } from "@/models/Order";

const endpointSecret =
  "whsec_00936f2d442a3f71bd336f8ddbb1e56fc147d1fdc266e2a7cb04e2bd720393c2";
// whsec_00936f2d442a3f71bd336f8ddbb1e56fc147d1fdc266e2a7cb04e2bd720393c2

export default async function handler(req, res) {
  await mongooseConnect();
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case "checkout.session.completed":
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === "paid";
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, { paid: true });
      }
      console.log(data);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  res.status(200).send("ok");
}
export const config = {
  api: { bodyParser: false },
};
//acct_1NCLPRDc4DiBAtjL
//fun-cherub-cajole-gained
