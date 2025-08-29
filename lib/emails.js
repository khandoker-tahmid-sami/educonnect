import EmailTemplate from "@/components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmails = async (emailInfo) => {
  if (!emailInfo) return null;

  const response = await Promise.allSettled(
    emailInfo.map((data) => {
      if (data.to && data.message && data.subject) {
        const { to, subject, message } = data;

        return resend.emails.send({
          from: "Acme <onboarding@resend.dev>", // <-- was "", must be valid
          to,
          subject,
          react: <EmailTemplate message={message} />, // <-- was EmailTemplate({ message })
        });
      } else {
        return Promise.reject(
          // <-- was missing return
          new Error(
            `Couldn't send email, please check the ${JSON.stringify(data)}.`
          )
        );
      }
    })
  );

  return response;
};
