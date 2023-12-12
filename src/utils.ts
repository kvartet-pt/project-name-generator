

export function sample<T>(array: T[]): T | undefined {
    if (array.length === 0) {
        return undefined;
    }
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

export function random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function filter<T>(array: T[], predicate: (value: T) => boolean): T[] {
    return array.filter(predicate);
}

export function times(n: number, iteratee: (i: number) => void): void {
    for (let i = 0; i < n; i++) {
        iteratee(i);
    }
}

export function merge<T, U>(object1: T, object2: U): T & U {
    return { ...object1, ...object2 };
}

export function includes<T>(array: T[], value: T): boolean {
    if (!Array.isArray(array)) {
        throw new Error('The first argument to includes must be an array');
    }
    return array.indexOf(value) >= 0;
}