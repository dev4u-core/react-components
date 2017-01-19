export class ClassNameGenerator {
    private readonly _byKey: { [key: string]: string } = {};

    public static readonly instance: ClassNameGenerator = new ClassNameGenerator();

    private constructor() {  }

    public generate(): string {
        return '--' + ('0000' + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4);
    }

    public generateByKey(key: string): string {
        let result = this._byKey[key];

        if (!result) {
            result = this.generate();
            this._byKey[key] = result;
        }

        return result;
    }
}