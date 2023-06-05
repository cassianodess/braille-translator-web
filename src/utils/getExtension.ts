export function getExtension(path: string): string {

    let extension = path.split(".")[1];

    return extension !== "txt" && extension !== "docx" && extension !== "pdf" ? "image" : extension;
}