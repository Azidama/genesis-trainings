export const registrationConfirmationEmail = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Registration Confirmation</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f6f9fc;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        padding: 30px;
        text-align: center;
      }
      .icon {
        font-size: 48px;
        color: #28a745;
        margin-bottom: 20px;
      }
      h1 {
        color: #003366;
        margin-bottom: 10px;
      }
      p {
        color: #555555;
        line-height: 1.6;
      }
      .info-box {
        background-color: #f0f7ff;
        border-radius: 6px;
        padding: 15px;
        margin: 20px 0;
        text-align: left;
      }
      .info-box h2 {
        font-size: 18px;
        margin-bottom: 10px;
        color: #003366;
      }
      .info-box ul {
        margin: 0;
        padding-left: 20px;
        color: #333333;
      }
      .contact {
        margin-top: 20px;
        font-size: 14px;
        color: #333333;
      }
      .contact a {
        color: #003366;
        text-decoration: none;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="icon">✅</div>
      <h1>Thank You for Registering!</h1>
      <p>
        We have received your application successfully. Our team will reach out
        to you shortly.
      </p>

      <div class="info-box">
        <h2>What's Next?</h2>
        <ul>
          <li>Our admission team will contact you within 24–48 hours</li>
          <li>
            Have your CNIC and educational documents ready for verification
          </li>
        </ul>
      </div>

      <div class="contact">
        For immediate assistance, contact us at:<br />
        <a href="mailto:support@genesisengr.com">support@genesisengr.com</a> |
        +92 313 7344 465
      </div>
    </div>
  </body>
</html>
`