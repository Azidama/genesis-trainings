import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1759954976171 implements MigrationInterface {
    name = 'Init1759954976171'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "registration_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "name" character varying NOT NULL, "age" character varying, "phone" character varying NOT NULL, "fatherName" character varying NOT NULL, "gender" character varying, "education" character varying NOT NULL, "city" character varying NOT NULL, "cnic" character varying NOT NULL, "trainingMode" character varying, "courses" text NOT NULL, "approved" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "heardAboutUs" character varying, "deletedAt" TIMESTAMP, CONSTRAINT "UQ_39cf91aa6693d3c1e91d0bd10a7" UNIQUE ("email"), CONSTRAINT "PK_9791ed2e946bf1d4072d234a73d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "assignment_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text NOT NULL, "dueDate" TIMESTAMP, "courseId" uuid, CONSTRAINT "PK_e0bef5bb36a0c5e6c25d3acbcd9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying, CONSTRAINT "UQ_5cac69abb93698ef58afd35b541" UNIQUE ("code"), CONSTRAINT "PK_9fcfc62edbcd9339ddd4a026e9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "enrollment_entity" ("id" SERIAL NOT NULL, "enrolledAt" TIMESTAMP NOT NULL DEFAULT now(), "isPaid" boolean NOT NULL DEFAULT true, "studentId" uuid, "courseId" uuid, CONSTRAINT "UQ_efd0e4ae0c05dbe85096c9e272c" UNIQUE ("studentId", "courseId"), CONSTRAINT "PK_8aca1eaef250f3f631d48ec397e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "batch_entity" ("batchId" character varying NOT NULL, CONSTRAINT "PK_ba193284163338dff92501a4790" PRIMARY KEY ("batchId"))`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "name" character varying NOT NULL, "fatherName" character varying, "phone" character varying, "role" character varying NOT NULL DEFAULT 'Student', "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "batchId" character varying, CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "UQ_d674cd677bf5c6f8996dd31f87a" UNIQUE ("batchId"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "submission_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" text, "submittedAt" TIMESTAMP, "grade" integer, "studentId" uuid, "assignmentId" uuid, CONSTRAINT "UQ_03024039ab9e2d8f19f6fac086a" UNIQUE ("studentId", "assignmentId"), CONSTRAINT "PK_cb7ddad7d99a7aa7365df911eb9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "assignment_entity" ADD CONSTRAINT "FK_2b7f6329f4d5f57870f3c651ea7" FOREIGN KEY ("courseId") REFERENCES "course_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "enrollment_entity" ADD CONSTRAINT "FK_c3a21ab7c393eb46a9a3fa9174b" FOREIGN KEY ("studentId") REFERENCES "user_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "enrollment_entity" ADD CONSTRAINT "FK_7e757a277b40c3f3a1a14fffd62" FOREIGN KEY ("courseId") REFERENCES "course_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "FK_d674cd677bf5c6f8996dd31f87a" FOREIGN KEY ("batchId") REFERENCES "batch_entity"("batchId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "submission_entity" ADD CONSTRAINT "FK_851d0a9293941e7aa412ef478aa" FOREIGN KEY ("studentId") REFERENCES "user_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "submission_entity" ADD CONSTRAINT "FK_97308ae81b5e3cd76026f25bd1e" FOREIGN KEY ("assignmentId") REFERENCES "assignment_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submission_entity" DROP CONSTRAINT "FK_97308ae81b5e3cd76026f25bd1e"`);
        await queryRunner.query(`ALTER TABLE "submission_entity" DROP CONSTRAINT "FK_851d0a9293941e7aa412ef478aa"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "FK_d674cd677bf5c6f8996dd31f87a"`);
        await queryRunner.query(`ALTER TABLE "enrollment_entity" DROP CONSTRAINT "FK_7e757a277b40c3f3a1a14fffd62"`);
        await queryRunner.query(`ALTER TABLE "enrollment_entity" DROP CONSTRAINT "FK_c3a21ab7c393eb46a9a3fa9174b"`);
        await queryRunner.query(`ALTER TABLE "assignment_entity" DROP CONSTRAINT "FK_2b7f6329f4d5f57870f3c651ea7"`);
        await queryRunner.query(`DROP TABLE "submission_entity"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP TABLE "batch_entity"`);
        await queryRunner.query(`DROP TABLE "enrollment_entity"`);
        await queryRunner.query(`DROP TABLE "course_entity"`);
        await queryRunner.query(`DROP TABLE "assignment_entity"`);
        await queryRunner.query(`DROP TABLE "registration_entity"`);
    }

}
