import { Injectable } from '@nestjs/common';
import type { Mailable } from '@nestjs/mail';

@Injectable()
export class ForgotPasswordMail implements Mailable<{ code: string }> {
  render({ code }: { code: string }) {
    return {
      subject: 'Nugget - Réinitialisez votre mot de passe',
      template: 'forgot-password',
      context: {
        code: code,
      },
    };
  }
}
