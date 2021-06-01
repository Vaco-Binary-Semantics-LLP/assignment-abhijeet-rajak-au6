import React, { useEffect, useState } from 'react';
import { connectAdvanced, useDispatch, useSelector } from 'react-redux';
import { getAllTeams, delTeam, addTeamName } from '../redux/actions/teamAction';
import { getAllPlayers, delPlayer, addPlayerToTeam } from '../redux/actions/playerAction';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { FormControl, Input, InputLabel, FormHelperText } from '@material-ui/core';
import Modal from 'react-modal';



const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};


const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        left: "30%",
        maxHeight: 500,
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
}));



export default function Team(props) {
    const classes = useStyles();
    useEffect(() => {
        dispatch(getAllTeams())
    }, []);

    var subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [teamName, setTeamName] = useState("");
    const [playerName, setPlayerName] = useState("");
    const [team_id, setTeamId] = useState(null);
    const [addPlayerClicked, setAddPlayerClicked] = useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }
    let teams = useSelector(state => state.teamState.teams);
    const loading = useSelector(state => state.teamState.loading);
    const dispatch = useDispatch();
    // teams = []

    const removePlayer = (e, player_id) => {
        dispatch(delPlayer(player_id));
    }

    const addPlayer = (e, team_id, callback) => {
        setAddPlayerClicked(true);
        setTeamId(team_id);
        callback();
        // console.log("hello");
        // dispatch(addPlayerToTeam(team_id));
    }

    const addPlayerSubmit = (e, callback) => {
        setAddPlayerClicked(false);
        // console.log(playerName);
        dispatch(addPlayerToTeam(team_id, { name: playerName }))
        callback();

    }

    const addTeam = (e, callback) => {

        dispatch(addTeamName({ name: teamName }))
        callback();

    }
    const handleChange = (e) => {
        if (!addPlayerClicked)
            setTeamName(e.target.value);
        else
            setPlayerName(e.target.value);
    }

    const removeTeam = (e, team_id) => {
        dispatch(delTeam(team_id));
    }
    // console.log("teams", teams);
    return teams !== null && !loading ? (
        <>
            <h1>Team Page</h1>
            {teams.length > 0 ? <><div style={{ padding: "40px" }}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Team Name</TableCell>
                                <TableCell align="center">List of Players&nbsp;</TableCell>
                                <TableCell align="center">Team Action&nbsp;</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {teams.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell align="center" component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button size="small" onClick={(e) => addPlayer(e, row._id, openModal)} style={{ marginTop: "10px", marginLeft: "5px" }} variant="contained" color="primary">
                                            Add Player
                                        </Button>
                                        <List className={classes.root}>
                                            {row.list_of_players.map((player) => (

                                                <ListItem key={`item-${player._id}-${player.name}`}>
                                                    <ListItemText primary={`${player.name}`} />
                                                    <Button size="small" onClick={(e) => removePlayer(e, player._id)} style={{ marginTop: "10px" }} variant="contained" color="secondary">
                                                        Remove Player
                                                    </Button>

                                                </ListItem>

                                                // <p>{player}</p>
                                            ))}
                                        </List>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button onClick={(e) => removeTeam(e, row._id)} style={{ marginTop: "10px" }} variant="contained" color="secondary">
                                            Remove Team
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>


            </div></> : <h1>No Data Found .....</h1>}

            <div>
                <Button onClick={openModal} style={{ marginTop: "10px" }} variant="contained" color="secondary">
                    Add Team
                    </Button>
                <Button size="small" onClick={(e) => props.history.push("/player")} style={{ marginTop: "10px", marginLeft: "5px" }} variant="contained" color="primary">
                    Go to Player Page
                    </Button>
                {/* <button onClick={openModal}>Open Modal</button> */}
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >

                    {/* <button onClick={closeModal}>close</button> */}
                    <FormControl>
                        {!addPlayerClicked ? <>
                            <input name="teamName" style={{ padding: "5px 6px" }} onChange={handleChange} placeholder="Team Name" />
                            <br />
                            <Button size="small" onClick={closeModal} style={{ marginTop: "10px" }} variant="contained" color="secondary">
                                Close
                            </Button>
                            <Button size="small" onClick={(e) => addTeam(e, closeModal)} style={{ marginTop: "10px" }} variant="contained" color="secondary">
                                Submit
                            </Button>
                        </> : <><input name="playerName" style={{ padding: "5px 6px" }} onChange={handleChange} placeholder="Player Name" />
                            <br />
                            <Button size="small" onClick={closeModal} style={{ marginTop: "10px" }} variant="contained" color="secondary">
                                Close
                            </Button>
                            <Button size="small" onClick={(e) => addPlayerSubmit(e, closeModal)} style={{ marginTop: "10px" }} variant="contained" color="secondary">
                                Submit
                            </Button></>}

                    </FormControl>

                </Modal>
            </div>


        </>
    ) : <h1>Loading....</h1>;
}



