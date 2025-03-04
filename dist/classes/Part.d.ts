import MeasureClass from '@/classes/Measure';
import { MeasureXML } from '@/types';
type PropsType = {
    measures: MeasureXML[];
    speed?: number;
};
export default class Part {
    duration: number;
    measures: MeasureClass[];
    private beats;
    private beatType;
    private beatUnit;
    private bpm;
    constructor({ measures, speed }: PropsType);
    private getMetronome;
    private getTimeSignature;
    private setGlobalMetronome;
    private setGlobalTimeSignature;
}
export {};
