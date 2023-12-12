import {includes} from '../src/utils';
import nouns from '../src/dictionaries/nouns.json';
import adjectives from '../src/dictionaries/adjectives.json';
import generate from '../src/generator';
import {test, expect, describe, beforeEach} from "bun:test";
describe('generator', function () {
  test('has a generate function', function () {
    expect(generate).toBeFunction();
  });

  describe('generate', function () {
    describe('when called with no argument', function () {
      let srvName: any;
      beforeEach(function () {
        srvName = generate();
      });

      test('returns an object with keys: dashed, spaced, raw', function () {
          expect(srvName).not.toBeUndefined();
          expect(srvName.dashed).not.toBeUndefined();
          expect(srvName.spaced).not.toBeUndefined();
          expect(srvName.raw).not.toBeUndefined();
      });

      test('has a property raw which is an array of two strings', function () {
        expect(srvName.raw.length).toBe(2);
        expect(typeof srvName.raw[0]).toBe('string');
        expect(typeof srvName.raw[1]).toBe('string');
      });

      test("has an array raw, the first item of which is from the adjectives array", function () {
        expect(includes(adjectives, srvName.raw[0])).toBe(true);
      });

      test("has an array raw, the second item of which is from the nouns array", function () {
          expect(includes(nouns, srvName.raw[1])).toBe(true);
      });

      test("has a property dashed, which is a string of raw's items joined with a dash", function () {
        expect(srvName.dashed).toBe(srvName.raw.join('-'));
      });

      test("has a property spaced, which is a string of raw's items joined with a space", function () {
          expect(srvName.spaced).toBe(srvName.raw.join(' '));
      });
    });

    describe('when called with an options object', function () {
      let srvName: any;

      test('with {}, shows default behaviour', function () {
        srvName = generate({});
        expect(srvName.raw.length).toBe(2);
        expect(typeof srvName.raw[0]).toBe('string');
        expect(typeof srvName.raw[1]).toBe('string');
      })

      test('with {number: true}, includes number', function () {
        srvName = generate({number: true});
        expect(srvName.raw.length).toBe(3);
        expect(typeof srvName.raw[0]).toBe('string');
        expect(typeof srvName.raw[1]).toBe('string');
        expect(typeof srvName.raw[2]).toBe('number');
      });

      test('with {words: n}, has n-1 adjectives and 1 noun', function () {
        srvName = generate({words: 3});
        expect(srvName.raw.length).toBe(3);
        expect(includes(adjectives, srvName.raw[0])).toBe(true);
        expect(includes(adjectives, srvName.raw[1])).toBe(true);
        expect(includes(nouns, srvName.raw[2])).toBe(true);

        srvName = generate({words: 5});
        expect(srvName.raw.length).toBe(5);
        expect(includes(adjectives, srvName.raw[0])).toBe(true);
        expect(includes(adjectives, srvName.raw[1])).toBe(true);
        expect(includes(adjectives, srvName.raw[2])).toBe(true);
        expect(includes(adjectives, srvName.raw[3])).toBe(true);
        expect(includes(nouns, srvName.raw[4])).toBe(true);
      });

      test('with {alliterative: true}, has 1 adjective and 1 noun beginning with same letter', function () {
        srvName = generate({alliterative: true});
        expect(srvName.raw.length).toBe(2);
        expect(includes(adjectives, srvName.raw[0])).toBe(true);
        expect(includes(nouns, srvName.raw[1])).toBe(true);
        expect(srvName.raw[0].substring(0, 1).toLowerCase() === srvName.raw[1].substring(0, 1).toLowerCase()).toBe(true);
      });

    })
  });
});