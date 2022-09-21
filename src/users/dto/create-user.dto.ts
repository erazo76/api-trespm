import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length, Matches } from "class-validator";

export class CreateUserDto {
    
    @ApiProperty({description:'User name capitalized'})
    @IsNotEmpty()    
    @Length(2,30)
    @Matches(/^(\b[A-Z][a-zñáéíóú]+['\-]{0,1}[a-zñáéíóú]+)(\s+(\b[A-Z][a-zñáéíóú]+['\-]{0,1}[a-zñáéíóú]+))*$/, {message: 'Invalid name'}) 
    name: string; 
    
    @ApiProperty({description:'User last name capitalized'})
    @IsNotEmpty()    
    @Length(2,30)
    @Matches(/^(\b[A-Z][a-zñáéíóú]+['\-]{0,1}[a-zñáéíóú]+)(\s+(\b[A-Z][a-zñáéíóú]+['\-]{0,1}[a-zñáéíóú]+))*$/, {message: 'Invalid name'}) 
    lastName: string;

    @ApiProperty({description:'User document (NIT, CC or any indentification)'})
    @IsNotEmpty()    
    @Length(2,20)
    document: string;

}
