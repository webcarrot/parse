import {
  asyncSwitchOnField as switchOnField,
  asyncShape as shape,
  asyncLazy as lazy,
  asyncArray as array,
  asyncMake as make,
} from "../";
import { eq } from "../../sync";
import { AsyncParser } from "../../types";

describe("async", () => {
  describe("lazy", () => {
    test("lazy child", async () => {
      type A = {
        type: "a";
      };
      type B = {
        type: "b";
        items: ReadonlyArray<A | B>;
        time: number;
      };

      const typeParser: AsyncParser<A | B> = switchOnField<A | B, "type">(
        "type",
        {
          a: shape<A>({ type: eq("a") }),
          b: lazy(() => shape({ type: eq("b"), items: parser, time })),
        }
      );

      const parser = array(typeParser);

      let counter = 0;

      const time = make<number>(async () => {
        return counter++;
      });

      await expect(
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
      ).resolves.toMatchObject([
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
              time: 0,
            },
          ],
          time: 1,
        },
      ]);
    });
  });
});
