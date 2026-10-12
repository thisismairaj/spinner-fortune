<h1 align="center">spinner-fortune</h1>

<p align="center">
  Replaces the spinner word with a programmer fortune,<br/>
  one picked fresh each session.
</p>

---

## What it does

Claude Code shows a spinner word while it's thinking - "Sauteing...",
"Proofing...", that kind of thing. This swaps that word for a short
programmer fortune instead, picked once when the session starts and held for
the whole session, so it doesn't flicker between words every turn.

```
⠋ Cache invalidation, naming, off-by-one (12s, 300 tokens)
```

18 fortunes, hand-written, nothing generated at runtime, nothing fetched over
the network.

## Install

```
/plugin install spinner-fortune --marketplace thisismairaj/spinner-fortune
```

## How it works

A `session.start` hook picks one random fortune index and writes it to
`$.state`, once, before the first prompt. A `ui.render` hook on the `Spinner`
component reads that value back and rewrites the spinner's `message` field -
the engine still draws its own elapsed-time, token and effort info around it;
only the word changes.

No `$.store`, no cross-session memory - a new fortune every time you start a
session, the same one for every turn inside it.

## Development

Built and iterated inside a live Claude Code session using a dev-mod's hot
reload - see [token-weather](https://github.com/thisismairaj/token-weather)
for more on that workflow. No build step; the hooks module runs directly as
TypeScript.

```bash
claude plugin validate .
```

## License

MIT
