import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import request from "supertest";
import app from "../src/app";

let server: any;

beforeAll(() => {
  server = app.listen(3001);
});

afterAll(() => {
  server.close();
});

describe("User API", () => {
  it("AI address extract", async () => {
    const response = await request(server).post("/parse").send({
      address:
        "Jl. Haji Misbah Jl. Komp. Multatuli Indah No.1 Blok D, kel.Hamdan, kecamatan Medan Maimun, mdn, Sumatra Utara 20151",
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);

    expect(response.body.data).toEqual(
      expect.objectContaining({
        street: expect.any(String),
        village: expect.any(String),
        district: expect.any(String),
        regency: expect.any(String),
        province: expect.any(String),
        postalCode: expect.any(String),
        country: expect.any(String),
      })
    );
  });
});
