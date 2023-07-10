function range (start: number, stop: number, step: number): number[] {
    return Array.from({ length: (stop-start) / step + 1 }, (_, idx) => start + idx * step);
}

export { range };
