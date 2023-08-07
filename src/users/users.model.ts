import { Column, DataType, Table, Model, BelongsToMany, HasMany } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";
import { Post } from "../posts/posts.model";

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({
  tableName: "users"
})
export class User extends Model<User, UserCreationAttrs> {

  @ApiProperty({ example: "1", description: "id" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ApiProperty({ example: "dada@mail.ru", description: "email" })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false
  })
  email: string;

  @ApiProperty({ example: "12345678", description: "password" })
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password: string;

  @ApiProperty({ example: "true", description: "Is banned or not?" })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  banned: boolean;

  @ApiProperty({ example: "Cheating", description: "Ban reason" })
  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  banReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasMany(() => Post)
  posts: Post[];
}