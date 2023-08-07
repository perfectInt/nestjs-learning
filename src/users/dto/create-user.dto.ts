import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({example: "dada@mail.ru", description: "email"})
  @IsString({message: "Must be string!"})
  @IsEmail({}, {message: "It is not email!"})
  readonly email: string
  @ApiProperty({example: "12345678", description: "password"})
  @IsString({message: "Must be string!"})
  @Length(8)
  readonly password: string
}