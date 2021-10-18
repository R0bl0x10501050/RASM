# RASM

Create short Roblox scripts with a few words.

## Usage

### Command Line

Run `rasm --help` for information on the commands.

### In The File

1. Install RASM

Run `npm install rasm@latest` in the terminal

2. Import RASM

```js
// CommonJS

const RASM = require('rasm');
const rasm = new RASM();

// ES6

import RASM from 'rasm';
const rasm = new RASM();
```

3. Use RASM

```js
let convert_str = `
SET a 50;
PRINT a;
`
console.log(RASM.luau(convert_str))
```

And that's it! You're all set.