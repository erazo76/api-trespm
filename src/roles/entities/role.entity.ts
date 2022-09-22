import { User } from 'src/users/entities/user.entity';
import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'


@Entity()
export class Role {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column( { type: 'varchar', length: 30 } )
    name: string;

    @OneToMany(() => User, (user) => user.role)
    users: User[]
    
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
