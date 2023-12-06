
import { Resend } from 'resend'
import { EmailTemplate } from '@/components/EmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY)

const sendEmail = async (req, res) => {
    const { email, message } = req.body

    try {
        const data = await resend.emails.send({
            from: "Pranay Aryal <hi@pranaysite.com>",
            to: [email],
            subject: 'Thank you for reaching out to Pranay',
            react: EmailTemplate({ email: email, message: message }),

        })
        console.log("Data from email response: ", data)
        res.status(200).json(data)

    } catch (error) {
        res.status(400).json(error)
    }
}

export default sendEmail;
