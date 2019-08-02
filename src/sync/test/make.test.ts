import { make } from "../";
import { error } from "../../utils";

describe("sync", () => {
  describe("make", () => {
    const date = new Date();
    const tester = (magic: string) =>
      make((payload: any, _: boolean, path: string) => {
        if (payload === magic) {
          return date;
        } else {
          throw error(magic, path, payload);
        }
      });

    test("simple", () => {
      const parser = tester("simple");
      expect(parser("simple")).toMatchObject(date);
    });
    test("simple then", () => {
      const parser = tester("simple then").then((payload: Date) =>
        payload.toUTCString()
      );
      expect(parser("simple then")).toEqual(date.toUTCString());
    });
    test("simple then then", () => {
      const parser = tester("simple then then")
        .then((payload: Date) => payload.toUTCString())
        .then((payload: string) => payload.length);
      expect(parser("simple then then")).toEqual(date.toUTCString().length);
    });

    test("simple then then should thrown", () => {
      const parser = tester("simple then then should thrown")
        .then((payload: Date) => payload.toUTCString())
        .then((payload: string) => payload.length);
      expect(() => {
        parser("");
      }).toThrow();
    });
    test("simple catch", () => {
      const parser = tester("simple catch").catch(() => 0);
      expect(parser("simple catch")).toMatchObject(date);
    });
    test("simple catch do catch", () => {
      const someArray = new ArrayBuffer(1);
      const parser = tester("simple catch").catch(() => someArray);
      expect(parser("?")).toMatchObject(someArray);
    });
    test("simple catch do catch - null", () => {
      const someArray = new ArrayBuffer(1);
      const parser = tester("simple catch").catch(() => someArray);
      expect(parser(null)).toMatchObject(someArray);
    });
    test("simple catch do catch - undefined", () => {
      const someArray = new ArrayBuffer(1);
      const parser = tester("simple catch").catch(() => someArray);
      expect(parser(undefined)).toMatchObject(someArray);
    });
  });
});
