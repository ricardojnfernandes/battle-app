import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectUserId,
    selectChampion,
    selectLoading,
    selectError,
  } from './slice/selectors';
import { BattleErrorType, ChampionEnum, GameData } from './slice/types';
import { useBattleSlice } from './slice';
import { Clap } from './Clap';
import { Avatar } from './Avatar';
import Pusher from 'pusher-js';

export function Arena(props) {

    //const [ connection, setConnection ] = useState<HubConnection | null>(null);
    const [pusher, setPusher] = useState<Pusher | null>(null);
    const [points, setPoints] = useState(0);
    const [gameData, setGameData] = useState<GameData>();

    const { actions } = useBattleSlice();

    const userid = useSelector(selectUserId);
    const champion = useSelector(selectChampion);
    const error = useSelector(selectError);

    const dispatch = useDispatch();

    // Code for SignalR websockets
    // useEffect(() => {
    //     const newConnection = new HubConnectionBuilder()
    //         .withUrl('https://techoclock.service.signalr.net') // UPDATE THIS URL
    //         .withAutomaticReconnect()
    //         .build();

    //     setConnection(newConnection);
    // }, []);

    // // React on websocket messages
    // useEffect(() => {
    //     if (connection) {
    //         connection.start()
    //             .then(result => {
    //                 console.log('Connected!');

    //                 connection.on('ReceiveMessage', message => {
    //                     console.log('message', message);
    //                 });
    //             })
    //             .catch(e => console.log('Connection failed: ', e));
    //     }
    // }, [connection]);

    // Starting up
    useEffect(() => {
        // Enable pusher logging - don't include this in production
        Pusher.logToConsole = true;

        var newPusher = new Pusher('2d282419724d865daded', {
            cluster: 'eu'
        });
        setPusher(newPusher);
    }, []);

    // React on pusher connection
    useEffect(() => {
        if (pusher) {
            var channel = pusher.subscribe('arena');
            channel.bind('gameData', function(data) {
                setGameData(data);
            });
        }
    }, [pusher]);

    // Update my champion's points when we receive them
    useEffect(() => {
        setPoints(gameData?.Standings[`${champion.toString()}`] ?? 0);
    }, [gameData]);

    // Handle signup button click
    const handleClick = () => {
        console.log('Signing up!');
        dispatch(actions.signup());
    };

    const handleRestart = () => {
        console.log('Restarting!');
        dispatch(actions.restart());
    };
    
    return (
        <>
            <div className="container">
                <div className="jumbotron">
                    {userid === undefined && (
                        <>
                            <h1>Welcome to the <b>ClapBattle</b> app!</h1>
                            <h2>Hit start to enter the game</h2>
                            <br />
                            <button type="button" className="btn btn-primary btn-lg" onClick={handleClick}>
                                Start
                            </button>
                            {error !== null && error !== undefined && (
                                <>
                                    <p></p>
                                    <div className="alert alert-danger" role="alert">
                                    Ooooops! Something went wrong...
                                    </div>
                                </>
                            )}
                            <hr></hr>
                            <p>Tech-O'clock 2022 | by ITSector</p>
                        
                        </>
                    )}
                    {userid !== undefined && (
                        <>
                            <div className="text-center">
                                <h3 className="mt-2"><strong>Your champion</strong></h3>
                                <Avatar champion={champion} small={false} points={points}/>
                                <Clap />
                                <hr></hr>
                                <div className="row">
                                    <div className="col-sm">
                                        <Avatar champion={ChampionEnum.Godzilla} small={true} points={gameData?.Standings?.Godzilla ?? 0} />
                                    </div>
                                    <div className="col-sm">
                                        <Avatar champion={ChampionEnum.SpiderMan} small={true} points={gameData?.Standings?.SpiderMan ?? 0} />
                                    </div>
                                    <div className="col-sm">
                                        <Avatar champion={ChampionEnum.HarryPotter} small={true} points={gameData?.Standings?.HarryPotter ?? 0}/>
                                    </div>
                                </div>
                                <button type="button" className="btn btn-outline-primary mt-2" onClick={handleRestart}>Restart</button>
                                <hr></hr>
                                <p>Tech-O'clock 2022 | by ITSector</p>
                            </div>
                            
                        </>
                    )}
                    </div>
            </div>
        </>
    );
  }
  