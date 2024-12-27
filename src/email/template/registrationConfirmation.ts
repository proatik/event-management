export type ConfirmationEmail = {
  date: string;
  event: string;
  attendee: string;
};

export const prepareConfirmationEmail = ({
  date,
  event,
  attendee
}: ConfirmationEmail): string => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Registration Confirmation</title>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      background-color: #f7f8fa;
      font-family: Arial, sans-serif;
    "
  >
    <table
      align="center"
      cellspacing="0"
      cellpadding="0"
      style="
        margin: 0;
        padding: 0;
        width: 100%;
        border-spacing: 0;
        background-color: #f7f8fa;
      "
    >
      <tr>
        <td align="center" style="padding: 10px 0">
          <table
            cellspacing="0"
            cellpadding="0"
            style="
              overflow: hidden;
              border-spacing: 0;
              max-width: 600px;
              width: calc(100% - 20px);
              background-color: #ffffff;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            "
          >
            <!-- Header -->
            <tr>
              <td
                align="center"
                style="
                  padding: 20px;
                  color: #dfecf2;
                  font-size: 24px;
                  font-weight: 700;
                  background-color: #3b577b;
                "
              >
                <span> ✅ </span>
                <span> Registration Confirmation </span>
                <span> ✅ </span>
              </td>
            </tr>
            <!-- Body -->
            <tr style="">
              <td style="padding: 20px; text-align: center;">
                <p style="font-size: 20px; line-height: 1.5; margin: 10px">
                  <span style="font-weight: 400; color: #e5674a">Hi</span>
                  <span style="font-weight: 600; color: #3b577b"
                    >${attendee}</span
                  >
                  <span style="font-weight: 600; color: #e5674a">👋</span>
                </p>
                <p
                  style="
                    color: #555555;
                    font-size: 16px;
                    line-height: 1.5;
                    margin: 0 0 20px;
                  "
                >
                  Thank you for registering for
                  <span style="font-weight: bold; color: tomato"> ${event}</span
                  >. <br />
                  We’re excited to have you join us on
                  <span style="font-weight: bold; color: tomato"> ${date} </span
                  >.
                </p>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td
                align="center"
                style="
                  padding: 15px;
                  color: #777777;
                  font-size: 14px;
                  background-color: #f7f8fa;
                "
              >
                <p style="margin: 0">
                  &copy; ${new Date().getFullYear()} Event Management. All
                  rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
};

export default prepareConfirmationEmail;
