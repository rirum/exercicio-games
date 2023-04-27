import supertest from "supertest";
import app from "../src/app";
import prisma from "config/database";
import httpStatus from "http-status";
import { fakeConsole } from "./factories/console-factory";


beforeAll(async() => {
    await prisma.game.deleteMany({})
    await prisma.console.deleteMany({})
})

const api = supertest(app);

describe("GET /consoles", () => {
    it("should get all consoles", async () => {
        const console = await fakeConsole()
        
        
        const response = await api.get("/consoles")
        expect(response.body).toEqual(expect.arrayContaining([
          {
             id: console.id,
             name: console.name
          }
        ]))
    })
})

describe("GET /consoles/:id", () => {
    it("should get all consoles by an specific ID", async () => {
        const console = await fakeConsole();

        const response = await api.get(`/consoles/${console.id}`)
        expect(response.body).toEqual({
            id: console.id,
            name: console.name
        })
    })

    it("should respond with 404 if the id doesnt exists", async () => {
        const response = await api.get('/consoles/999')
        expect(response.statusCode).toEqual(httpStatus.NOT_FOUND)
    })
})

describe("POST /consoles", () => {
    it("should post a console", async () => {
        const console = await fakeConsole()

        const response = await api.post('/consoles').send({
            name: "Atari"
            
        })
        expect(response.statusCode).toEqual(httpStatus.CREATED)
    })

    it("should respond with 409 (conflict) when a game already exists on the database", async () => {
        const console = await fakeConsole()
        

        const response = await api.post('/consoles').send({
           name: console.name
        })
        expect(response.statusCode).toEqual(httpStatus.CONFLICT)
    })
})