import React, {useEffect, useState} from 'react';
import firebase from "../shared/firebase";
import {addGroups} from '../shared/filters';
import '../styles/GroupsList.css';
import AddGroup from "./AddGroup";
import JoinGroup from './JoinGroup';
import Typography from "@material-ui/core/Typography";
import Group from "./Group";

const db = firebase.database().ref();

const GroupsList = () => {
    const [groups, setGroups] = useState([]);
    const [uid, setUid] = useState();
    const [invite, setInvite] = useState();

    useEffect(() => {
        const dbInvite = db.child("currentInvite");
        const handleData = snap => {
            if (snap.val()) setInvite(snap.val());
        };

        dbInvite.on('value', handleData, error => alert(error));
        return () => {
            dbInvite.off('value', handleData);
        };
    })

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUid(user.uid);
            }
        });
    });

    useEffect(() => {
            const handleData = snap => {
                if (snap.val()) setGroups(uid ? addGroups(uid, snap.val()) : []);
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
        uid
            ? (
                <div className='GridWrapper'>
                    {
                        groups.map((group) => {
                            if (group.gid !== 'personal') return <Group group={group} uid={uid} key={group.gid}/>;
                        }
                        )
                    }
                    <AddGroup uid={uid} invite={invite}/>
                    <JoinGroup uid={uid}/>
                </div>
            )
            : (
                <div>
                    <div className="ListSpacer"/>
                    <Typography variant="h5" style={{textAlign: 'center'}}>Loading...</Typography>
                </div>
            )

    );
};


export default GroupsList;
