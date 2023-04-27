import supertest from "supertest";
import app from "../src/app";
import prisma from "config/database";
import httpStatus from "http-status";
import { fakeConsole } from "./factories/console-factory";
import { fakeGame } from "./factories/game-factory";

beforeAll(async()=> {
    await prisma.game.deleteMany({})
    await prisma.console.deleteMany({})
})

const api = supertest(app);

describe("GET /games", () => {
    it("should get all games that are on the database", async () => {
      const console = await fakeConsole()
      const game = await fakeGame(console.id)
      
      const response = await api.get("/games")
      expect(response.body).toEqual(expect.arrayContaining([
        {
            id: game.id,
            title: game.title,
            consoleId: game.consoleId,
            Console:{
                id: console.id,
                name: console.name
            }
        }
      ]))
    })

 
})

// describe("GET /games/:id", () => {
//     it("should get all games by an specific ID", async () => {
//         const console = await fakeConsole()
//         const game = await fakeGame(console.id)
       
//         const response = await api.get(`games/${game.id}`)
//         expect(response.statusCode).toBe(httpStatus.OK);
//         expect(response.body).toEqual({
            
//             id: game.id,
//             title: game.title,
//             Console: {
//                 id: console.id,
               
//             }
            
//         })
//     })

//     it("should respond with 404 if the id doesnt exists", async () => {
//         const response = await api.get('/games/9999')
//         expect(response.statusCode).toEqual(httpStatus.NOT_FOUND)
//     })
// })

describe("POST /games", () => {
    it("should post a game", async () => {
        const console = await fakeConsole()

        const response = await api.post('/games').send({
            title: "Bomberman",
            consoleId: console.id
        })
        expect(response.statusCode).toEqual(httpStatus.CREATED)
    })

    it("should respond with 409 (conflict) when a game already exists on the database", async () => {
        const console = await fakeConsole()
        const game = await fakeGame(console.id)

        const response = await api.post('/games').send({
            title: game.title,
            consoleId: game.consoleId
        })
        expect(response.statusCode).toEqual(httpStatus.CONFLICT)
    })
})