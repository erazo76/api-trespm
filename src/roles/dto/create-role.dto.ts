import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class CreateRoleDto {
    
    @ApiProperty({description:'Role name'})
    @IsNotEmpty()    
    @Length(2,30)
    name: string;   

}
