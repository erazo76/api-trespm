import { Sale } from 'src/sales/entities/sale.entity';
import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'

@Entity()
export class Product {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column( { type: 'varchar', length: 30 } )
    name: string;

    @Column( { type: 'varchar', length: 30 } )
    description: string;

    @Column( { type: 'integer' } )
    price: number;

    @OneToMany(() => Sale, (sale) => sale.product)
    sales: Sale[]

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createAt: Date;

    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP'
    })
    updateAt: Date;
    
}
