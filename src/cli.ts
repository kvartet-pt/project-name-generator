#!/usr/bin/env node

import generate, {Options} from './generator';
import {Command} from "commander";

const program = new Command();

program
    .version('1.0.0')
    .option('-w, --words [num]', 'number of words [2]', "2")
    .option('-n, --numbers', 'use numbers')
    .option('-a, --alliterative', 'use alliterative')
    .option('-o, --output [output]', 'output type [raw|dashed|spaced]', /^(raw|dashed|spaced)$/i)
    .parse(process.argv);


let options: Options = {words: program.words, number: program.numbers, alliterative: program.alliterative};
let projectName = generate(options);

if (program.output == "dashed"){
    console.log(projectName.dashed);
} else if (program.output == "raw") {
    console.log(projectName.raw);
} else if (program.output == "spaced") {
    console.log(projectName.spaced);
} else {
    console.log(projectName);
}