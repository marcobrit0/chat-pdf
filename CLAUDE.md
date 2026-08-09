@AGENTS.md

<!-- gbrain-guidance:v1 -->

## GBrain — semantic code & knowledge search

This repo is indexed in **gbrain**, Marco's personal knowledge brain. It auto-syncs
this repo's code and "dreams" over recent session transcripts nightly, so it is the
living memory for cross-repo context — consult it before re-deriving things.

Prefer `gbrain` over plain grep when the question is semantic or you don't yet know
the exact identifier:

- Semantic / intent ("where is X handled?"): `gbrain query "<question>"` or `gbrain search "<terms>"`
- Symbol definitions / references: `gbrain code-def <symbol>` · `gbrain code-refs <symbol>`
- Call graph: `gbrain code-callers <symbol>` · `gbrain code-callees <symbol>`
- Past decisions / plans / retros: `gbrain search "<terms>"`

Use grep for known exact strings, regex, multiline patterns, and file globs.
