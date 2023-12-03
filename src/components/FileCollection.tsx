"use client";

import {FileListResponse, FileModalField} from "file";
import moment from "moment";
import React, {useState} from "react";
import useSWR from "swr";
import DeleteModal from "@/components/DeleteModal";
import DirectoryCreateModal from "@/components/DirectoryCreateModal";
import FileUploadModal from "@/components/FileUploadModal";
import FileDownloadModal from "@/components/FileDownloadModal";
import {DataFetcher} from "@/lib/util";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from '@mui/icons-material/Download';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import {DataGrid, GridColDef, koKR} from "@mui/x-data-grid";
import {GridCallbackDetails} from "@mui/x-data-grid/models/api";
import {GridRowSelectionModel} from "@mui/x-data-grid/models/gridRowSelectionModel";

const FileColumns: Array<GridColDef> = [
    {
        field: "path",
        headerName: "이름",
        minWidth: 150
    },
    {
        field: 'size',
        headerName: "크기",
        valueGetter: (params) => {
            return formatBytes(params.value);
        }
    },
    {
        field: 'type',
        headerName: "타입",
        valueGetter: (params) => {
            return params.value == "file" ? "파일" : "폴더";
        }
    },
    {
        field: 'lastModified',
        headerName: "마지막 수정",
        valueGetter: (params) => {
            return moment.utc(params.value).fromNow();
        }
    }
]

function FileCollection() {
    const [checkedIds, setCheckedIds] = useState<Array<string | number>>([]);
    const [modal, setModal] = useState<FileModalField>({
        directoryCreateOpen: false,
        fileUploadOpen: false,
        fileDownloadOpen: false,
        deleteOpen: false
    })
    const {
        directoryCreateOpen,
        fileUploadOpen,
        fileDownloadOpen,
        deleteOpen
    } = modal;
    const [path, setPath] = useState("/");
    const {
        data,
        isLoading,
        mutate
    } = useSWR<FileListResponse>(
        `/file/list?directory=${path}`,
        DataFetcher
    );
    
    const onRowSelectionModelChange = (model: GridRowSelectionModel, _: GridCallbackDetails) => {
        setCheckedIds(model);
    }
    
    const isDirectory = (id: string | number): boolean => {
        const file = data
            ?.file
            .filter((data) => data.id == id)
            .at(0);
        
        if (!file) {
            return false;
        }
        
        return file.type == "directory";
    }
    
    const changeDirectory = () => {
        const file = data
            ?.file
            .filter((data) => data.id == checkedIds[0])
            .at(0);
        
        if (!file || file.type == "file") {
            return;
        }
        
        setPath(file.id);
    }
    
    const moveTopDirectory = () => {
        const paths = path.split("/");
        const lastDirectory = paths.at(-2);
        setPath(path.replace(`${lastDirectory}/`, ""));
    }
    
    return (
        <Paper
            sx={{
                display: "flex",
                flexDirection: "column",
                p: 1,
                m: 1.5
            }}
        >
            <Stack>
                <PathDisplay
                    path={path}
                />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: {
                            xs: "column", sm: "row"
                        },
                        my: "auto",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            mb: {
                                xs: 0.5, sm: 0
                            }
                        }}
                    >
                        <Button
                            disabled={path == "/"}
                            variant="contained"
                            onClick={moveTopDirectory}
                            sx={{
                                mr: 1
                            }}
                        >
                            상위 폴더로 이동
                        </Button>
                        <Button
                            disabled={checkedIds.length > 1 || !isDirectory(checkedIds[0])}
                            variant="contained"
                            onClick={changeDirectory}
                            sx={{
                                mr: 1
                            }}
                        >
                            해당 폴더로 이동
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            mb: {
                                xs: 0.5, sm: 0
                            }
                        }}
                    >
                        <Button
                            variant="contained"
                            startIcon={<AddIcon/>}
                            onClick={() => setModal((prevState) => ({
                                ...prevState,
                                directoryCreateOpen: true
                            }))}
                            sx={{
                                mr: 1
                            }}
                        >
                            폴더 생성
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon/>}
                            onClick={() => setModal((prevState) => ({
                                ...prevState,
                                fileUploadOpen: true
                            }))}
                            sx={{
                                mr: 1
                            }}
                        >
                            파일 업로드
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            mb: {
                                xs: 0.5, sm: 0
                            }
                        }}
                    >
                        <Button
                            disabled={checkedIds.length == 0}
                            onClick={() => setModal((prevState) => ({
                                ...prevState,
                                fileDownloadOpen: true
                            }))}
                            variant="contained"
                            startIcon={<DownloadIcon/>}
                            sx={{
                                mr: 1
                            }}
                        >
                            파일 다운로드
                        </Button>
                        <Button
                            disabled={checkedIds.length == 0}
                            onClick={() => setModal((prevState) => ({
                                ...prevState,
                                deleteOpen: true
                            }))}
                            variant="contained"
                            startIcon={<DeleteIcon/>}
                        >
                            삭제
                        </Button>
                    </Box>
                </Box>
            </Stack>
            <Divider
                sx={{
                    my: 1
                }}
            />
            <DataGrid
                localeText={koKR.components.MuiDataGrid.defaultProps.localeText}
                columns={FileColumns}
                rows={data?.file ?? []}
                rowCount={data?.length ?? 0}
                loading={isLoading}
                checkboxSelection={true}
                disableRowSelectionOnClick={true}
                onRowSelectionModelChange={onRowSelectionModelChange}
                hideFooter={true}
            />
            <DirectoryCreateModal
                directory={path}
                isOpen={directoryCreateOpen}
                onCancel={() => setModal((prevState) => ({
                    ...prevState,
                    directoryCreateOpen: false
                }))}
                onSubmit={async () => {
                    setModal((prevState) => ({
                        ...prevState,
                        directoryCreateOpen: false
                    }))
                    await mutate();
                }}
            />
            <FileUploadModal
                directory={path}
                isOpen={fileUploadOpen}
                onCancel={() => setModal((prevState) => ({
                    ...prevState,
                    fileUploadOpen: false
                }))}
                onSubmit={async () => {
                    setModal((prevState) => ({
                        ...prevState,
                        fileUploadOpen: false
                    }))
                    await mutate();
                }}
            />
            <FileDownloadModal
                ids={checkedIds}
                isOpen={fileDownloadOpen}
                onCancel={() => setModal((prevState) => ({
                    ...prevState,
                    fileDownloadOpen: false
                }))}
                onSubmit={async () => {
                    setModal((prevState) => ({
                        ...prevState,
                        fileDownloadOpen: false
                    }));
                }}
            />
            <DeleteModal
                ids={checkedIds}
                isOpen={deleteOpen}
                onCancel={() => setModal((prevState) => ({
                    ...prevState,
                    deleteOpen: false
                }))}
                onSubmit={async () => {
                    setModal((prevState) => ({
                        ...prevState,
                        deleteOpen: false
                    }));
                    await mutate();
                }}
            />
        </Paper>
    )
}

export default FileCollection;

interface PathDisplayProps {
    path: string;
}

function PathDisplay({path}: PathDisplayProps) {
    return (
        <Typography variant="h4">현재 경로: {path}</Typography>
    )
}

function formatBytes(bytes: number, decimals = 2): string {
    if (!+bytes) return ' - '
    
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
