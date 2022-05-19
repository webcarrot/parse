import { switchOnField, eq, shape, lazy, array } from "../";
import { Parser } from "../types";

describe("sync", () => {
  describe("lazy", () => {
    test("lazy child", () => {
      type A = {
        type: "a";
      };
      type B = {
        type: "b";
        items: ReadonlyArray<A | B>;
      };

      const typeParser: Parser<A | B> = switchOnField<A | B, "type">("type", {
        a: shape<A>({ type: eq("a") }),
        b: lazy(() => shape({ type: eq("b"), items: parser })),
      });

      const parser = array(typeParser);

      expect(
        parser([
          {
            type: "a",
          },
          {
            type: "b",
            items: [
              {
                type: "a",
              },
              {
                type: "b",
                items: [],
              },
            ],
          },
        ])
      ).toMatchObject([
        {
          type: "a",
        },
        {
          type: "b",
          items: [
            {
              type: "a",
            },
            {
              type: "b",
              items: [],
            },
          ],
        },
      ]);
    });
  });
});
