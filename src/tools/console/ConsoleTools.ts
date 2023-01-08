import { ConsolePlaceTag } from './ConsolePlaceTag';

export class ConsoleTools {
    static log(
        message?: any,
        placeTag?: ConsolePlaceTag,
        ...optionalParams: any[]
    ): void {
        let placeTagString = placeTag ? placeTag.toConsoleFormat() : [];
        if (process.env.NODE_ENV !== 'production')
            console.log(...placeTagString, message, ...optionalParams);
    }

    static warn(
        message?: any,
        placeTag?: ConsolePlaceTag,
        ...optionalParams: any[]
    ): void {
        let placeTagString = placeTag ? placeTag.toConsoleFormat() : [];
        if (process.env.NODE_ENV !== 'production')
            console.warn(...placeTagString, message, ...optionalParams);
    }

    static error(
        message?: any,
        placeTag?: ConsolePlaceTag,
        ...optionalParams: any[]
    ): void {
        let placeTagString = placeTag ? placeTag.toConsoleFormat() : [];
        if (process.env.NODE_ENV !== 'production')
            console.error(...placeTagString, message, ...optionalParams);
    }

    static table(
        data?: any,
        placeTag?: ConsolePlaceTag,
        ...optionalParams: any[]
    ): void {
        let placeTagString = placeTag ? placeTag.toConsoleFormat() : [];
        if (process.env.NODE_ENV !== 'production')
            console.table(...placeTagString, data, ...optionalParams);
    }
}
