import { UserDTO } from "./UserDTO";

export interface LoginResponseDto
{
    User: UserDTO,
    Token: string
}