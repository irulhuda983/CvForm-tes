import request from "supertest";
import { init } from "../server/httpServer";
import { PrismaClient } from "@prisma/client";

import { configApp } from "../config/app";
const app = init({ config: configApp });

const prisma = new PrismaClient();
let profileCode = null;

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

describe("PUT /api/working-experience/:profileCode", () => {
  describe("update working experience", () => {
    it("should return 400 and throw an error validation", async () => {
      const res = await request(app)
        .put(`/api/working-experience/${profileCode}`)
        .send({
          workingExperience: null,
        });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("errors");
    });

    it("should return 200 and success update working experience", async () => {
      const res = await request(app)
        .put(`/api/working-experience/${profileCode}`)
        .send({
          workingExperience: "update software engineer bla bla bla",
        });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("profileCode");
    });
  });
});

describe("GET /api/working-experience/:profileCode", () => {
  describe("get working experience", () => {
    it("should return 404 and throw add error message not found", async () => {
      const res = await request(app).get(`/api/working-experience/XXXXX`);
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message");
    });

    it("should return 200 and give working experience", async () => {
      const res = await request(app).get(
        `/api/working-experience/${profileCode}`,
      );
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("workingExperience");
    });
  });
});
