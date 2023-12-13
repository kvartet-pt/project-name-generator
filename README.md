# Server Name Gen

Generate quirky names like *hilarious-curve*, *daily-sunny-stone*, *sparkling-edge-108* to use wherever you need a random but memorable name.

Useful for object names, temp folders, passwords, project names, server names, unique ids etc..

```
       ╭──────────╮                  ╭────────────╮
       │  dawdk  ░│                  │  wild-pot  │
       ╰──────────╯                  ╰────────────╯
╭──────────────────────╮        ╭──────────────────────╮
│ ◎ ○ ○ ░░░░░░░░░░░░░░░│        │ ◎ ○ ○ ░░░░░░░░░░░░░░░│
├──────────────────────┤        ├──────────────────────┤
│                      │        │                      │
│                      │        │      ◠   ◡    ◠      │
│                      │   VS   │                      │
│                      │        │                      │
│      ○       ○       │        │                      │
│          ◠           │        │                      │
└──────────────────────┘        └──────────────────────┘

```
*true-to-life representation representation of your server feels*

---

*This is TypeScript rewrite of now deprecated [project-name-generator](https://github.com/aceakash/project-name-generator) library, with some improvements (no external lib dependencies, additional options)*

---

## Install
*npm*

`npm install server-name-gen --save`

*bun*

`bun add server-name-gen`



## Quick Start
```typescript
import generate from 'server-name-gen';

generate().dashed; // "interesting-umbrella"

generate().spaced; // "maniacal dinosaurs"

generate().raw; // ["tricky", "cactus"]

generate({ number: true }).dashed; // 'composed-invention-4796'

generate({ words: 4 }).raw; // ["gorgeous", "productive", "plum", "friend"]

generate({ words: 4, number: true }).dashed; // 'domineering-tall-slim-rock-507'

generate({ words: 2, alliterative: true }).spaced; // 'major metal'

generate({ firstLetter: 'a' }).spaced; // 'average fox'

generate({ firstLetter: 'a', alliterative: true }).spaced; // 'amazing apple'

```

## Quickstart CLI
This package contains a simple cli. You can pull in the package globally using npm
`npm install -g server-name-gen`

Call from your command line
```
$ server-name-gen
{
  raw: [ "heavy", "rainstorm" ],
  dashed: "heavy-rainstorm",
  spaced: "heavy rainstorm",
}
```

For CLI options 
```
server-name-gen -h

Usage: server-name-gen [options]


Options:

  -w, --words [num]         number of words [2]
  -n, --numbers             suffix with a random number
  -a, --alliterative        use alliterative
  -f, --format [format]     output format type [raw|dashed|spaced]
  -l, --first-letter [s]    first letter of the first word [single letter]
  -b, --blocklist [words]   comma separated list of words to exclude
  -h, --help                output usage information
```

## API
The module returns a single function, `generate(options)`

Calling `generate()` with no arguments will return an object:
```typescript
{
    raw: [ "marked", "north" ],
    dashed: "marked-north",
    spaced: "marked north",
}
```

The `options` argument object can have properties

* **words** (number) - Number of words generated (excluding number). All words will be adjectives, except the last one which will be a noun. Defaults to **2**.
* **number** (boolean) - Whether a numeric suffix is generated or not. The number is between 1 - 9999, both inclusive. Defaults to **false**.
* **alliterative** (boolean) - Whether to output words beginning with the same letter or not. Defaults to **false**.
* **firstLetter** (string) - First letter of the first word. Defaults to a random letter.
* **blocklist** (string[]) - Array of words to exclude from the generated name. Defaults to **[]**.

`generate({ words: 3 })` will return:
```typescript
{
    raw: [ "smart", "abrupt", "weather" ],
    dashed: "smart-abrupt-weather",
    spaced: "smart abrupt weather",
}
```

`generate({ words: 5, number: true })` will return:
```typescript
{
    raw: [ "fabulous", "potent", "demonic", "confused", "gate", 4955 ],
    dashed: "fabulous-potent-demonic-confused-gate-4955",
    spaced: "fabulous potent demonic confused gate 4955",
}
```

`generate({ words: 2, number: false, alliterative: true })` will return:
```typescript
{
    raw: [ "somber", "snails" ],
    dashed: "somber-snails",
    spaced: "somber snails",
}
```

## Tests
To run tests locally:
```
bun install

bun test
```
