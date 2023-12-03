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
import TextField from "@mui/material/TextField";

interface DirectoryCreateModalField {
    name: string;
}

interface DirectoryCreateModalProps {
    directory: string;
    isOpen: boolean;
    onCancel: () => void;
    onSubmit: () => void;
}

function DirectoryCreateModal({directory, isOpen, onCancel, onSubmit}: DirectoryCreateModalProps) {
    const [field, setField] = useState<DirectoryCreateModalField>({
        name: ""
    })
    const {name} = field;
    
    const onClickSave = async () => {
        const session = await Auth.currentSession();
        const credentials = await Auth.currentUserCredentials();
        const client = new S3Client({
            region: "ap-northeast-2",
            credentials: credentials
        })
        const user = session.getIdToken().payload['sub'];
        const command = new PutObjectCommand({
            Bucket: "rattiel-storage",
            Key: `${user}${directory}${name}`,
        })
        await client.send(command);
        onSubmit();
        setField((prevState) => ({
            ...prevState,
            name: ""
        }));
    }
    
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setField((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }
    
    return (
        <Dialog
            open={isOpen}
            onClose={onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"폴더 생성"}
            </DialogTitle>
            <Divider/>
            <DialogContent>
                <TextField
                    margin="normal"
                    fullWidth={true}
                    type="text"
                    label="이름"
                    placeholder="이름"
                    name="name"
                    value={name}
                    onChange={onInputChange}
                />
            </DialogContent>
            <Divider/>
            <DialogActions>
                <Button onClick={onCancel}>취소</Button>
                <Button disabled={name == ""} onClick={onClickSave} autoFocus>생성</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DirectoryCreateModal;
