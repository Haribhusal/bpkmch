// ./api/user/controllers/custom-register.js
"use strict";

const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async register(ctx) {
    const { email, username, password } = ctx.request.body;

    // Generate a unique verification token
    const verificationToken =
      strapi.plugins[
        "users-permissions"
      ].services.user.generateVerificationToken();

    // Create the user with the verification token
    let user;
    try {
      user = await strapi.plugins["users-permissions"].services.user.add({
        email,
        username,
        password,
        confirmed: false, // User is not confirmed initially
        blocked: false,
        provider: "local",
        registrationToken: verificationToken,
      });
    } catch (error) {
      return ctx.badRequest(null, error.message);
    }

    // Send the verification email
    const emailData = {
      to: email,
      subject: "Email Verification",
      text: `Click the following link to verify your email: ${process.env.CLIENT_URL}/verify-email/${verificationToken}`,
      html: `<p>Click the following link to verify your email:</p><a href="${process.env.CLIENT_URL}/verify-email/${verificationToken}">${process.env.CLIENT_URL}/verify-email/${verificationToken}</a>`,
    };

    try {
      await strapi.plugins["email"].services.email.send(emailData);
    } catch (error) {
      return ctx.badRequest(null, "Failed to send verification email.");
    }

    return {
      user: sanitizeEntity(user, { model: strapi.models.user }),
    };
  },
};
