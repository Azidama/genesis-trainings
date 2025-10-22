import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1760980642634 implements MigrationInterface {
    name = 'Migration1760980642634'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "noticeBoard" character varying`);
        await queryRunner.query(`ALTER TABLE "registration_entity" ADD "noticeBoard" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "registration_entity" DROP COLUMN "noticeBoard"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "noticeBoard"`);
    }

}
