import '../styles/Group.css';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import React, {useEffect, useState} from "react";
import {addChoresByGroup} from "../shared/filters"
import firebase from "../shared/firebase";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const db = firebase.database().ref();

const Group = ({uid, group}) => {
    const [chores, setChores] = useState([]);

    const handleMarkCompleted = (chore) => {
        db.child('chores').child(chore.cid)
            .update({
                status: 'complete'
            })
            .catch((err) => alert(err));
    };

    useEffect(() => {
        const handleData = snap => {
            if (snap.val()) setChores(addChoresByGroup(group.gid, uid, snap.val()));
        };

        db.on('value', handleData, error => alert(error));
        return () => {
            db.off('value', handleData);
        };
    },[]);


    return (
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{group.name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <List className="list-root">
                    <ListItem>
                        <ListItemText>invite code: {group.gid}</ListItemText>
                    </ListItem>
                    {
                        chores.map((chore) => (
                            <div key={chore.cid}>
                                <ListItem>
                                    <ListItemText primary={chore.name} secondary={`${chore.assignee} : ${chore.status}`}/>
                                    {chore.status === "pending" ?
                                        <ListItemSecondaryAction>
                                            <Button variant="contained"
                                                    id={chore.cid}
                                                    color="primary"
                                                    size="small"
                                                    startIcon={<CheckCircleOutlineIcon />}
                                                    onClick={(ev) => {
                                                        ev.preventDefault();
                                                        handleMarkCompleted(chore);
                                                    }} >
                                                Confirm
                                            </Button>
                                        </ListItemSecondaryAction>
                                        : null }
                                </ListItem>
                            </div>
                        ))
                    }
                </List>
            </ExpansionPanelDetails>


        </ExpansionPanel>


    );
};

export default Group;
