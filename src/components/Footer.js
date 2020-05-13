import React, {useState, useEffect} from 'react';
// import {Link, BrowserRouter as Router} from 'react-router-dom';
import '../styles/Footer.css';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import { MemoryRouter as Router } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import firebase from "../shared/firebase";


export default function SimpleBottomNavigation() {
    const [user, setUser] = useState(firebase.auth().currentUser);
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            }
        });
    });

    const [value, setValue] = React.useState(1);
    const LinkBehavior = React.forwardRef((props, ref) => (
        <RouterLink ref={ref} to="/groups" {...props} />
      ));

    const LinkBehavior1 = React.forwardRef((props, ref) => (
        user ?
        (
            <RouterLink ref={ref} to="/chores" {...props} />
        )
        :
        (
            <RouterLink ref={ref} to="/" {...props} />
        )
      ));

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className="footer-nav"
        >
                {/* <Link to="/groups"> */}
                    <BottomNavigationAction label="Groups"
                                            icon={<GroupIcon/>} component={LinkBehavior}/>
                {/* </Link> */}

                {/* <Link to="/chores"> */}
                    <BottomNavigationAction label="Me"
                                            icon={<PersonIcon/>} component={LinkBehavior1}/>
                {/* </Link> */}

                {/* <Link to="/scoreboard"> */}
                    <BottomNavigationAction style={{display: 'none'}}
                                            label="Scoreboard"
                                            icon={<InsertChartIcon/>}
                                            disabled
                    />
                {/* </Link> */}
        </BottomNavigation>
    );
}
