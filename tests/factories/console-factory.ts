import prisma from "config/database";
import { faker } from '@faker-js/faker';

export async function fakeConsole(){
    return await prisma.console.create({
        data: {
            name: faker.name.fullName()
        }
    })
}