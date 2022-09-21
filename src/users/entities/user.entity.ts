import { Role } from 'src/roles/entities/role.entity';
import { Sale } from 'src/sales/entities/sale.entity';
import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm'


@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column( { type: 'varchar', length: 30 } )
    name: string;

    @Column( { type: 'varchar', length: 30 } )
    lastName: string;

    @Column( { type: 'varchar', length: 30 } )
    document: string;

    @OneToMany(() => Sale, (sale) => sale.user)
    sales: Sale[]

    @ManyToOne(() => Role, (role) => role.users)
    role: Role;

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
