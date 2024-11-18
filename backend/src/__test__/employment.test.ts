import request from "supertest";
import { init } from "../server/httpServer";
import { PrismaClient } from "@prisma/client";

import { configApp } from "../config/app";
const app = init({ config: configApp });

const prisma = new PrismaClient();
let profileCode = null;
let id = null;

beforeAll(async () => {
  const profile = await prisma.profile.findMany({
    orderBy: {
      createdAt: "desc", // or 'asc' for ascending order
    },
  });

  if (profile.length > 0) {
    profileCode = profile[0].profileCode;
  }
});

describe("POST /api/employment/:profileCode", () => {
  describe("add employment", () => {
    it("should return 404 and throw an error profile code not found", async () => {
      const res = await request(app).post(`/api/employment/XXXXX`).send({
        jobTitle: "CEO",
        employer: "Toko Lapak",
        startDate: null,
        endDate: null,
        city: "Jakarta",
        description: "CEO",
      });
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message");
    });

    it("should return 400 and error validation", async () => {
      const res = await request(app)
        .post(`/api/employment/${profileCode}`)
        .send({
          jobTitle: "CEO",
          employer: "Toko Lapak",
          startDate: null,
          endDate: null,
          city: "Jakarta",
          description: "CEO",
        });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("errors");
    });

    it("should return 200 and create a new employment", async () => {
      const res = await request(app)
        .post(`/api/employment/${profileCode}`)
        .send({
          jobTitle: "CEO",
          employer: "Toko Lapak",
          startDate: "01-01-2020",
          endDate: "01-01-2021",
          city: "Jakarta",
          description: "CEO",
        });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("profileCode");
      expect(res.body).toHaveProperty("id");

      id = res.body.id;
    });
  });
});

describe("GET /api/employment/:profileCode", () => {
  describe("get all employment by profile code", () => {
    it("should return 200 and fetch all employment", async () => {
      const res = await request(app).get(`/api/employment/${profileCode}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(
        res.body.data.every(
          (item) => typeof item === "object" && item !== null,
        ),
      ).toBe(true);
    });

    it("should return 404 and throw an error when the profile is not found", async () => {
      const res = await request(app).get(`/api/employment/XXXXX`);
      expect(res.statusCode).toBe(404);
    });
  });
});

describe("DELETE /api/employment/:profileCode?id=:id", () => {
  describe("delete employment by profile code and id", () => {
    it("should return 404 and trow an error id not found", async () => {
      const res = await request(app).delete(
        `/api/employment/${profileCode}?id=xxxx`,
      );
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message");
    });

    it("should return 404 and trow an error profile code not found", async () => {
      const res = await request(app).delete(`/api/employment/XXXXX?id=${id}`);
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message");
    });

    it("should return 200 and success delete employment", async () => {
      const res = await request(app).delete(
        `/api/employment/${profileCode}?id=${id}`,
      );
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("profileCode");
    });
  });
});
