import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Item as APIItem } from '@larder/api-interfaces'

@Entity()
export class Item implements APIItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    category: string;
    
    @Column()
    stock: number;

    @Column()
    target: number;

    @Column({ default: "" })
    units: string;
}