export interface IStyleProvider {
    get<T>(): T;
}

export class StyleProvider implements IStyleProvider {
    public static Instance: IStyleProvider = new StyleProvider();

    // IStyleProvider<T> Members
    public get<T>(): T {
        return null;
    }
}