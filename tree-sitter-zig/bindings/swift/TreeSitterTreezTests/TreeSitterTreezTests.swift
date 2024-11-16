import XCTest
import SwiftTreeSitter
import TreeSitterTreez

final class TreeSitterTreezTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_treez())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Treez grammar")
    }
}
