import Puzzle from '../../types/AbstractPuzzle';

function check(t: number, c: number, record: number) {
    const q = (t-c)*c
    return q > record
}

function solve(t: number, record: number): number {
    const maxC = t/2
    let count: number = 0
    for (let c = Math.floor(maxC); check(t, c, record); c--, count++) {}
    for (let c = Math.ceil(maxC) + (maxC % 1 == 0 ? 1 : 0); check(t, c, record); c++, count++) {}
    return count
}

function solveAll(times: number[], distances: number[]) {
    return times.reduce((acc, time, i) => {
        const out = solve(time, distances[i])
        console.log(out)
        return acc * out
    }, 1)
}


export default class ConcretePuzzle extends Puzzle {
    public solveFirst(): string {
	const inp = this.input.trim()
	const times = inp.match(/Time:\s*((\d+\s*)+)/)![1].trim().split(' ').filter(Boolean).map(Number)
	const distances = inp.match(/Distance:\s*((\d+\s*)+)/)![1].trim().split(' ').filter(Boolean).map(Number)
	return solveAll(times, distances).toString()
    }

    public getFirstExpectedResult(): string {
	return '2756160'
    }

    public solveSecond(): string {
	const inp = this.input.trim()
	const times = [inp.match(/Time:\s*((\d+\s*)+)/)![1].trim().replace(/ /g, '')].map(Number)
	const distances = [inp.match(/Distance:\s*((\d+\s*)+)/)![1].trim().replace(/ /g, '')].map(Number)
	return solveAll(times, distances).toString()
    }

    public getSecondExpectedResult(): string {
	return '34788142'
    }
}
