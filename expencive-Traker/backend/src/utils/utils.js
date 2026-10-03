function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function getOTPHtml(otp) {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f7fa; color: #333;">
      <div style="max-width: 500px; margin: auto; padding: 25px; background-color: #ffffff; border-radius: 10px;">

        <h2 style="color: #2563eb;">Daily Expense Tracker</h2>

        <p>Hello,</p>

        <p>Thank you for visiting our website and using Daily Expense Tracker.</p>

        <p>Your OTP for verification is:</p>

        <h1 style="letter-spacing: 8px; text-align: center; color: #2563eb; background-color: #eff6ff; padding: 15px; border-radius: 8px;">
          ${otp}
        </h1>

        <p>This OTP is valid for 10 minutes.</p>

        <p>If you did not request this OTP, please ignore this email.</p>

        <p>Thank you for choosing us!</p>

        <p>
          Best regards,<br>
          <strong>Bikram Pal</strong>
        </p>

      </div>
    </div>
  `;
}

module.exports = {
  generateOTP,
  getOTPHtml,
};