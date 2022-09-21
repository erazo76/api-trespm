import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

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
