import prisma from "config/database";
import { faker } from "@faker-js/faker";

export async function fakeGame(consoleId: number){
    return await prisma.game.create({
        data: {
            title: faker.name.fullName(),
            consoleId: consoleId
        }
    })
}