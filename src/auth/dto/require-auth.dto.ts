import { IsString, } from 'class-validator';

export class RequireAuthDto {

  @IsString()
  username:string;

  @IsString()
  contrasena: string;
}