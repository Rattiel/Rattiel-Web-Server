module "file" {
    interface File {
        id: string;
        path: string;
        name: string;
        size: number;
        type: "file" | "directory";
        lastModified: string;
    }
    
    interface FileListResponse {
        file: Array<File>;
        length: number;
    }
    
    interface FileModalField {
        directoryCreateOpen: boolean;
        fileUploadOpen: boolean;
        fileDownloadOpen: boolean;
        deleteOpen: boolean;
    }
}
