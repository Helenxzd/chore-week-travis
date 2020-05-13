import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import firebase from "../shared/firebase";

const db = firebase.database().ref();

const AddGroup = ({uid, invite}) => {
    const [open, setOpen] = useState(false);
    const [groupName, setGroupName] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleGroupNameChange = (event) => {
        setGroupName(event.target.value);
    };

    const handleSave = () => {
        const num = parseInt(invite, 16) + 1;
        const newNum = num.toString(16);
        const group = {
            [newNum]: {
                name: groupName,
                members: [uid]
            }
        };

        db.child('groups')
            .update(group)
            .then(() => setOpen(false))
            .then(() => setGroupName(""))
            .catch(error => alert(error));
        
        db.update({"currentInvite": newNum})
            .catch(error => alert(error));
    };

    return (
        <div>
            <Button color="primary" onClick={handleClickOpen}>Add Group</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add a group</DialogTitle>
                <DialogContent className="dialog-root">
                    <div className="dialog-wrap">
                        <TextField id="group-name"
                                   label="Group Name"
                                   value={groupName}
                                   onChange={handleGroupNameChange}/>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddGroup;
