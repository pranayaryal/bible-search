
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)

const sendEmail = async (req, res) => {
    const { email, message } = req.body

    try {
        const data = await resend.emails.send({
            from: "drpranayaryal@gmail.com",
            to: [email],
            subject: 'Thank you for reaching out to Manu',
            react: '<p>You are too good</p>'

        })
        console.log("Data from email response: ", data)
        res.status(200).json(data)

    } catch (error) {
        res.status(400).json(error)
    }
}