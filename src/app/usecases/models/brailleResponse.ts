export interface BrailleResponse {
    data: BrailleData;
    message: string;
    status: number;
}

interface BrailleData {
    braille: string;
    raw_text: string;
}