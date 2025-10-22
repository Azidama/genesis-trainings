export const registrationConfirmationEmail = ({ name }) => `
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
      <h1>Thank You for Registering, ${name}!</h1>
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
export const resetPasswordEmail = ({ resetURL }) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Password Reset</title>
  </head>
  <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4; padding:20px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td style="background-color:#004875; padding:20px; text-align:center; color:#ffffff; font-size:20px; font-weight:bold;">
                Password Reset Request
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:30px; color:#333333; font-size:16px; line-height:1.6;">
                <p>Hello,</p>
                <p>You requested to reset your password. Click the button below to set a new password:</p>
                <p style="text-align:center; margin:30px 0;">
                  <a href="${resetURL}" target="_blank" style="background-color:#004875; color:#ffffff; text-decoration:none; padding:12px 24px; border-radius:5px; font-weight:bold;">
                    Reset Password
                  </a>
                </p>
                <p>If you didn’t request this, you can safely ignore this email. This link will expire in <strong>1 hour</strong>.</p>
                <p>Thanks,<br />The Support Team</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

export const registrationNotificationForStaff = ({ name, email }) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>New User Registration Notification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f6f8fa;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid #eaeaea;
      }
      .header {
        background-color: #004875;
        color: #ffffff;
        padding: 16px;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
      }
      .content {
        padding: 20px;
        color: #333333;
        font-size: 14px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 12px;
      }
      th, td {
        text-align: left;
        padding: 10px;
        border: 1px solid #dddddd;
        font-size: 14px;
      }
      th {
        background-color: #f2f2f2;
        width: 150px;
      }
      .footer {
        background-color: #f9f9f9;
        text-align: center;
        padding: 12px;
        font-size: 12px;
        color: #888888;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">📢 New User Registration</div>
      <div class="content">
        <p>Hello Team,</p>
        <p>A new user has just registered. Here are their details:</p>

        <table>
          <tr>
            <th>Name</th>
            <td>${name}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>${email}</td>
          </tr>
        </table>

        <p>You can check the admin dashboard for more details.</p>
      </div>
      <div class="footer">
        This is an automated message — please do not reply directly.
      </div>
    </div>
  </body>
</html>`

export const userSignupTemplate = ({ name }) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f9fafb;
        margin: 0;
        padding: 20px;
        color: #333;
      }
      .container {
        max-width: 500px;
        margin: 0 auto;
        background: #ffffff;
        padding: 20px;
        border-radius: 8px;
        border: 1px solid #e2e8f0;
        text-align: center;
      }
      h2 {
        color: #004875;
        margin-bottom: 12px;
      }
      p {
        font-size: 14px;
        line-height: 1.5;
        margin: 0 0 12px;
      }
      .footer {
        margin-top: 16px;
        font-size: 12px;
        color: #666;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Welcome, ${name}!</h2>
      <p>Your account was created successfully!</p>
      <p>You can now access and log in to Genesis Trainings.</p>
      <div class="footer">
        <p>© Genesis Trainings</p>
      </div>
    </div>
  </body>
</html>
`
export const accountCredentialsEmail = ({ name, email, password, frontendUrl }) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your Account Details</title>
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
        color: #003366;
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
      .credentials {
        background-color: #f0f7ff;
        border-radius: 6px;
        padding: 15px;
        margin: 20px 0;
        text-align: left;
        font-size: 15px;
      }
      .credentials strong {
        color: #003366;
      }
      .button {
        display: inline-block;
        background-color: #003366;
        color: #ffffff !important;
        text-decoration: none;
        padding: 12px 24px;
        border-radius: 6px;
        font-weight: bold;
        margin-top: 20px;
      }
      .contact {
        margin-top: 25px;
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
      <div class="icon">👋</div>
      <h1>Welcome Aboard, ${name}!</h1>
      <p>
        Your registration has been approved. You can now log in to your account
        using the credentials below:
      </p>

      <div class="credentials">
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Password:</strong> ${password}</p>
      </div>

      <p>Use these details to access your dashboard and get started.</p>
      <a href="${frontendUrl}" class="button" target="_blank">Go to Login</a>

      <div class="contact">
        Need help? Reach out at <a href="mailto:support@genesisengr.com">support@genesisengr.com</a><br />
        or call us at +92 313 7344 465
      </div>
    </div>
  </body>
</html>
`
