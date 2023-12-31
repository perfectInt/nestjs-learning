import { Column, DataType, Table, Model, BelongsToMany } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/users.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttrs {
  value: string
  description: string
}

@Table({
  tableName: "roles"
})
export class Role extends Model<Role, RoleCreationAttrs> {

  @ApiProperty({example: "1", description: "id"})
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number

  @ApiProperty({example: "ADMIN", description: "user's role"})
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false
  })
  value: string

  @ApiProperty({example: "This is admin's role", description: "Description of some role"})
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  description: string

  @BelongsToMany(() => User, () => UserRoles)
  users: User[]
}