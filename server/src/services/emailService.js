const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendVerificationOtp(email, otp) {
  const { data, error } = await resend.emails.send({
    from: "AI Resume Builder <onboarding@resend.dev>",
    to: email,
    subject: "Verify your email address",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto;">
        <h2>AI Resume Builder</h2>

        <p>Welcome! Use the verification code below to verify your email address:</p>

        <div style="
          font-size: 32px;
          font-weight: bold;
          letter-spacing: 8px;
          margin: 24px 0;
        ">
          ${otp}
        </div>

        <p>This code expires in <strong>10 minutes</strong>.</p>

        <p>If you did not create this account, you can ignore this email.</p>
      </div>
    `,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

module.exports = {
  sendVerificationOtp,
};