import { DataSource } from "typeorm"
import { User } from "./entity/user";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "movistardb.cjcmv3tc2pyq.us-east-1.rds.amazonaws.com",
    port: 3306,
    username: "interview",
    password: "interview123",
    database: "interview_db",
    entities: [User],
    synchronize: true
});