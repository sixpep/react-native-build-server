const { getMessaging } = require("firebase-admin/messaging");

require("dotenv").config();

async function sendNotification(req, res) {
  // / This registration token comes from the client FCM SDKs.
  // const registrationToken =
  //   "fRX2AfY2RPiUq-oEfHg34p:APA91bGXqvqHpgB7Dm9-6s-jFWabIR9vTyFCHNFLXzrcEcIe5y_SgOJscxBieI0MiClIjg11Asdp9M3_r_1_lLQzapBwCbK8VeCwSPEdBAoa6AzIqQh-KiWu1sFkfnckJ9VTE0a7wGfz";
  const registrationToken = req.body.token;
  console.log("Received FCM Token : ", registrationToken);

  const message = {
    data: {
      score: "850",
      time: "2:45",
    },
    notification: {
      title: req.body.title || "Sixpep Technovations Pvt Ltd",
      body:
        req.body.matter ||
        "Gained 11.80 points to close at $835.67, up 1.43% on the day.",
    },
    token: registrationToken,
  };

  getMessaging()
    .send(message)
    .then((response) => {
      res.status(200).send({
        message: "Message sent successfully! ",
        messageId: response,
      });
      // Response is a message ID string.
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      res
        .status(500)
        .send({ message: "Error in sending message!", value: error });
      console.log("Error sending message:", error);
    });
}

module.exports = { sendNotification };
