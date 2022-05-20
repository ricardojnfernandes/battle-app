import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import './Clap.scss'
import {
    selectUserId,
  } from './slice/selectors';
import { useBattleSlice } from './slice';
import harry from './assets/harry-potter.jpeg';
import godzilla from './assets/godzilla.jpg';
import spider from './assets/spider-man.jpeg';
import { ChampionEnum } from './slice/types';

export interface AvatarProps {
    champion: ChampionEnum;
    small: boolean;
    points: number;
}

export function Avatar(props: AvatarProps) {

    const { actions } = useBattleSlice();
    const userid = useSelector(selectUserId);
    const dispatch = useDispatch();
    let avatar: string;
    let avatarLabel: string;
    switch (props.champion.toString()) {
        case ChampionEnum[ChampionEnum.Godzilla]:
        case ChampionEnum.Godzilla.toString():
            avatar = godzilla;
            avatarLabel = "Godzilla";
            break;
        case ChampionEnum[ChampionEnum.HarryPotter]:
        case ChampionEnum.HarryPotter.toString():
            avatar = harry;
            avatarLabel = "Harry Potter";
            break;
        default:
            avatar = spider;
            avatarLabel = "Spider-Man";
            break;
    }
    
    useEffect(() => {
        console.log('component mounted!'); 
    }, []);
    
    return (
        <>
            {props.small && (
                <>
                    <AvatarImageSmall src={avatar} className="rounded-circle shadow-4" />
                    <p className="mt-2">{avatarLabel}</p>
                    <h5 className="mt-2"><strong>{ props.points }</strong></h5>
                </>     
            )}
            {!props.small && (
                <>
                    <AvatarImage src={avatar} className="rounded-circle shadow-4" />
                    <h5 className="mt-2">{ avatarLabel }</h5>
                </>     
            )}
        </>
    );
}
  

const AvatarImage = styled.img`
  width: 150px;
  height: 150px;
`;

const AvatarImageSmall = styled.img`
  width: 80px;
  height: 80px;
`;
  