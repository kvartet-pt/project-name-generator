#! /usr/bin/env node
import generate, {Options} from "./generator";

const args = process.argv.slice(2); // Remove the first two elements

let options: Options = {
    words: 2,
    number: false,
    alliterative: false
};

args.forEach((arg, index) => {
    switch (arg) {
        case '-w':
        case '--words':
            options.words = parseInt(args[index + 1]);
            break;
        case '-n':
        case '--numbers':
            options.number = true;
            break;
        case '-a':
        case '--alliterative':
            options.alliterative = true;
            break;
        case '-l':
        case '--first-letter':
            options.firstLetter = args[index + 1];
            break;
        case '-b':
        case '--blocklist':
            options.blocklist = args[index + 1].split(',');
            break;
    }
});

if (args.includes('-h') || args.includes('--help')) {
    help();
} else  {
    const srvName = generate(options);
    if (args.includes('-f') || args.includes('--format')) {
        const outputType = args[args.indexOf('-f') !== -1 ? args.indexOf('-o') : args.indexOf('--format') + 1];
        switch (outputType) {
            case 'dashed':
                console.log(srvName.dashed);
                break;
            case 'raw':
                console.log(srvName.raw);
                break;
            case 'spaced':
                console.log(srvName.spaced);
                break;
            default:
                console.log(srvName);
                break;
        }
    } else {
        console.log(srvName);
    }
}

function help() {
    const helpText = `
   _____            _   __                     ______         
  / ___/______   __/ | / /___ _____ ___  ___  / ____/__  ____ 
  \\__ \\/ ___/ | / /  |/ / __ \`/ __ \`__ \\/ _ \\/ / __/ _ \\/ __ \\
 ___/ / /   | |/ / /|  / /_/ / / / / / /  __/ /_/ /  __/ / / /
/____/_/    |___/_/ |_/\\__,_/_/ /_/ /_/\\___/\\____/\\___/_/ /_/ 
                                                              


Usage: server-name-gen [options]


Options:

  -w, --words [num]         number of words [2]
  -n, --numbers             suffix with a random number
  -a, --alliterative        use alliterative
  -f, --format [format]     output format type [raw|dashed|spaced]
  -l, --first-letter [s]    first letter of the first word [single letter]
  -b, --blocklist [words]   comma separated list of words to exclude
  -h, --help                output usage information
`

    console.log(helpText);

}