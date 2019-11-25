import { asyncMake as make } from "../";
import { make as syncMake } from "../../sync";

import { error } from "../../utils";

describe("async", () => {
  describe("make", () => {
    const date = new Date();
    const tester = <T>(magic: T) =>
      make<Date>((payload: T, path: string) => {
        if (payload === magic) {
          return Promise.resolve(date);
        } else {
          return Promise.reject(error(`${magic}`, path, payload));
        }
      });

    test("simple", () => {
      expect.assertions(1);
      const parser = tester("simple");
      return expect(parser("simple")).resolves.toMatchObject(date);
    });
    test("simple then", () => {
      expect.assertions(1);
      const parser = tester("simple then").then(
        make((payload: Date) => Promise.resolve(payload.toUTCString()))
      );
      return expect(parser("simple then")).resolves.toEqual(date.toUTCString());
    });
    test("simple then then", () => {
      expect.assertions(1);
      const parser = tester("simple then then")
        .then(
          make<string, Date>((payload: Date) =>
            Promise.resolve(payload.toUTCString())
          )
        )
        .then(make((payload: string) => Promise.resolve(payload.length)));
      return expect(parser("simple then then")).resolves.toEqual(
        date.toUTCString().length
      );
    });

    test("simple then then should thrown", () => {
      expect.assertions(1);
      const parser = tester("simple then then should thrown")
        .then(make((payload: Date) => Promise.resolve(payload.toUTCString())))
        .then(make((payload: string) => Promise.resolve(payload.length)));
      return expect(parser("")).rejects.toMatchObject(
        error("simple then then should thrown", "", "")
      );
    });
    test("simple catch", () => {
      expect.assertions(1);
      const parser = tester("simple catch").catch(
        make(() => Promise.resolve(0))
      );
      return expect(parser("simple catch")).resolves.toMatchObject(date);
    });
    test("simple catch do catch", () => {
      expect.assertions(1);
      const someArray = new ArrayBuffer(1);
      const parser = tester("simple catch").catch(syncMake(() => someArray));
      return expect(parser("?")).resolves.toMatchObject(someArray);
    });
    test("simple catch do catch - null", () => {
      expect.assertions(1);
      const someArray = new ArrayBuffer(1);
      const parser = tester("simple catch").catch(syncMake(() => someArray));
      return expect(parser(null)).resolves.toMatchObject(someArray);
    });
    test("simple catch do catch - undefined", () => {
      expect.assertions(1);
      const someArray = new ArrayBuffer(1);
      const parser = tester("simple catch").catch(syncMake(() => someArray));
      return expect(parser(undefined)).resolves.toMatchObject(someArray);
    });
  });
});
