const nodemailer = require('nodemailer');

// 設定郵件發送器
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

function sendPasswordResetEmail(to, resetLink) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: '密碼重設請求',
    text: `您請求了密碼重設，請點擊以下鏈接來重設您的密碼：\n\n${resetLink}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('郵件發送錯誤：', error);
    } else {
      console.log('郵件發送成功：', info.response);
    }
  });
}

module.exports = { sendPasswordResetEmail };
