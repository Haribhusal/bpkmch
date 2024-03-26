module.exports = () => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: "bhusalhari89@gmail.com",
          pass: "rgbfzwepvmazzgjm",
        },
        // ... any custom nodemailer options
      },
      settings: {
        defaultFrom: "bhusalhari89@gmail.com",
        defaultReplyTo: "bhusalhari89@gmail.com",
      },
    },
  },
});
