import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1794175897097 implements MigrationInterface {
  name = 'Migration1794175897097';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_5eb8af4c7fcca1dbefce91b8d05"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" DROP COLUMN "eventsId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "summary_usages" ALTER COLUMN "count" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "summary_usages" ALTER COLUMN "reset_at" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "summary_usages" ALTER COLUMN "reset_at" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "summary_usages" ALTER COLUMN "count" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" ADD "eventsId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_5eb8af4c7fcca1dbefce91b8d05" FOREIGN KEY ("eventsId") REFERENCES "subscription_events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
