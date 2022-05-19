import { asyncSwitchOnField as switchOnField, asyncShape } from "..";
import { eq, string, number, shape } from "../../sync";
import { error } from "../../utils";

describe("async", () => {
  describe("switchOnField", () => {
    test("A", async () => {
      const base = {
        query: shape(
          {
            q: string({ optional: true }),
          },
          { optional: true }
        ),
        params: shape(
          {
            id: string({ optional: true }),
          },
          { optional: true }
        ),
      };
      const parser = switchOnField<
        { method: "GET" | "POST"; query: any },
        "method"
      >("method", {
        GET: shape({
          method: eq("GET"),
          ...base,
        }),
        POST: asyncShape({
          method: eq("POST"),
          ...base,
          body: asyncShape({
            id: number({ convert: true }),
          }),
        }),
      });
      await expect(
        parser({
          method: "POST",
          body: {
            id: "12",
            unknown: 2,
          },
        })
      ).resolves.toMatchObject({
        method: "POST",
        body: {
          id: 12,
        },
      });
    });
    test("should throw", async () => {
      const base = {
        query: asyncShape(
          {
            q: string({ optional: true }),
          },
          { optional: true }
        ),
        params: asyncShape(
          {
            id: string({ optional: true }),
          },
          { optional: true }
        ),
      };
      const parser = switchOnField("method", {
        GET: asyncShape({
          method: eq("GET"),
          ...base,
        }),
        POST: asyncShape({
          method: eq("POST"),
          ...base,
          body: asyncShape({
            id: string({ nullable: true }),
          }),
        }),
      });
      await expect(
        parser({
          method: "POST",
        })
      ).rejects.toMatchObject(error("Value is required", ".body", undefined));
    });
  });
});
