import { UserRoles } from "@modules";
import { Reflector } from "@nestjs/core";

export const Roles = Reflector.createDecorator<string[]>()