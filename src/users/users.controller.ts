import { Body, Controller, Get, Post, Put, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.model";
import { RolesGuard } from "../auth/roles.guard";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { Roles } from "../auth/roles-auth.decorator";

@ApiTags("User's controller")
@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) { }

  @ApiOperation({summary: "User's creation"})
  @ApiResponse({status: 200, type: User})
  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto)
  }

  @ApiOperation({summary: "Getting all users"})
  @ApiResponse({status: 200, type: [User]})
  @UseGuards(RolesGuard)
  @Roles("USER")
  @Get()
  getAll() {
    return this.usersService.getAllUsers()
  }

  @UseGuards(RolesGuard)
  // @ROLES("ADMIN")
  @Put("/role")
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }

  @UseGuards(RolesGuard)
  @Roles("ADMIN")
  @Put("/ban")
  banUser(@Body() dto: BanUserDto) {
    return this.usersService.banUser(dto);
  }
}
