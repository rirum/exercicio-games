import supertest from "supertest";
import app from "../src/app";
import prisma from "config/database";
import httpStatus from "http-status";

beforeAll(async() => {
    await prisma.game.deleteMany({})
    await prisma.console.deleteMany({})
})

const api = supertest(app);

describe("GET /consoles", () => {
    it("should get all consoles", async () => {
        const body = {
            name: "atari",
            games
        }
    })
})

describe("GET /consoles/:id", () => {
    it("should get all consoles by an specific ID", async () => {
        
    })
})

describe("POST /consoles/", () => {
    it("should post a console", async () => {
        
    })
})