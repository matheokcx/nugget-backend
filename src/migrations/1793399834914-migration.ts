import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1793399834914 implements MigrationInterface {
  name = 'Migration1793399834914';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "reset-password-codes" ("id" SERIAL NOT NULL, "code" character varying(6) NOT NULL, "email" character varying(150) NOT NULL, "expire_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f95842d3c37151c8667cf7d1b64" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "reset-password-codes"`);
  }
}
