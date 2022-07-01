"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEmailToUsers1656690404678 = void 0;
const typeorm_1 = require("typeorm");
class addEmailToUsers1656690404678 {
    async up(queryRunner) {
        await queryRunner.addColumn("user", new typeorm_1.TableColumn({
            name: "email",
            type: "text",
            isNullable: true,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn("user", "email");
    }
}
exports.addEmailToUsers1656690404678 = addEmailToUsers1656690404678;
//# sourceMappingURL=1656690404678-add-email-to-users.js.map