import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm'
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Sale {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, (user) => user.sales)
    user: User;

    @ManyToOne(() => Product, (technic) => technic.sales)
    product: Product;

    @Column( { type: 'integer' } )
    qty: number;

    @CreateDateColumn({
        type: 'timestamp without time zone',
        default: () => 'CURRENT_TIMESTAMP'
    })
    saleAt: Date;

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
