import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class CreateSaleDto {
    
    @ApiProperty({description:'User id reference'})
    @IsNotEmpty() 
    userId: string;

    @ApiProperty({description:'Product id reference'})
    @IsNotEmpty()
    productId: string;

    @ApiProperty({description:'Sale quantity'})
    @IsNotEmpty()      
    @IsNumber ()   
    @Min(0)
    @Max(9999) 
    qty: number;

}

export class UpdateSaleDto extends PartialType(CreateSaleDto) {}
