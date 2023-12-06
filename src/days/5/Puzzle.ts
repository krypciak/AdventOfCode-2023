import Puzzle from '../../types/AbstractPuzzle';


interface InputMapping {
    from: number
    range: number
    to: number
}

export default class ConcretePuzzle extends Puzzle {
    public solveFirst(): string {
        const inp: string = this.input.trim()

        const mapNames = [
            'seed-to-soil',
            'soil-to-fertilizer',
            'fertilizer-to-water',
            'water-to-light',
            'light-to-temperature',
            'temperature-to-humidity',
            'humidity-to-location'
        ] as const

        const maps: InputMapping[][] = mapNames.map(name =>
            inp.match(`${name} map:\n((\\d+ \\d+ \\d+\n?)+)`)[1]
                .trim().split('\n').map((e: string) => {
                    const [to, from, range] = e.split(' ').map(Number)
                    return { from, to, range }
                }))

        function forwardNumber(mapI: number, v: number): number {
            const me: InputMapping[] = maps[mapI]
            for (const e of me) {
                if (v >= e.from && v <= e.from + e.range - 1) {
                    return v - e.from + e.to
                }
            }
            return v
        }

        const seeds = inp.match(/seeds: ((\d+ ?)+)/)[1].split(' ').map(Number)

        const out = seeds.reduce((low: number, seed: number) => Math.min(mapNames.reduce((acc: number, _: string, i: number) => forwardNumber(i, acc), seed), low))

        return out.toString()
    }

    public getFirstExpectedResult(): string {
        return '226172555'
    }

    public solveSecond(): string {
        const inp: string = this.input.trim()

        const mapNames = [
            'seed-to-soil',
            'soil-to-fertilizer',
            'fertilizer-to-water',
            'water-to-light',
            'light-to-temperature',
            'temperature-to-humidity',
            'humidity-to-location'
        ] as const

        const maps: [number, number, number][][] = mapNames.map(name =>
            inp.match(`${name} map:\n((\\d+ \\d+ \\d+\n?)+)`)[1]
                .trim().split('\n').map((e: string) => {
                    return e.split(' ').map(Number) as [number, number, number]
                }))
        // console.log(maps)

        function forwardNumber(mapI: number, v: number): number {
            for (const e of maps[mapI]) {
                if (v >= e[1] && v <= e[1] + e[2] - 1) {
                    return v - e[1] + e[0]
                }
            }
            return v
        }

        function fullForwardNumber(seed: number): number {
            let acc = seed
            const afterValues: number[] = []
            for (let i = 0; i < mapNames.length; i++) {
                acc = forwardNumber(i, acc)
                afterValues.push(acc)
            }
            return acc
        }

        const seeds = inp.match(/seeds: ((\d+ ?)+)/)[1].split(' ').map(Number)
        // console.log(seeds)

        let low = 10000000000000
        for (let i = 0; i < mapNames.length; i += 2) {
            const from = seeds[i], to = from + seeds[i + 1]
            for (let x = from; x < to; x++) {
                low = Math.min(fullForwardNumber(x), low)
            }
            console.log(low)
        }
        // const low = seeds.reduce((low: number, seed: number) => Math.min(low, fullForwardNumber(seed)))

        return low.toString()
    }

    public getSecondExpectedResult(): string {
        return 'day 1 solution 2';
    }
}

import * as fs from 'fs'
const a = new ConcretePuzzle()
a.setInput(fs.readFileSync('./input.txt').toString())
const res = a.solveSecond()
console.log(res)
