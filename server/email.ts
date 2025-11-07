import sgMail from '@sendgrid/mail';

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function getCredentials() {
  const apiKey = process.env.SENDGRID_API_KEY;
  const email = process.env.SENDGRID_FROM_EMAIL;

  if (!apiKey || !email) {
    throw new Error('SendGrid configuration missing: SENDGRID_API_KEY and SENDGRID_FROM_EMAIL must be set');
  }

  return { apiKey, email };
}

async function getUncachableSendGridClient() {
  const { apiKey, email } = await getCredentials();
  sgMail.setApiKey(apiKey);
  return {
    client: sgMail,
    fromEmail: email
  };
}

function getBaseUrl(): string {
  if (process.env.NODE_ENV === 'production' && process.env.FRONTEND_URL) {
    return process.env.FRONTEND_URL;
  }
  return process.env.REPLIT_DEV_DOMAIN 
    ? `https://${process.env.REPLIT_DEV_DOMAIN}` 
    : 'http://localhost:5000';
}

export async function sendVerificationEmail(toEmail: string, fullName: string, token: string, accountType: string, language: string = 'fr') {
  try {
    const { client, fromEmail } = await getUncachableSendGridClient();
    const { getEmailTemplate } = await import('./emailTemplates');
    
    const verificationUrl = `${getBaseUrl()}/verify/${token}`;
    const accountTypeText = accountType === 'personal' ? 'personal' : 'business';
    
    const template = getEmailTemplate('verification', language as any, {
      fullName,
      verificationUrl,
      accountTypeText,
    });
    
    const msg = {
      to: toEmail,
      from: fromEmail,
      subject: template.subject,
      html: template.html,
      text: template.text,
    };

    await client.send(msg);
    console.log(`Verification email sent to ${toEmail} in ${language}`);
    return true;
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
}

export async function sendWelcomeEmail(toEmail: string, fullName: string, accountType: string, language: string = 'fr') {
  try {
    const { client, fromEmail } = await getUncachableSendGridClient();
    const { getEmailTemplate } = await import('./emailTemplates');
    
    const accountTypeText = accountType === 'personal' ? 'personal' : 'business';
    const loginUrl = `${getBaseUrl()}/login`;
    
    const template = getEmailTemplate('welcome', language as any, {
      fullName,
      accountTypeText,
      loginUrl,
    });
    
    const msg = {
      to: toEmail,
      from: fromEmail,
      subject: template.subject,
      html: template.html,
      text: template.text,
    };

    await client.send(msg);
    console.log(`Welcome email sent to ${toEmail} in ${language}`);
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
}

export async function sendContractEmail(toEmail: string, fullName: string, loanId: string, amount: string, contractUrl: string, language: string = 'fr') {
  try {
    const { client, fromEmail } = await getUncachableSendGridClient();
    const { getEmailTemplate } = await import('./emailTemplates');
    
    const fullContractUrl = `${getBaseUrl()}${contractUrl}`;
    
    const template = getEmailTemplate('contract', language as any, {
      fullName,
      amount,
      loanId,
      contractUrl: fullContractUrl,
      fromEmail,
    });
    
    const msg = {
      to: toEmail,
      from: fromEmail,
      subject: template.subject,
      html: template.html,
      text: template.text,
    };

    await client.send(msg);
    console.log(`Contract email sent to ${toEmail} in ${language}`);
    return true;
  } catch (error) {
    console.error('Error sending contract email:', error);
    throw error;
  }
}

export async function sendResetPasswordEmail(toEmail: string, fullName: string, token: string, language: string = 'fr') {
  try {
    const { client, fromEmail } = await getUncachableSendGridClient();
    
    const resetUrl = `${getBaseUrl()}/reset-password/${token}`;
    const safeName = escapeHtml(fullName);
    
    const subject = language === 'en' 
      ? 'Reset your password - ALTUS FINANCE GROUP'
      : 'Réinitialisez votre mot de passe - ALTUS FINANCE GROUP';
    
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f4f4f4; padding: 20px 0;">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px;">🔐 ${language === 'en' ? 'Password Reset' : 'Réinitialisation du mot de passe'}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <p style="color: #374151; font-size: 16px; line-height: 1.5; margin: 0 0 20px 0;">
                ${language === 'en' ? 'Hello' : 'Bonjour'} <strong>${safeName}</strong>,
              </p>
              <p style="color: #374151; font-size: 16px; line-height: 1.5; margin: 0 0 20px 0;">
                ${language === 'en' 
                  ? 'We received a request to reset your password for your ALTUS FINANCE GROUP account.'
                  : 'Nous avons reçu une demande de réinitialisation du mot de passe pour votre compte ALTUS FINANCE GROUP.'}
              </p>
              <p style="color: #374151; font-size: 16px; line-height: 1.5; margin: 0 0 30px 0;">
                ${language === 'en'
                  ? 'Click the button below to reset your password:'
                  : 'Cliquez sur le bouton ci-dessous pour réinitialiser votre mot de passe :'}
              </p>
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding: 0 0 30px 0;">
                    <a href="${resetUrl}" style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 6px; font-size: 16px; font-weight: 600;">
                      ${language === 'en' ? 'Reset Password' : 'Réinitialiser mon mot de passe'}
                    </a>
                  </td>
                </tr>
              </table>
              <p style="color: #6b7280; font-size: 14px; line-height: 1.5; margin: 0 0 20px 0;">
                ${language === 'en'
                  ? 'If the button doesn\'t work, copy and paste this link into your browser:'
                  : 'Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur :'}
              </p>
              <p style="color: #2563eb; font-size: 14px; line-height: 1.5; margin: 0 0 30px 0; word-break: break-all;">
                ${resetUrl}
              </p>
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 0 0 20px 0;">
                <p style="color: #92400e; font-size: 14px; line-height: 1.5; margin: 0;">
                  <strong>⚠️ ${language === 'en' ? 'Important' : 'Important'} :</strong><br>
                  ${language === 'en'
                    ? 'This link will expire in 1 hour. If you didn\'t request a password reset, please ignore this email.'
                    : 'Ce lien expirera dans 1 heure. Si vous n\'avez pas demandé de réinitialisation de mot de passe, veuillez ignorer cet email.'}
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                ALTUS FINANCE GROUP - ${language === 'en' ? 'Financing Solutions' : 'Solutions de financement'}<br>
                © ${new Date().getFullYear()} ${language === 'en' ? 'All rights reserved' : 'Tous droits réservés'}.
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
    
    const text = `${language === 'en' ? 'Hello' : 'Bonjour'} ${fullName},

${language === 'en' 
  ? 'We received a request to reset your password for your ALTUS FINANCE GROUP account.'
  : 'Nous avons reçu une demande de réinitialisation du mot de passe pour votre compte ALTUS FINANCE GROUP.'}

${language === 'en'
  ? 'To reset your password, visit this link:'
  : 'Pour réinitialiser votre mot de passe, visitez ce lien :'}

${resetUrl}

${language === 'en'
  ? 'This link will expire in 1 hour. If you didn\'t request a password reset, please ignore this email.'
  : 'Ce lien expirera dans 1 heure. Si vous n\'avez pas demandé de réinitialisation de mot de passe, veuillez ignorer cet email.'}

ALTUS FINANCE GROUP
© ${new Date().getFullYear()} ${language === 'en' ? 'All rights reserved' : 'Tous droits réservés'}.
    `;
    
    const msg = {
      to: toEmail,
      from: fromEmail,
      subject,
      html,
      text,
    };

    await client.send(msg);
    console.log(`Reset password email sent to ${toEmail} in ${language}`);
    return true;
  } catch (error) {
    console.error('Error sending reset password email:', error);
    throw error;
  }
}
