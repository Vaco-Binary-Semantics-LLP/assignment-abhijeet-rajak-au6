import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPlayerTeam } from '../redux/actions/playerAction';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField'
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


function Player(props) {
    const classes = useStyles();
    const dispatch = useDispatch(getAllPlayerTeam());
    const players = useSelector(state => state.playerState.players);
    const loading = useSelector(state => state.teamState.loading);

    useEffect(() => {
        dispatch(getAllPlayerTeam());
    }, []);

    const [search, setSearch] = useState(null);

    const handleChange = (e) => {
        setSearch([e.target.value]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getAllPlayerTeam(search));
    }
    return players !== null && !loading ? (
        <>
            <h1>Player page</h1>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField placeholder="Case Sensensative Search" id="filled-basic" label="Search By Name" variant="filled" name="search" onChange={handleChange} />
            </form>
            {players.length > 0 ? <>
                <div style={{ padding: "40px" }}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Player Name</TableCell>
                                    <TableCell align="center">Team Name&nbsp;</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {players.map((row) => (
                                    <>
                                        <TableRow key={row.name}>
                                            <TableCell align="center" component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.team !== null ? row.team.name : "--"}
                                            </TableCell>
                                        </TableRow>
                                    </>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </div>
            </> : <h2>No Data Found ....</h2>}
            <Button size="small" onClick={(e) => props.history.push("/team")} style={{ marginTop: "10px", marginLeft: "5px" }} variant="contained" color="primary">
                Go Back
            </Button>
        </>
    ) : <h1>Loading ....</h1>
}

export default Player
