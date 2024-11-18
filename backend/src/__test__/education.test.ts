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
      createdAt: "desc",
    },
  });

  if (profile.length > 0) {
    profileCode = profile[0].profileCode;
  }
});

describe("POST /api/education/:profileCode", () => {
  describe("add education", () => {
    it("should return 404 and throw an error profile code not found", async () => {
      const res = await request(app).post(`/api/education/XXXXX`).send({
        school: "ITB",
        degree: "21",
        startDate: "01-06-2000",
        endDate: "01-06-2004",
        city: "Bandung",
        description: "ITB",
      });
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message");
    });

    it("should return 400 and error validation", async () => {
      const res = await request(app)
        .post(`/api/education/${profileCode}`)
        .send({
          school: "ITB",
          degree: "21",
          startDate: null,
          endDate: null,
          city: "Bandung",
          description: "ITB",
        });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("errors");
    });

    it("should return 200 and create a new education", async () => {
      const res = await request(app)
        .post(`/api/education/${profileCode}`)
        .send({
          school: "ITB",
          degree: "21",
          startDate: "01-06-2000",
          endDate: "01-06-2004",
          city: "Bandung",
          description: "ITB",
        });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("profileCode");
      expect(res.body).toHaveProperty("id");

      id = res.body.id;
    });
  });
});

describe("GET /api/education/:profileCode", () => {
  describe("get all education by profile code", () => {
    it("should return 200 and fetch all education", async () => {
      const res = await request(app).get(`/api/education/${profileCode}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(
        res.body.data.every(
          (item) => typeof item === "object" && item !== null,
        ),
      ).toBe(true);
    });

    it("should return 404 and throw an error when the profile is not found", async () => {
      const res = await request(app).get(`/api/education/XXXXX`);
      expect(res.statusCode).toBe(404);
    });
  });
});

describe("DELETE /api/education/:profileCode?id=:id", () => {
  describe("delete education by profile code and id", () => {
    it("should return 404 and trow an error id not found", async () => {
      const res = await request(app).delete(
        `/api/education/${profileCode}?id=xxxx`,
      );
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message");
    });

    it("should return 404 and trow an error profile code not found", async () => {
      const res = await request(app).delete(`/api/education/XXXXX?id=${id}`);
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message");
    });

    it("should return 200 and success delete education", async () => {
      const res = await request(app).delete(
        `/api/education/${profileCode}?id=${id}`,
      );
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("profileCode");
    });
  });
});
