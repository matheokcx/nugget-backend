import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { FileTemplateEngine, MailModule, SmtpTransport } from '@nestjs/mail';
import { readFileSync } from 'node:fs';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.local'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false,
        migrations: [__dirname + '/migrations/**/*{.js,.ts}'],
      }),
      inject: [ConfigService],
    }),
    MailModule.forRoot({
      transport: new SmtpTransport({
        url: process.env.SMTP_URL,
        pool: true,
        ...(process.env.SMTP_CA_FILE && {
          tls: { ca: readFileSync(process.env.SMTP_CA_FILE) },
        }),
      }),
      templates: new FileTemplateEngine({
        dir: __dirname + '/mail/templates',
        layout: 'layout',
        cache: process.env.NODE_ENV === 'production',
      }),
      from: 'Nugget <nugget@no-reply.com>',
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
