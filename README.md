# Server Name Gen

Generate quirky names like *spiffy-waterfall*, *sassy-bread*, *mature-dew-8239* to use wherever you need a random but memorable name.

Useful for object names, temp folders, passwords, project names, unique ids etc

## Install
*npm*

`npm install server-name-gen --save`

*bun*

`bun add server-name-gen`



## Quick Start
```typescript
import generate from 'server-name-gen';

generate().dashed; // 'uptight-guitar'

generate().spaced; // 'grandiose clam'

generate().raw; // ['deluxe', 'grandmother']

generate({ number: true }).dashed; // 'disgraceful-temper-7794'

generate({ words: 4 }).raw; // ['tiny', 'crabby', 'wired', 'quicksand']

generate({ words: 4, number: true }).dashed; // 'breakable-judicious-luxuriant-tax-3931'

generate({ words: 2, alliterative: true }).spaced; // 'elegant experience'

generate({ firstLetter: 'a' }).spaced; // 'average fox'

generate({ firstLetter: 'a', alliterative: true }).spaced; // 'amazing apple'

```

## Quickstart CLI
This package contains a simple cli. You can pull in the package globally using npm
`npm install -g server-name-gen`

Call from your command line
```
$ project-name-generator
{ raw: [ 'spry', 'bath' ],
  dashed: 'spry-bath',
  spaced: 'spry bath' }
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
  -h, --help                output usage information
```

## API
The module returns a single function, `generate(options)`

Calling `generate()` with no arguments will return an object:
```typescript
{
    raw: ['whispering', 'valley'],
    dashed: 'whispering-valley',
    spaced: 'whispering valley'
}
```

The `options` argument object can have properties

* **words** (number) - Number of words generated (excluding number). All words will be adjectives, except the last one which will be a noun. Defaults to **2**.
* **number** (boolean) - Whether a numeric suffix is generated or not. The number is between 1 - 9999, both inclusive. Defaults to **false**.
* **alliterative** (boolean) - Whether to output words beginning with the same letter or not. Defaults to **false**.

`generate({ words: 3 })` will return:
```typescript
{
    raw: ['harmonious', 'endurable', 'substance'],
    dashed: 'harmonious-endurable-substance',
    spaced: 'harmonious endurable substance'
}
```

`generate({ words: 5, number: true })` will return:
```typescript
{
  raw: [ 'exciting', 'cooperative', 'legal', 'lackadaisical', 'blood', 4099 ],
  dashed: 'exciting-cooperative-legal-lackadaisical-blood-4099',
  spaced: 'exciting cooperative legal lackadaisical blood 4099'
}
```

`generate({ words: 2, number: false, alliterative: true })` will return:
```typescript
{
  raw: [ 'elegant', 'experience' ],
  dashed: 'elegant-experience',
  spaced: 'elegant experience'
}
```

## Tests
To run tests locally:
```
bun install

bun test
```

## Disclaimer

The original author of this package has discontinued support.

This fork is to keep the package alive and up to date and provide much needed updates.
