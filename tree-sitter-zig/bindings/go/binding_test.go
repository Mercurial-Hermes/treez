package tree_sitter_treez_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_treez "github.com/mercurial-hermes/treez/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_treez.Language())
	if language == nil {
		t.Errorf("Error loading Treez grammar")
	}
}
