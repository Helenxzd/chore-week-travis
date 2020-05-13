import React, {useState, useEffect} from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import firebase from "../shared/firebase";

const db = firebase.database().ref();

const JoinGroup = ({uid}) => {
    const [groupKeys, setGroupKeys] = useState([]);
    const [open, setOpen] = useState(false);
    const [groupCode, setGroupCode] = useState();
    const [groups, setGroups] = useState({});

    useEffect(() => {
        const dbGroups = db.child("groups");
        const handleData = snap => {
            if (snap.val()){
                setGroups(snap.val());
                setGroupKeys(Object.keys(snap.val()))
            };
        };
        dbGroups.on('value', handleData, error => alert(error));
        return () => {
            dbGroups.off('value', handleData);
        };
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleGroupCodeChange = (event) => {
        setGroupCode(event.target.value);
    };

    const handleSubmit = () => {
        if (! groupKeys.some(keys => keys === groupCode)){
            window.confirm("This group code does not exist");
        }else{
            const groupInfo = groups[groupCode];
            //const groupName = Object.keys(groupInfo)[0];
            var members = Object.values(groupInfo)[0];
            if(members.includes(uid)){
                window.confirm("You've already joined this group")
            }
            else{
                members.push(uid);

                db.child('groups').child(groupCode).update({"members": members})
                    .then(() => setOpen(false))
                    .catch(error => alert(error));

                setGroupCode("");
            }
        }
    };

    return(
        <div>
            <Button color="primary" onClick={handleClickOpen}>Join Group</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Join an existing group</DialogTitle>
                <DialogContent className="dialog-root">
                    <div className="dialog-wrap">
                        <TextField id="group-name"
                                   label="Group Code"
                                   value={groupCode}
                                   onChange={handleGroupCodeChange}/>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default JoinGroup;