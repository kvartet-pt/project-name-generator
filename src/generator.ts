import nouns from './dictionaries/nouns.json';
import adjectives from './dictionaries/adjectives.json';
import {filter, merge, random, sample, times} from './utils';


export interface Options {
  number: boolean;
  words: number;
  alliterative: boolean;
  firstLetter?: string;
  blocklist?: string[];
}

interface Result {
    raw: (string | number)[];
    dashed: string;
    spaced: string;
}

function generate(options?: Partial<Options>) :Result {
  const defaults: Options = {
    number: false,
    words: 2,
    alliterative: false,
  };
  const opt = merge(defaults, options || {});
  const raw = getRawProjName(opt);

  return {
    raw: raw,
    dashed: raw.join('-'),
    spaced: raw.join(' ')
  };
}

function getRawProjName(options: Options) {

  const raw: (string | number)[] = [];
  const adj = blocklistFilter(options.blocklist || [], adjectives);
  const nou = blocklistFilter(options.blocklist || [], nouns);

  times(options.words - 1, function () {
    if (options.alliterative && raw.length) {
      const adjectiveSample = sample(getAlliterativeMatches(adj, raw[0].toString().substring(0, 1)));
      if (adjectiveSample !== undefined) {
        raw.push(adjectiveSample);
      }
    } else {
      let adjectiveSample;
      if(options.firstLetter && raw.length === 0) {
        adjectiveSample = sample(filter(adj, function(elm) { return elm.substring(0, 1).toLowerCase() === options.firstLetter; }));
      } else {
        adjectiveSample = sample(adj);
      }
      if (adjectiveSample !== undefined) {
        raw.push(adjectiveSample.toLowerCase());
      }
    }
  });

  if (options.alliterative) {
    const nounSample = sample(getAlliterativeMatches(nou, raw[0].toString().substring(0, 1)));
    if (nounSample !== undefined) {
      raw.push(nounSample);
    }
  } else {
    const noun = sample(nou);
    if (noun !== undefined) {
      raw.push(noun.toLowerCase());
    }
  }

  if (options.number) {
    raw.push(random(1, 9999));
  }
  return raw;
}

function getAlliterativeMatches(arr: string[], letter: string) {
  const check = letter.toLowerCase();
  return filter(arr, function(elm) { return elm.substring(0, 1).toLowerCase() === check; });
}

export function blocklistFilter(blocklist: string[], raw: string[]) {
  return filter(raw, function(elm) { return blocklist.indexOf(elm.toString()) === -1; });
}

export default generate;