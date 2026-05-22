import type { ViolationType } from "@modules/violations/schema/violations.schema";

export type ViolationNoticeTemplateData = {
  driverName: string;
  plateNumber: string;
  violationType: ViolationType;
  violationTypeLabel: string;
  violationAt: Date;
};

const formatViolationDate = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);

export const buildViolationNoticeEmail = (data: ViolationNoticeTemplateData) => {
  const subject = `Traffic Violation Notice — Plate ${data.plateNumber}`;
  const formattedDate = formatViolationDate(data.violationAt);

  const text = [
    `Dear ${data.driverName},`,
    "",
    "This is an official notice regarding a traffic violation recorded in our system.",
    "",
    `Plate number: ${data.plateNumber}`,
    `Violation type: ${data.violationTypeLabel}`,
    `Date and time: ${formattedDate}`,
    "",
    "Please review this notice and take appropriate action. Repeated violations may result in further enforcement.",
    "",
    "If you believe this notice was sent in error, contact the traffic operations office.",
    "",
    "Traffic Violation Management",
  ].join("\n");

  const html = `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;color:#18181b;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e4e4e7;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="padding:24px 28px;background:#18181b;color:#ffffff;">
                <p style="margin:0;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;opacity:0.7;">Traffic Operations</p>
                <h1 style="margin:8px 0 0;font-size:22px;font-weight:600;">Violation Notice</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Dear <strong>${data.driverName}</strong>,</p>
                <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#52525b;">
                  A traffic violation linked to your vehicle has been recorded. Please review the details below.
                </p>
                <table width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;border:1px solid #e4e4e7;border-radius:8px;">
                  <tr>
                    <td style="padding:16px 18px;font-size:14px;line-height:1.8;">
                      <strong>Plate number:</strong> ${data.plateNumber}<br />
                      <strong>Violation type:</strong> ${data.violationTypeLabel}<br />
                      <strong>Date &amp; time:</strong> ${formattedDate}
                    </td>
                  </tr>
                </table>
                <p style="margin:20px 0 0;font-size:14px;line-height:1.6;color:#52525b;">
                  Please take appropriate action. If you believe this notice was sent in error, contact the traffic operations office.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 28px;border-top:1px solid #e4e4e7;font-size:12px;color:#71717a;">
                Traffic Violation Management — Automated Operations Notice
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`.trim();

  return { subject, text, html };
};
