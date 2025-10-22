import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1761164034530 implements MigrationInterface {
    name = 'Migration1761164034530'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "noticeBoard"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "noticeBoard" character varying`);
    }

}
