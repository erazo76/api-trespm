import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Length, Max, Min } from "class-validator";

export class CreateProductDto {
    
    @ApiProperty({description:'Product name capitalized'})
    @IsNotEmpty()    
    @Length(2,30)
    name: string; 
    
    @ApiProperty({description:'Product description'})
    @IsNotEmpty()    
    @Length(2,30)
    description: string;

    @ApiProperty({description:'Product price'})
    @IsNotEmpty()      
    @IsNumber ()   
    @Min(0)
    @Max(9999999) 
    price: number;

}
