module "console/util" {
    interface ImageData {
        url: string;
        key: string;
    }
    
    interface ImageResponse<T> {
        image: T;
    }
}
