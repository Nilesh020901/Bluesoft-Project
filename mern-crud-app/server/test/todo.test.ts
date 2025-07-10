import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import app from "../src/app";
import mongoose from "mongoose";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI!);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Todo API", () => {
  let createdId: string;

  it("should create a todo", async () => {
    const res = await request(app).post("/api/todos").send({ title: "Test" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    createdId = res.body._id;
  });

  it("should get todos", async () => {
    const res = await request(app).get("/api/todos");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should update a todo", async () => {
    const res = await request(app)
      .put(`/api/todos/${createdId}`)
      .send({ title: "Updated", completed: true });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Updated");
  });

  it("should delete a todo", async () => {
    const res = await request(app).delete(`/api/todos/${createdId}`);
    expect(res.statusCode).toBe(200);
  });
});
