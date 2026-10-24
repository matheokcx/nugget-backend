import { Injectable } from '@nestjs/common';
import type { Mailable } from '@nestjs/mail';

@Injectable()
export class ForgotPasswordMail implements Mailable<{ token: string }> {
  render({ token }: { token: string }) {
    return {
      subject: 'Nugget - Réinitialisez votre mot de passe',
      template: 'forgot-password',
      context: {
        resetUrl: `${process.env.APP_URL}/reset-password/${token}`,
      },
    };
  }
}
