/**
 * @file A tree-sitter parser for zig
 * @author Hamish MacDonald <elusivenode@gmail.com>
 * @license GNU AFFERO GENERAL PUBLIC LICENSE
 */

/// <reference types='tree-sitter-cli/dsl' />
// @ts-check

module.exports = grammar({
  name: "zig",

  // Define valid top-level constructs
  extras: ($) => [
    /\s/, // whitespace
  ],

  word: ($) => $.identifier,

  rules: {
    // The source file is the root
    source_file: ($) => repeat($._definition),

    _definition: ($) => choice($.function_declaration, $.const_declaration),

    // Changed name to be more specific
    function_declaration: ($) =>
      seq(
        "fn",
        $.identifier,
        "(",
        optional($.parameter_list),
        ")",
        optional($.type),
        $.block,
      ),

    const_declaration: ($) =>
      seq("const", $.identifier, "=", $._expression, ";"),

    parameter_list: ($) => seq($.parameter, repeat(seq(",", $.parameter))),

    parameter: ($) => seq($.identifier, ":", $.type),

    block: ($) => seq("{", repeat($._statement), "}"),

    _statement: ($) => choice($.return_statement, $.expression_statement),

    return_statement: ($) => seq("return", optional($._expression), ";"),

    expression_statement: ($) => seq($._expression, ";"),

    _expression: ($) => choice($.number, $.identifier, $.binary_expression),

    binary_expression: ($) =>
      prec.left(
        1,
        seq($._expression, choice("+", "-", "*", "/"), $._expression),
      ),

    type: ($) => $.identifier,

    identifier: ($) => /[a-zA-Z_][a-zA-Z0-9_]*/,

    number: ($) => /\d+/,
  },
});
