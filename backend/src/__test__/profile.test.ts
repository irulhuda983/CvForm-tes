import request from "supertest";
import { init } from "../server/httpServer";

import { configApp } from "../config/app";
const app = init({ config: configApp });

let profileCode = null;

describe("POST /api/profile/:profileCode", () => {
  describe("create profile", () => {
    it("should return 400 and error validation", async () => {
      const res = await request(app).post("/api/profile").send({
        wantedJobTitle: "Software Enginer",
        firstName: "nama",
        lastName: "ku",
        email: "email",
        phone: "09000000000",
        country: "indoensia",
        city: "jakarta",
        address: "tes address",
        postalCode: "9900000",
        drivingLicense: "12345678",
        nationality: "Indonesia",
        placeOfBirth: "Maluku",
        dateOfBirth: "12-08-1998",
      });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("errors");
    });

    it("should return 200 and success create a new profile", async () => {
      const res = await request(app).post("/api/profile").send({
        wantedJobTitle: "Software Engineer",
        firstName: "Namaku",
        lastName: "Ukaman",
        email: "ukaman.namaku@gmail.com",
        phone: "08008880000",
        country: "Indonesia",
        city: "Jakarta",
        address: "Jl. Gatot Subroto",
        postalCode: 200001,
        drivingLicense: "1234567890123456",
        nationality: "Indonesia",
        placeOfBirth: "Maluku",
        dateOfBirth: "07-12-1988",
      });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("profileCode");

      profileCode = res.body.profileCode;
    });
  });
});

describe("GET /api/profile/:profileCode", () => {
  describe("get profile", () => {
    it("should return 404 and throw and error not found", async () => {
      const res = await request(app).get(`/api/profile/XXXXX`);
      expect(res.statusCode).toBe(404);
    });

    it("should return 200", async () => {
      const res = await request(app).get(`/api/profile/${profileCode}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("profileCode");
    });
  });
});

describe("PUT /api/profile/:profileCode", () => {
  describe("update profile", () => {
    it("should return 400 and throw error validation", async () => {
      const res = await request(app).put(`/api/profile/${profileCode}`).send({
        wantedJobTitle: "Software Engineer",
        firstName: "Namaku",
        lastName: "Ukaman",
        email: "ukaman",
        phone: "1234567890",
        country: "Indonesia",
        city: "Jakarta",
        address: "Jl. Gatot Subroto",
        postalCode: 200001,
        drivingLicense: "1234567890123456",
        nationality: "Indonesia",
        placeOfBirth: "Maluku",
        dateOfBirth: "07-12-1988",
      });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("errors");
    });

    it("should return 200 and success update profile", async () => {
      const res = await request(app).put(`/api/profile/${profileCode}`).send({
        wantedJobTitle: "Software Engineer Update",
        firstName: "Namaku",
        lastName: "Ukaman",
        email: "ukaman.namaku@gmail.com",
        phone: "08008880000",
        country: "Indonesia",
        city: "Jakarta",
        address: "Jl. Gatot Subroto",
        postalCode: 200001,
        drivingLicense: "1234567890123456",
        nationality: "Indonesia",
        placeOfBirth: "Maluku",
        dateOfBirth: "07-12-1988",
      });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("profileCode");
    });
  });
});
