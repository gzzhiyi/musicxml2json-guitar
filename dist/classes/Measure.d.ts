import { Harmony, MeasureXML, Metronome, Note, Time, TimeSignature } from '@/types';
type PropsType = {
    beats: number;
    beatType: number;
    beatUnit: number;
    bpm: number;
    id: string;
    isLast: boolean;
    speed: number;
    startTime: number;
    xmlData: MeasureXML;
};
export default class Measure {
    capo: number;
    harmonies: Harmony[];
    metronome: Metronome;
    notes: Note[];
    number: string;
    id: string;
    isLast: boolean;
    time: Time | null;
    timeSignature: TimeSignature;
    private speed;
    private startTime;
    constructor({ id, xmlData, startTime, beatUnit, bpm, beats, beatType, isLast, speed }: PropsType);
    private getCapo;
    private getHarmonies;
    private getNotes;
    private addNoteToList;
    private getNumber;
    private isChord;
    private calNoteDuration;
}
export {};
