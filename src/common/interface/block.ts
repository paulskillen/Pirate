export interface IBlockComponentBaseProps<T extends IBlockBaseProps<{}>> {
    blockData: T;
    className?: string;
}

export interface IBlockBaseProps<T> {
    title?: string;
    subTitle?: string;
    description?: string;
    imageDesktop?: string;
    imageMobile?: string;
    dataSource?: T[];
    [key: string]: any;
}
