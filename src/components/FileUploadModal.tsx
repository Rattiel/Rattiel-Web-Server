"use client";

import {Auth} from "aws-amplify";
import React, {useState} from "react";
import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

interface FileUploadModalProps {
    directory: string;
    isOpen: boolean;
    onCancel: () => void;
    onSubmit: () => void;
}

function FileUploadModal({directory, isOpen, onCancel, onSubmit}: FileUploadModalProps) {
    const [file, setFile] = useState<File | null>(null);
    
    const onClickSave = async () => {
        if (file == null) return;
        const session = await Auth.currentSession();
        const credentials = await Auth.currentUserCredentials();
        const client = new S3Client({
            region: "ap-northeast-2",
            credentials: credentials
        })
        const user = session.getIdToken().payload['sub'];
        const blob =  new Blob([file], { type: file.type });
        const command = new PutObjectCommand({
            Bucket: "rattiel-storage",
            Key: `${user}${directory}${file.name}`,
            Body: blob,
            ContentType: blob.type,
            ContentLength: blob.size
        })
        await client.send(command);
        onSubmit();
        setFile(null);
    }
    
    const onSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {files} = e.currentTarget;
        if (files == null || files.length != 1) return;
        const file = files[0];
        setFile(file);
    }
    
    const onDelete = () => {
        setFile(null);
    }
    
    return (
        <Dialog
            open={isOpen}
            onClose={onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"파일 업로드"}
            </DialogTitle>
            <Divider/>
            <DialogContent>
                {file == null && (
                    <>
                        <input
                            color="primary"
                            type="file"
                            id="icon-button-file"
                            onChange={onSelect}
                            style={{display: 'none',}}
                        />
                        <label htmlFor="icon-button-file">
                            <Button
                                variant="contained"
                                component="span"
                                size="large"
                                color="primary"
                                startIcon={<AddIcon/>}
                            >
                                파일 선택
                            </Button>
                        </label>
                    
                    </>
                )}
                {file != null && (
                    <Button
                        variant="contained"
                        component="span"
                        size="large"
                        color="primary"
                        startIcon={<DeleteIcon/>}
                        onClick={onDelete}
                        sx={{
                            my: "auto",
                            ml: 2
                        }}
                    >
                        파일 삭제
                    </Button>
                )}
            </DialogContent>
            <Divider/>
            <DialogActions>
                <Button onClick={onCancel}>취소</Button>
                <Button disabled={file == null} onClick={onClickSave} autoFocus>업로드</Button>
            </DialogActions>
        </Dialog>
    )
}

export default FileUploadModal;
