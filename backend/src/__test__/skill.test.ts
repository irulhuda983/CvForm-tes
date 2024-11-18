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

describe("POST /api/skill/:profileCode", () => {
  describe("add skill", () => {
    it("should return 404 and throw an error profile code not found", async () => {
      const res = await request(app).post(`/api/skill/XXXXX`).send({
        skill: "Docker",
        level: "Expert",
      });
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message");
    });

    it("should return 400 and error validation", async () => {
      const res = await request(app).post(`/api/skill/${profileCode}`).send({
        skill: "Docker",
      });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("errors");
    });

    it("should return 200 and create a new skill", async () => {
      const res = await request(app).post(`/api/skill/${profileCode}`).send({
        skill: "Docker",
        level: "Expert",
      });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("profileCode");
      expect(res.body).toHaveProperty("id");

      id = res.body.id;
    });
  });
});

describe("GET /api/skill/:profileCode", () => {
  describe("get all skill by profile code", () => {
    it("should return 200 and fetch all skill", async () => {
      const res = await request(app).get(`/api/skill/${profileCode}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(
        res.body.data.every(
          (item) => typeof item === "object" && item !== null,
        ),
      ).toBe(true);
    });

    it("should return 404 and throw an error when the profile is not found", async () => {
      const res = await request(app).get(`/api/skill/XXXXX`);
      expect(res.statusCode).toBe(404);
    });
  });
});

describe("DELETE /api/skill/:profileCode?id=:id", () => {
  describe("delete skill by profile code and id", () => {
    it("should return 404 and throw an error id not found", async () => {
      const res = await request(app).delete(
        `/api/skill/${profileCode}?id=xxxx`,
      );
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message");
    });

    it("should return 404 and trow an error profile code not found", async () => {
      const res = await request(app).delete(`/api/skill/XXXXX?id=${id}`);
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message");
    });

    it("should return 200 and success delete skill", async () => {
      const res = await request(app).delete(
        `/api/skill/${profileCode}?id=${id}`,
      );
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("profileCode");
    });
  });
});

// afterAll(async () => {
//   await prisma.skill.deleteMany();
//   await prisma.education.deleteMany();
//   await prisma.employment.deleteMany();
//   await prisma.profile.deleteMany();
// });
