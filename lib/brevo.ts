import { BrevoClient } from "@getbrevo/brevo";

function brevo() {
  return new BrevoClient({ apiKey: process.env.BREVO_API_KEY || "" });
}

export async function sendBrevoTransactionalEmail(
  payload: { key: string; value: unknown }[],
) {
  if (!process.env.BREVO_API_KEY) {
    throw new Error("Brevo is not configured.");
  }

  await brevo().transactionalEmails.sendTransacEmail({
    sender: {
      name: "Diaspora Insurance Questionnaire",
      email: "productmanager@theblackspotgroup.com",
    },
    to: [{ email: "info@theblackspotgroup.com" }],
    subject: "Customer Feedback from Questionnaire",
    htmlContent: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Questionnaire Submission</title>
        <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; color: #333333; }
            .container { max-width: 600px; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin: 0 auto; }
            h2 { color: #2c3e50; border-bottom: 2px solid #ecf0f1; padding-bottom: 10px; margin-top: 0; }
            h3 { color: #34495e; margin-top: 25px; margin-bottom: 10px; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px; }
            .meta-table, .response-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .meta-table td { padding: 6px 0; }
            .meta-table td.label { font-weight: bold; width: 150px; color: #7f8c8d; }
            .response-table th, .response-table td { border: 1px solid #dddddd; text-align: left; padding: 12px; }
            .response-table th { background-color: #f8f9fa; color: #2c3e50; width: 40%; }
            .footer { font-size: 12px; color: #95a5a6; text-align: center; margin-top: 30px; border-top: 1px solid #ecf0f1; padding-top: 15px; }
            .btn { display: inline-block; background-color: #3498db; color: #ffffff !important; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 15px; }
        </style>
    </head>
    <body>

        <div class="container">
            <h2>New Customer Questionnaire Submission</h2>
            <p>A new response has been recorded from the customer questionnaire.</p>

            <h3>Questionnaire Responses</h3>
            <table class="response-table">
                <tbody>
                    ${payload?.map(
                      (response, index) =>
                        `
                      <tr>
                          <td><strong>Question ${index + 1}</strong></td>
                          <td>${response.value} (${response.key})</td>
                      </tr>`,
                    )}
                </tbody>
            </table>

            <div class="footer">
                <p>This is an automated system notification from your website.</p>
            </div>
        </div>

    </body>
    </html>`,
  });

  return { success: true };
}
