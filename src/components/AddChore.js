import React, {useEffect, useState} from "react";
import {addGroups} from '../shared/filters';
import '../styles/AddChore.css';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Checkbox,
    FormControlLabel,
    FormGroup
} from "@material-ui/core";
import firebase from "../shared/firebase";
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

const db = firebase.database().ref();

const AddChore = ({uid, username}) => {
    const [open, setOpen] = useState(false);
    const [groups, setGroups] = useState([]);
    const [name, setName] = useState('New Chore');
    const [dueDate, setDueDate] = useState(new Date());
    const [group, setGroup] = useState({ gid: 'personal', name: 'personal',
        members: [{uid: uid, username: username}] });
    const [recursion, setRecursion] = useState('none');
    const [assignee, setAssignee] = useState({uid: uid, username: username});
    const [rotate, setRotate] = useState(false);
    const recursionTypes = ["none", "daily", "weekly", "biweekly", "monthly"];

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        resetFields();
    };

    const resetFields = () => {
        setName('');
        setGroup({gid:'personal', name:'personal'});
        setDueDate(new Date());
        setRecursion('none');
        setAssignee({uid:uid, username:username});
        setRotate(false);
    }

    const handleSave = () => {
        const thisDate = dueDate;
        thisDate.setHours(23);
        thisDate.setMinutes(59);

        db.child('chores')
            .push({
                name,
                gid: group.gid,
                uid: assignee.uid === "random" ? group.members[Math.floor(Math.random() * group.members.length)].uid : assignee.uid,
                dueDate: thisDate.toString(),
                recursion,
                status: 'incomplete',
                rotate
            })
            .catch(error => alert(error));
        setOpen(false);
        resetFields();
    };

    useEffect(() => {
            const handleData = snap => {
                if (snap.val()) setGroups(addGroups(uid, snap.val()));
            };

            db.on('value', handleData, error => alert(error));
            return () => {
                db.off('value', handleData);
            };
        },
        [
            uid
        ]);

    return (
        <div>
            <Button color="primary" onClick={handleClickOpen}>Add Chore</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add a chore</DialogTitle>
                <DialogContent className="dialog-root">
                    <div className="dialog-wrap">
                        <TextField id="chore-name"
                                   label="Chore Name"
                                   value={name}
                                   onChange={(ev) => setName(ev.target.value)}
                        />
                        <div className="input-item">
                            <TextField select
                                       label="Group"
                                       id="chore-group"
                                       value={group}
                                       SelectProps={{
                                           renderValue: (value) => value.name
                                       }}
                                       onChange={(ev) => {
                                           setGroup(ev.target.value)
                                           setAssignee(ev.target.value.members[0])
                                       }
                                       }
                            >
                                {
                                    groups.map(group => (
                                        <MenuItem key={group.gid} value={group}>{group.name}</MenuItem>
                                    ))
                                }
                            </TextField>
                        </div>
                        <div>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Due date"
                                    value={dueDate}
                                    onChange={setDueDate}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                        <div>
                            <TextField select
                                       label="Repeats?"
                                       id="recursion"
                                       value={recursion}
                                       onChange={(ev) => setRecursion(ev.target.value)}
                            >
                                {recursionTypes.map(rtype => (<MenuItem key={rtype} value={rtype}>{rtype}</MenuItem>))}
                            </TextField>
                        </div>
                        <div>
                            <TextField select
                                       label="Assignee"
                                       id="assignee"
                                       value={assignee}
                                       SelectProps={{
                                           renderValue: (value) => value.username
                                       }}
                                       onChange={(ev) => setAssignee(ev.target.value)}
                            >
                                {group.gid === 'personal' ? <div style={{display: 'none'}}/> :
                                <MenuItem key="random" value = {
                                    (
                                       {
                                           username: "Random",
                                           uid: "random"
                                        }
                                    )}>
                                        Random
                                </MenuItem>}
                                {
                                    group.members ?
                                    group.members.map(member => (
                                        <MenuItem key={member.uid} value={member}>{member.username}</MenuItem>
                                    )) : <MenuItem/>

                                }
                            </TextField>
                            {recursion !== 'none' && group.gid !== 'personal' ? 
                            <FormGroup>
                                <FormControlLabel 
                                control={<Checkbox checked={rotate} onChange={() => setRotate(!rotate)} />}
                                label="Rotate between group members?" />
                            </FormGroup>
                            : <div/>
                            }                
                        </div>
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


export default AddChore;
