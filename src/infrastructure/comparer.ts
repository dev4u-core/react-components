export class Comparer {
    public static readonly Instance: Comparer = new Comparer();

    private static toComparedValue(value: any): any {
        if (typeof value == 'string') {
            return value.toLowerCase();
        }

        return (value === false) ? 1 : ((value === true) ? 2 : value);
    }

    public compare(x, y): number {
        let xValue = Comparer.toComparedValue(x);
        let yValue = Comparer.toComparedValue(y);

        if (xValue > yValue) return 1;
        if (xValue < yValue) return -1;

        return 0;
    }
}