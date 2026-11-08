import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1794095480073 implements MigrationInterface {
  name = 'Migration1794095480073';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "summary_usages" ("id" SERIAL NOT NULL, "count" integer NOT NULL, "reset_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_58193f58e58fb1b7f74b1cb2072" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "subscription_events" ("id" SERIAL NOT NULL, "revenue_cat_event_id" character varying NOT NULL, "event_type" character varying NOT NULL, "received_at" TIMESTAMP NOT NULL, "processed_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "subscriptionId" integer, CONSTRAINT "PK_7eb5647aa3071cffad0124bceee" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."subscriptions_status_enum" AS ENUM('ACTIVE', 'GRACE_PERIOD', 'EXPIRED', 'REVOKED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "subscriptions" ("id" SERIAL NOT NULL, "entitlement_id" character varying NOT NULL, "product_id" character varying NOT NULL, "store" character varying NOT NULL, "environment" character varying NOT NULL, "original_transaction_id" character varying NOT NULL, "status" "public"."subscriptions_status_enum" NOT NULL DEFAULT 'ACTIVE', "will_renew" boolean NOT NULL DEFAULT true, "starts_at" TIMESTAMP NOT NULL, "expires_at" TIMESTAMP NOT NULL, "grace_period_expires_at" TIMESTAMP NOT NULL, "last_event_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "eventsId" integer, CONSTRAINT "PK_a87248d73155605cf782be9ee5e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."saved_contents_platform_enum" AS ENUM('INSTAGRAM', 'TIKTOK')`,
    );
    await queryRunner.query(
      `CREATE TABLE "saved_contents" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "platform" "public"."saved_contents_platform_enum" NOT NULL, "duration" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_315c06098c2a921330b1bf41931" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "summaries" ("id" SERIAL NOT NULL, "summary" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "savedContentId" integer, CONSTRAINT "PK_448e2a87db98ce2a6ee8946f392" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "files" ("id" SERIAL NOT NULL, "key" character varying NOT NULL, "mimeType" character varying NOT NULL, "size" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "summaryId" integer, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "summaryUsageId" integer`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_c02dd171c14bf87ee473f4fc8bd" UNIQUE ("summaryUsageId")`,
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "subscriptionId" integer`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_07f4c2455fc50d34b0b39d67a01" UNIQUE ("subscriptionId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_events" ADD CONSTRAINT "FK_884909014831de1e7d39fdd3aea" FOREIGN KEY ("subscriptionId") REFERENCES "subscriptions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_5eb8af4c7fcca1dbefce91b8d05" FOREIGN KEY ("eventsId") REFERENCES "subscription_events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_c02dd171c14bf87ee473f4fc8bd" FOREIGN KEY ("summaryUsageId") REFERENCES "summary_usages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_07f4c2455fc50d34b0b39d67a01" FOREIGN KEY ("subscriptionId") REFERENCES "subscriptions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "saved_contents" ADD CONSTRAINT "FK_9451ae98af7b42a1352e3b5d9cb" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "summaries" ADD CONSTRAINT "FK_7f7ddf9db3981ded86cf0e7c678" FOREIGN KEY ("savedContentId") REFERENCES "saved_contents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "files" ADD CONSTRAINT "FK_69d67af8cebf47b654d07a11be2" FOREIGN KEY ("summaryId") REFERENCES "summaries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "files" DROP CONSTRAINT "FK_69d67af8cebf47b654d07a11be2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "summaries" DROP CONSTRAINT "FK_7f7ddf9db3981ded86cf0e7c678"`,
    );
    await queryRunner.query(
      `ALTER TABLE "saved_contents" DROP CONSTRAINT "FK_9451ae98af7b42a1352e3b5d9cb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_07f4c2455fc50d34b0b39d67a01"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_c02dd171c14bf87ee473f4fc8bd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_5eb8af4c7fcca1dbefce91b8d05"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_events" DROP CONSTRAINT "FK_884909014831de1e7d39fdd3aea"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_07f4c2455fc50d34b0b39d67a01"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "subscriptionId"`);
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_c02dd171c14bf87ee473f4fc8bd"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "summaryUsageId"`);
    await queryRunner.query(`DROP TABLE "files"`);
    await queryRunner.query(`DROP TABLE "summaries"`);
    await queryRunner.query(`DROP TABLE "saved_contents"`);
    await queryRunner.query(
      `DROP TYPE "public"."saved_contents_platform_enum"`,
    );
    await queryRunner.query(`DROP TABLE "subscriptions"`);
    await queryRunner.query(`DROP TYPE "public"."subscriptions_status_enum"`);
    await queryRunner.query(`DROP TABLE "subscription_events"`);
    await queryRunner.query(`DROP TABLE "summary_usages"`);
  }
}
