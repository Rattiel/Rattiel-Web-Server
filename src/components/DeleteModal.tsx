"use client";

import React, {useEffect, useState} from "react";
import ApiRequest from "@/lib/util";
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";

const CONFIRM_TEXT = "확인";

interface FileDeleteModalField {
    confirm: string
}

interface FileDeleteModalProps {
    ids: Array<any>;
    isOpen: boolean;
    onCancel: () => void;
    onSubmit: () => void;
}

function DeleteModal({ids, isOpen, onCancel, onSubmit}: FileDeleteModalProps) {
    const [field, setField] = useState<FileDeleteModalField>({
        confirm: ""
    })
    const {confirm} = field;
    
    useEffect(() => {
        setField({
            confirm: ""
        })
    }, [isOpen])
    
    const onClickSave = async () => {
        if (confirm != CONFIRM_TEXT) return;
        for (const id of ids) {
            const response = await ApiRequest({
                method: "DELETE",
                url: `/file?id=${id}`
            });
            
            if (!response.ok) {
                const body = await response.json();
                alert(body.message);
            }
        }
        onSubmit();
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
                {"정말로 파일을 삭제하겠습니까?"}
            </DialogTitle>
            <Divider/>
            <DialogContent>
                <DialogContentText id="confirm-dialog-description">
                    {"영구적으로 파일을 삭제하겠습니까? 이 작업은 실행 취소할 수 없습니다."}<br/>
                    {`삭제를 확인하려면 "${CONFIRM_TEXT}"을 입력합니다.`}
                </DialogContentText>
                <TextField
                    margin="normal"
                    fullWidth={true}
                    type="text"
                    id="confirm-input"
                    label="확인"
                    placeholder="확인"
                    name="confirm"
                    value={confirm}
                    onChange={onInputChange}
                />
            </DialogContent>
            <Divider/>
            <DialogActions>
                <Button onClick={onCancel}>취소</Button>
                <Button disabled={confirm != CONFIRM_TEXT} onClick={onClickSave} autoFocus>확인</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteModal;
