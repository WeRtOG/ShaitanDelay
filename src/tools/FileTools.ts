export enum SimpleFileType {
    Unknown = 'unknown',
    Binary = 'binary',
    Archive = 'archive',
    RichText = 'rich-text',
    Spreadsheet = 'spreadsheet',
    Presentation = 'presentation',
    Code = 'code',
    PDF = 'pdf',
    Audio = 'audio',
    Font = 'font',
    Image = 'image',
    Text = 'text',
    WebPage = 'web-page',
    Video = 'video',
}

export class FileTools {
    static getSimpleFileTypeBy(mime: string): SimpleFileType {
        let result = SimpleFileType.Unknown;

        let mimeParts = mime.split('/');
        let mimeType = mimeParts[0];
        let mimeSubtype = mimeParts[1];

        switch (mimeType) {
            case 'application':
                result = SimpleFileType.Binary;

                switch (mimeSubtype) {
                    case 'x-bzip':
                    case 'x-bzip2':
                    case 'gzip':
                    case 'vnd.rar':
                    case 'x-tar':
                    case 'zip':
                    case 'x-zip-compressed':
                    case 'x-7z-compressed':
                        result = SimpleFileType.Archive;
                        break;

                    case 'x-abiword':
                    case 'msword':
                    case 'vnd.openxmlformats-officedocument.wordprocessingml.document':
                    case 'vnd.oasis.opendocument.text':
                    case 'rtf':
                        result = SimpleFileType.RichText;
                        break;

                    case 'vnd.oasis.opendocument.spreadsheet':
                    case 'vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                    case 'vnd.ms-excel':
                        result = SimpleFileType.Spreadsheet;
                        break;

                    case 'vnd.oasis.opendocument.presentation':
                    case 'vnd.ms-powerpoint':
                    case 'vnd.openxmlformats-officedocument.presentationml.presentation':
                        result = SimpleFileType.Presentation;
                        break;

                    case 'json':
                    case 'ld+json':
                    case 'xhtml+xml':
                    case 'vnd.mozilla.xul+xml':
                    case 'x-httpd-php':
                    case 'xml':
                        result = SimpleFileType.Code;
                        break;

                    case 'pdf':
                        result = SimpleFileType.PDF;
                        break;
                }
                break;

            case 'audio':
                result = SimpleFileType.Audio;
                break;

            case 'font':
                result = SimpleFileType.Font;
                break;

            case 'image':
                result = SimpleFileType.Image;
                break;

            case 'model':
                result = SimpleFileType.Binary;
                break;

            case 'text':
                result = SimpleFileType.Text;

                switch (mimeSubtype) {
                    case 'csv':
                        result = SimpleFileType.Spreadsheet;
                        break;

                    case 'xml':
                        result = SimpleFileType.Code;
                        break;

                    case 'html':
                        result = SimpleFileType.WebPage;
                        break;
                }
                break;

            case 'video':
                result = SimpleFileType.Video;
        }

        return result;
    }

    static getIconByFileType(
        type: SimpleFileType,
        fill: boolean = false
    ): string {
        let result = 'file-earmark';

        switch (type) {
            case SimpleFileType.Binary:
                result = 'file-earmark-binary';
                break;

            case SimpleFileType.Archive:
                result = 'file-earmark-zip';
                break;

            case SimpleFileType.RichText:
                result = 'file-earmark-richtext';
                break;

            case SimpleFileType.Spreadsheet:
                result = 'file-earmark-spreadsheet';
                break;

            case SimpleFileType.Presentation:
                result = 'file-earmark-slides';
                break;

            case SimpleFileType.Code:
                result = 'file-earmark-code';
                break;

            case SimpleFileType.PDF:
                result = 'file-earmark-pdf';
                break;

            case SimpleFileType.Audio:
                result = 'file-earmark-music';
                break;

            case SimpleFileType.Font:
                result = 'file-earmark-font';
                break;

            case SimpleFileType.Image:
                result = 'file-earmark-image';
                break;

            case SimpleFileType.Text:
                result = 'file-earmark-text';
                break;

            case SimpleFileType.WebPage:
                result = 'file-earmark-post';
                break;

            case SimpleFileType.Video:
                result = 'file-earmark-play';
                break;
        }

        return result + (fill ? '-fill' : '');
    }

    static getTypeNameByType(type: SimpleFileType): string {
        let result = 'Unknown';

        switch (type) {
            case SimpleFileType.Binary:
                result = 'Binary';
                break;

            case SimpleFileType.Archive:
                result = 'Archive';
                break;

            case SimpleFileType.RichText:
                result = 'RichText';
                break;

            case SimpleFileType.Spreadsheet:
                result = 'Spreadsheet';
                break;

            case SimpleFileType.Presentation:
                result = 'Presentation';
                break;

            case SimpleFileType.Code:
                result = 'Code';
                break;

            case SimpleFileType.PDF:
                result = 'PDF';
                break;

            case SimpleFileType.Audio:
                result = 'Audio';
                break;

            case SimpleFileType.Font:
                result = 'Font';
                break;

            case SimpleFileType.Image:
                result = 'Image';
                break;

            case SimpleFileType.Text:
                result = 'Text';
                break;

            case SimpleFileType.WebPage:
                result = 'Web page';
                break;

            case SimpleFileType.Video:
                result = 'Video';
                break;
        }

        return result;
    }

    static getFileExtension(filename: string): string | null {
        return filename.split('.').pop() ?? null;
    }

    static getIconByMime(mime: string, fill: boolean = false) {
        let type = FileTools.getSimpleFileTypeBy(mime);

        return this.getIconByFileType(type, fill);
    }
}
