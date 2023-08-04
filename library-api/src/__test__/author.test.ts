import supertest from "supertest";
import { setTimeout } from "timers/promises";
import { app } from "../server";

describe("Author", ()=> {
    describe("create author", ()=> {
            it("should return 201, if author was created successfully", async() => {
                const { statusCode, body } = await supertest(app).post(`/authors`)
                .send({ firstName: "Rashid", lastName: 'Ahamed'});                
                expect(statusCode).toBe(201);
            });

            it("should return 400, if last name wasnt provided", async() => {
                const { statusCode, body } = await supertest(app).post(`/authors`)
                .send({ firstName: "Rashid"});                
                expect(statusCode).toBe(400);
            });

            it("should return 400, if first name wasnt provided", async() => {
                const { statusCode, body } = await supertest(app).post(`/authors`)
                .send({ lastName: 'Ahamed'});                
                expect(statusCode).toBe(400);
            });

            it("should return 400, if first name is less than 2 chars", async() => {
                const { statusCode, body } = await supertest(app).post(`/authors`)
                .send({ firstName: "R", lastName: 'Ahamed'});                
                expect(statusCode).toBe(400);
            });

            it("should return 400, if last name is less than 2 chars", async() => {
                const { statusCode, body } = await supertest(app).post(`/authors`)
                .send({ firstName: "Rashid", lastName: 'A'});                
                expect(statusCode).toBe(400);
            });

            it("should return 400, if first name is greater than 20 chars", async() => {
                const { statusCode, body } = await supertest(app).post(`/authors`)
                .send({ firstName: "Rashidddddddddddddddd", lastName: 'Ahamed'});                
                expect(statusCode).toBe(400);
            });

            it("should return 400, if last name is greater than 20 chars", async() => {
                const { statusCode, body } = await supertest(app).post(`/authors`)
                .send({ firstName: "Rashid", lastName: 'Ahamedddddddddddddddd'});                
                expect(statusCode).toBe(400);
            });
    });

});