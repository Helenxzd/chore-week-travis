const addChores = (uid, data) => {
    return Object.entries(data.chores)
        .filter(([cid, chore]) => chore.uid === uid)
        .map(([cid, {gid, uid, name, dueDate, dateCompleted, recursion, status='incomplete', rotate}]) => {
            return {cid, gid, groupName: gidToGroupName(data, gid), uid, name, dueDate: new Date(dueDate), dateCompleted, recursion, status, isDone: !!dateCompleted, rotate};
        })
        .reduce((acc, chore, i) => {
            if(chore.status==='complete') {
                acc['done'].push(chore);
                return acc;
            }
            if(chore.isDone && chore.gid === 'personal') {
                acc['done'].push(chore);
                return acc;
            }
            acc['todo'].push(chore);
            return acc;
        }, { todo: [], done: [], goodbye: [] });
};

const addChoresByGroup = (gid, uid, data) => {
    return Object.entries(data.chores)
        .filter(([cid, chore]) => chore.gid === gid && (chore.status === 'pending' || chore.status === 'incomplete') &&
            chore.uid !== uid)
        .map(([cid, {gid, uid, name, dueDate, dateCompleted, recursion, status='incomplete', rotate}]) => {
            return {
                cid,
                gid,
                groupName: gidToGroupName(data, gid),
                uid,
                assignee: data.users[uid] ? data.users[uid].displayName : uid,
                name,
                dueDate: new Date(dueDate),
                dateCompleted,
                recursion,
                status,
                isDone: !!dateCompleted,
                rotate
            };
        });
};


const addGroups = (uid, data) => {
    const personalGroup = {
        gid: 'personal',
        name: 'personal',
        members: membersToNames(data, [uid])
    };

    return [
        personalGroup,
        ...Object.entries(data.groups)
            .filter(([gid, {members}]) => Object.values(members).includes(uid))
            .map(([gid, {name, members}]) => ({gid, name, members: membersToNames(data, Object.values(members))}))
    ];
};

const membersToNames = (data, members) => members
    .map((uid) => ({
        username: data.users[uid] ? data.users[uid].displayName : uid,
        uid: uid
    }))

const gidToGroupName = (data, gid) => data.groups[gid] ? data.groups[gid].name : "personal";

export {
    addChores,
    addGroups,
    addChoresByGroup
};
