import nouns from './dictionaries/nouns.json';
import adjectives from './dictionaries/adjectives.json';
import {filter, merge, random, sample, times} from './utils';



export interface Options {
  number: boolean;
  words: number;
  alliterative: boolean;
}

function generate(options?: Partial<Options>) {
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
  times(options.words - 1, function () {
    if (options.alliterative && raw.length) {
      const adjectiveSample = sample(getAlliterativeMatches(adjectives, raw[0].toString().substring(0, 1)));
      if (adjectiveSample !== undefined) {
        raw.push(adjectiveSample);
      }
    } else {
      const adjective = sample(adjectives);
      if (adjective !== undefined) {
        raw.push(adjective.toLowerCase());
      }
    }
  });

  if (options.alliterative) {
    const nounSample = sample(getAlliterativeMatches(nouns, raw[0].toString().substring(0, 1)));
    if (nounSample !== undefined) {
      raw.push(nounSample);
    }
  } else {
    const noun = sample(nouns);
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

export default generate;