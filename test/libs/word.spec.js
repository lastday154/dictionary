"use strict";

const word = require("../../libs/word");
const { expect } = require("chai");
const path = require("path");
const filePath = path.join(process.cwd(), "/libs/", "words.txt");

describe("word: ", () => {
  describe("getWords: ", () => {
    it("it should get words from file and remove duplicate word", async () => {
      const actual = await word.getWords(filePath);
      expect(actual).to.eql([
        "this",
        "file",
        "is",
        "the",
        "main",
        "config",
        "for",
        "your",
        "service",
        "it",
        "very",
        "minimal",
        "at",
        "point",
        "and",
        "uses",
        "default",
        "values",
        "you",
        "can",
        "always",
        "add",
        "more",
        "options",
        "control",
        "we",
        "have",
        "included",
        "some",
        "commented",
        "out",
        "examples",
        "here",
        "just",
        "uncomment",
        "any",
        "of",
        "them",
        "to",
        "get",
        "that",
        "option"
      ]);
    });
  });
});
