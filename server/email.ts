import sgMail from '@sendgrid/mail';

let connectionSettings: any;

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? 'repl ' + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
    ? 'depl ' + process.env.WEB_REPL_RENEWAL
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=sendgrid',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || (!connectionSettings.settings.api_key || !connectionSettings.settings.from_email)) {
    throw new Error('SendGrid not connected');
  }
  return { apiKey: connectionSettings.settings.api_key, email: connectionSettings.settings.from_email };
}

async function getUncachableSendGridClient() {
  const { apiKey, email } = await getCredentials();
  sgMail.setApiKey(apiKey);
  return {
    client: sgMail,
    fromEmail: email
  };
}

export async function sendVerificationEmail(toEmail: string, fullName: string, token: string, accountType: string) {
  try {
    const { client, fromEmail } = await getUncachableSendGridClient();
    
    const verificationUrl = `${process.env.REPLIT_DEV_DOMAIN || 'http://localhost:5000'}/verify/${token}`;
    
    const accountTypeText = accountType === 'personal' ? 'particulier' : 'professionnel';
    
    const msg = {
      to: toEmail,
      from: fromEmail,
      subject: 'Vérifiez votre adresse email - ALTUS',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #2563eb; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
            .link { color: #2563eb; word-break: break-all; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 28px;">ALTUS</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Solutions de financement</p>
            </div>
            <div class="content">
              <h2 style="color: #1f2937; margin-top: 0;">Bonjour ${escapeHtml(fullName)},</h2>
              <p>Merci de vous être inscrit sur ALTUS en tant que <strong>${escapeHtml(accountTypeText)}</strong>.</p>
              <p>Pour activer votre compte et accéder à nos services de financement, veuillez vérifier votre adresse email en cliquant sur le bouton ci-dessous :</p>
              <div style="text-align: center;">
                <a href="${verificationUrl}" class="button">Vérifier mon email</a>
              </div>
              <p style="margin-top: 20px;">Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur :</p>
              <p class="link">${verificationUrl}</p>
              <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
                Si vous n'avez pas créé de compte sur ALTUS, vous pouvez ignorer cet email.
              </p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} ALTUS. Tous droits réservés.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Bonjour ${fullName},
        
        Merci de vous être inscrit sur ALTUS en tant que ${accountTypeText}.
        
        Pour activer votre compte, veuillez vérifier votre adresse email en visitant ce lien :
        ${verificationUrl}
        
        Si vous n'avez pas créé de compte sur ALTUS, vous pouvez ignorer cet email.
        
        ALTUS - Solutions de financement
      `
    };

    await client.send(msg);
    console.log(`Verification email sent to ${toEmail}`);
    return true;
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
}

export async function sendWelcomeEmail(toEmail: string, fullName: string, accountType: string) {
  try {
    const { client, fromEmail } = await getUncachableSendGridClient();
    
    const accountTypeText = accountType === 'personal' ? 'particulier' : 'professionnel/entreprise';
    
    const msg = {
      to: toEmail,
      from: fromEmail,
      subject: 'Bienvenue sur ALTUS !',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #2563eb; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 28px;">🎉 Bienvenue sur ALTUS !</h1>
            </div>
            <div class="content">
              <h2 style="color: #1f2937; margin-top: 0;">Bonjour ${escapeHtml(fullName)},</h2>
              <p>Votre email a été vérifié avec succès ! Votre compte <strong>${escapeHtml(accountTypeText)}</strong> est maintenant actif.</p>
              <p>Vous pouvez dès à présent accéder à toutes nos fonctionnalités :</p>
              <ul>
                <li>Demander un prêt personnel ou professionnel</li>
                <li>Gérer vos remboursements</li>
                <li>Effectuer des transferts</li>
                <li>Consulter votre tableau de bord</li>
              </ul>
              <div style="text-align: center;">
                <a href="${process.env.REPLIT_DEV_DOMAIN || 'http://localhost:5000'}/login" class="button">Se connecter</a>
              </div>
              <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
                Notre équipe est à votre disposition pour toute question.
              </p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} ALTUS. Tous droits réservés.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await client.send(msg);
    console.log(`Welcome email sent to ${toEmail}`);
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
}
