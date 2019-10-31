import { processPayment } from "./apiCore.js";
import { addUserWallet } from "../admin/apiAdmin";

export const razorPayOptions = (amount, user, isWallet) => {
  const { name, email } = user;
  return {
    key: "rzp_test_xHFa7oLm0s4xHO",
    amount: amount ? amount * 100 : 50000, // 50000 refers to 50000 paise or INR 500.
    currency: "INR",
    name: "E-comm",
    description: "An e-commerce for developers",
    image:
      "https://img.etimg.com/thumb/height-450,width-800,msid-63110702,imgsize-12508/razorpay.jpg",
    // order_id: 'order_9A33XWu170gUtm',
    handler: function(response) {
      processPayment(user._id, user.token, {
        razorpay_payment_id: response.razorpay_payment_id,
        amount: amount
      }).then(function(paymentResponse) {
        console.log(paymentResponse);

        if (paymentResponse.success) {
          // Just to add money to user wallet once the payment is confirmed
          if (isWallet) {
            let formData = {
              wallet: {
                amount: amount,
                details: {
                  description: "Added Money to wallet",
                  amount: amount,
                  type: "Credit"
                }
              },
              token: user.token,
              userId: user._id
            };

            addUserWallet(formData)
              .then(userReponse => console.log(userReponse))
              .catch(error => console.log(error));
          }
        }
      });
    },
    prefill: {
      name: name || "name",
      email: email || "example@example.com",
      contact: ""
    },
    notes: {
      address: "Address"
    },
    theme: {
      color: "#F37254"
    }
  };
};
