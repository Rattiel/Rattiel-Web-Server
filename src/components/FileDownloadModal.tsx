"use client";

import {Auth} from "aws-amplify";
import React, {useRef} from "react";
import {GetObjectCommand, S3Client} from "@aws-sdk/client-s3";
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from "@mui/material/Divider";

interface FileDownloadModalProps {
    ids: Array<any>;
    isOpen: boolean;
    onCancel: () => void;
    onSubmit: () => void;
}

function FileDownloadModal({ids, isOpen, onCancel, onSubmit}: FileDownloadModalProps) {
    const downloadLink = useRef<HTMLAnchorElement | null>(null);
    
    const onClickSave = async () => {
        const session = await Auth.currentSession();
        const credentials = await Auth.currentUserCredentials();
        const client = new S3Client({
            region: "ap-northeast-2",
            credentials: credentials
        })
        const user = session.getIdToken().payload['sub'];
        if (!downloadLink.current) return;
        for (const id of ids) {
            const command = new GetObjectCommand({
                Bucket: "rattiel-storage",
                Key: `${user}${id}`
            })
            const response = await client.send(command);
            if (response.Body) {
                let blob =  new Blob([await response.Body.transformToByteArray()], {
                    type: response.ContentType,
                });
                downloadLink.current.href = window.URL.createObjectURL(blob);
                downloadLink.current.download = id;
                downloadLink.current.click();
            }
        }
        onSubmit();
    }
    
    return (
        <Dialog
            open={isOpen}
            onClose={onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <a
                ref={downloadLink}
                style={{
                    display: "none"
                }}
            />
            <DialogTitle id="alert-dialog-title">
                {"파일을 다운 받겠습니까?"}
            </DialogTitle>
            <Divider/>
            <DialogActions>
                <Button onClick={onCancel}>취소</Button>
                <Button onClick={onClickSave} autoFocus>확인</Button>
            </DialogActions>
        </Dialog>
    )
}

export default FileDownloadModal;

/*
        const session = await Auth.currentSession();
        const credentials = await Auth.currentUserCredentials();
        const client = new S3Client({
            region: "ap-northeast-2",
            credentials: credentials
        })
        const user = session.getIdToken().payload['sub'];
        if (!downloadLink.current) return;
        for (const id of ids) {
            const command = new GetObjectCommand({
                Bucket: "rattiel-storage",
                Key: `${user}${id}`
            })
            const response = await client.send(command);
            if (response.Body) {
                let blob = new Blob([response.Body.toString()]);
                downloadLink.current.href = window.URL.createObjectURL(blob);
                downloadLink.current.click();
            }
        }
 */
