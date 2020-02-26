
import React, { useState, useEffect, useRef } from 'react';
import TeamsComponent from '../../components/teams';
import SkySportLiveService from '../../services/skysportlive';
import dayjs from 'dayjs';

const getNow = () => dayjs().format('YYYY-MM-DD HH:mm:ss:SSS');

const Teams = props => {

    const { teams: initTeams = null, query, live = false } = props;

    const subscriptionRef = useRef();

    const [teams, setTeams] = useState(initTeams);
    const [timestamp, setTimestamp] = useState(getNow());

    // mount
    useEffect(() => {
        if (!initTeams) {
            console.log('do query');
            const getTeams = async () => {
                const teams = await SkySportLiveService.teamsQuery(query);
                setTeams(teams);
                setTimestamp(getNow());
            }
            getTeams();
        }
    }, [initTeams, query]);

    useEffect(() => {
        if (live) {
            console.log('do subscription');
            subscriptionRef.current = SkySportLiveService
                .teamsSubscription(query)
                .subscribe({
                    error: (error) => { console.log('error', error) },
                    next: v => {
                        setTeams(v.value.data.createTeamSubscription.TEAMS);
                        setTimestamp(getNow());
                        console.log('data from subscription', v);
                    }
                }, []);

            return () => {
                if (subscriptionRef.current) subscriptionRef.current.unsubscribe();
                console.log('unsubscribe');
            }
        }

    }, [live, query]);

    return <TeamsComponent teams={teams} timestamp={timestamp} />
};

export default Teams;
