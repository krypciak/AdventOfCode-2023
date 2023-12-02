import Puzzle from '../../types/AbstractPuzzle';

function getArr(input: string): number[][][] {
    const rounds: number[][][] = input.trim().split('\n')
        .map(e => e.split(';').map(e => e.match(/\d+ (red|blue|green)/g).map(e => e.toString())
            .reduce((acc: [number, number, number], cv: string) => {
                const sp: [string, string] = cv.split(' ') as [string, string]
                const v: number = parseInt(sp[0])
                const c = sp[1] as 'red' | 'green' | 'blue'
                acc[c == 'red' ? 0 : c == 'green' ? 1 : c == 'blue' ? 2 : 0] += v
                return acc
            }, [0, 0, 0])))

    return rounds
}

export default class ConcretePuzzle extends Puzzle {
    public solveFirst(): string {
        const rounds = getArr(this.input)
        const req: [number, number, number] = [12, 13, 14] as const
        const res: number = rounds.reduce((acc: number, cv: number[][], id: number) => {
            let possible: boolean = true
            for (const g of cv) {
                for (let i = 0; i < req.length; i++) {
                    if (g[i] > req[i]) {
                        possible = false
                        break
                    }
                }
            }
            if (possible) { acc += id + 1 }
            return acc
        }, 0)
        return res.toString()
    }

    public getFirstExpectedResult(): string { return 'day 1 solution 1'; }

    public solveSecond(): string {
        const rounds = getArr(this.input)
        const res: number = rounds.reduce((acc: number, cv: number[][]) => {
            const max: [number, number, number] = [0, 0, 0]
            for (const g of cv) {
                max[0] = Math.max(max[0], g[0])
                max[1] = Math.max(max[1], g[1])
                max[2] = Math.max(max[2], g[2])
            }
            const power = max[0] * max[1] * max[2]
            return acc + power
        }, 0)
        return res.toString()
    }

    public getSecondExpectedResult(): string { return 'day 1 solution 2'; }
}
