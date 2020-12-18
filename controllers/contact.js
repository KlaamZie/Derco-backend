async function contactMail(name, mail, phone, type, message) {
    const nodemailer = require('nodemailer');
    const Email = require('email-templates');
    const path = require('path');

    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    const email = new Email({
        transport: transporter,
        send: true,
        preview: false,
    })

    await email.send({
        template: path.join(__dirname, '..', 'mails', 'contact'),
        message: {
            from: `"${name}" <${mail}>`,
            to: process.env.MAIL_USER,
        },
        locals: {
            name,
            mail,
            phone,
            type,
            message
        },
    })
}

async function contact(req, res) {
    const {name, mail, phone, type, message} = req.body;
    await contactMail(name, mail, phone, type, message);
    return res.status(200).json({
        text: "Mail envoyé"
    });
}

exports.contact = contact;