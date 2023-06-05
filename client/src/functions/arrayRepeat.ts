function arrayRepeat <TArray>(array: TArray[], n: number): TArray[] {
    return Array.from({ length: array.length * n }, (_, idx) => array[idx% array.length]);
}

export { arrayRepeat };
