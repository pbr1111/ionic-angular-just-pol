export class ArrayHelper {

    public static sort<T>(array: T[], itemValue: (item: T) => any): T[] {
        return array.sort((item1, item2) => {
            const propertyItem1: T = itemValue(item1);
            const propertyItem2: T = itemValue(item2);
            if (propertyItem1 > propertyItem2) {
                return 1;
            }
            if (propertyItem1 < propertyItem2) {
                return -1;
            }
            return 0;
        });
    }
    
}