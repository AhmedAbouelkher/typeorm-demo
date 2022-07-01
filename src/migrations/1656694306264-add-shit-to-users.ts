import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class addShitToUsers1656694306264 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.addColumn(
            "user",
            new TableColumn({
                name: "shit",
                type: "text",
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropColumn("user", "shit");
    }
}
