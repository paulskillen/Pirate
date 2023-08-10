export interface IBlockComponentBaseProps<T extends IBlockBaseProps<{}>> {
    blockData: T;
    className?: string;
}

export interface IBlockBaseProps<T> {
    title?: string;
    subTitle?: string;
    dataSource?: T[];
}
