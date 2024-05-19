const nodemailer = require('nodemailer');

module.exports = class Email {
    constructor(user, url, token) {
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url;
        this.from = `Aksil Cherikh <library-app>`;
        this.resetToken = token;
    }

    newTransport() {
        if (process.env.NODE_ENV === 'production') {
            return nodemailer.createTransport({
                service: 'SendGrid',
                auth: {
                    user: process.env.SENDGRID_USERNAME,
                    pass: process.env.SENDGRID_PASSWORD,
                },
            });
        }

        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    // Send the actual email
    async send(subject) {
        // 1) Define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            text: `Reset your password here : http://localhost:${process.env.IT_PORT}/reset-password/${this.resetToken}`,
        };

        // 3) Create a transport and send email
        await this.newTransport().sendMail(mailOptions);
    }

    async sendWelcome() {
        await this.send('Welcome to the library-app !');
    }

    async sendPasswordReset() {
        await this.send(
            `Your password reset token (Valid for 10 minutes)`
        );
    }
};
