module "console/farm/plant/field" {
    interface PlantField {
        displayName: string;
        thumbnail: string | null;
        enable: boolean;
        growthDay: number;
    }
}
