import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack  } from "react-icons/io";
//Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import {Container, Col, Row, Button, Image } from 'react-bootstrap';
//Animation
import AOS from 'aos';
import 'aos/dist/aos.css';
//Images
import ImgPaper from './images/icon-paper.svg';
import ImgScissors from './images/icon-scissors.svg';
import ImgRock from './images/icon-rock.svg';
import ImgLizard from './images/icon-lizard.svg';
import ImgSpock from './images/icon-spock.svg';

import ImgClose from './images/icon-close.svg';
import ImgRules from './images/image-rules-bonus.svg';

const Game_2 = () => {
    const navigate = useNavigate();
    const [showRules, setShowRules] = useState(false);
    const [showGameStep1, setShowGameStep1] = useState(true);
    const [showGameStep2, setShowGameStep2] = useState(false);
    const [userPick, setUserPick] = useState('');
    const [housePick, setHousePick] = useState('');
    const [playerScore, setPlayerScore] = useState(JSON.parse(localStorage.getItem('playerScore2')) || 0);
    const [houseScore, setHouseScore] = useState(JSON.parse(localStorage.getItem('houseScore2')) || 0);

    const handleLaunchGame1 = () => {
        navigate("/r-p-s-master");
    };

    const toggleRulesPage = () => {
        setShowRules(!showRules);
    };

    useEffect(() => {
        localStorage.setItem('playerScore2', JSON.stringify(playerScore));
        localStorage.setItem('houseScore2', JSON.stringify(houseScore));
      }, [playerScore, houseScore]);

    AOS.init();

    return (
        <Container fluid className='cs-h overflow-hidden d-flex flex-column align-items-center gap-3'>
            <Container data-aos="fade-down" className='border rounded d-flex flex-row align-items-center cs-w-2 mt-5 py-2'>
                <h1 className='cs-ls-lh-2 text-uppercase display-6 m-3 text-white p-0 m-0'>Rock<br />Paper<br />Scissors<br />Lizard<br />Spock</h1>
                <Container className='me-2 my-2 py-3 cs-w-3 bg-white rounded d-flex flex-column align-items-center justify-content-center'>
                    <h2 className='m-0 text-uppercase cs-fc h5'>Score</h2>
                    <h3 className='m-0 p-0 display-3 cs-fc-2'>{playerScore} x {houseScore}</h3>
                </Container>
            </Container>
            {showGameStep1 && <GameStep1 setShowGameStep1={setShowGameStep1} 
                                         setShowGameStep2={setShowGameStep2}
                                         setUserPick={setUserPick}
                                         setHousePick={setHousePick} />}
            {showGameStep2 && <GameStep2 setShowGameStep2={setShowGameStep2} 
                                         setShowGameStep1={setShowGameStep1}
                                         setPlayerScore={setPlayerScore}
                                         setHouseScore={setHouseScore}
                                         userPick={userPick}
                                         housePick={housePick} />}
            <Button onClick={toggleRulesPage} className='cs-btn text-uppercase px-4 py-2'>Rules</Button> 
            {showRules && <RulesPage setShowRules={setShowRules} />}
            <Button onClick={handleLaunchGame1} className='cs-btn-back px-2 py-3'><IoIosArrowBack  /></Button>
        </Container>
    );
};

const GameStep1 = ({setUserPick, setShowGameStep1, setShowGameStep2, setHousePick}) => {
    const options = ['paper', 'scissors', 'rock', 'lizard', 'spock'];

    const randomizePick = () => {
        const randomIndex = Math.floor(Math.random() * options.length);
        return options[randomIndex];
    };

    const handlePlayerPick = (pick) => {
        setUserPick(pick);
        setShowGameStep1(false); 
        setShowGameStep2(true);
        setHousePick(randomizePick());
    };
    
    return (
        <Container data-aos="fade-up" className='p-0 items-pos-2 d-inline'>
            <Button className='cs-btn-s-2 rounded-circle cs-btn-def cs-btn-paper item-1' 
                    onClick={() => handlePlayerPick(options[0])}>
                <Image fluid src={ImgPaper} alt='paper' className='h-50 w-50' />
            </Button>
            <div className='cs-line-2-1'></div>
            <Button className='cs-btn-s-2 rounded-circle cs-btn-def cs-btn-scissors item-2' 
                    onClick={() => handlePlayerPick(options[1])}>
                <Image fluid src={ImgScissors} alt='scissors' className='h-50 w-50' />
            </Button>
            <div className='cs-line-2-2'></div>
            <Button className='cs-btn-s-2 rounded-circle cs-btn-def cs-btn-rock item-3' 
                    onClick={() => handlePlayerPick(options[2])}>
                <Image fluid src={ImgRock} alt='rock' className='h-50 w-50' />
            </Button>
            <div className='cs-line-2-3'></div>
            <Button className='cs-btn-s-2 rounded-circle cs-btn-def cs-btn-lizard item-4' 
                    onClick={() => handlePlayerPick(options[3])}>
                <Image fluid src={ImgLizard} alt='lizard' className='h-50 w-50' />
            </Button>
            <div className='cs-line-2-4'></div>
            <Button className='cs-btn-s-2 rounded-circle cs-btn-def cs-btn-spock item-5' 
                    onClick={() => handlePlayerPick(options[4])}>
                <Image fluid src={ImgSpock} alt='spock' className='h-50 w-50' />
            </Button>
            <div className='cs-line-2-5'></div>
        </Container>
    );
};

const GameStep2 = ({ userPick, housePick, setShowGameStep1, setShowGameStep2, setPlayerScore, setHouseScore }) => {
    const [userPickImg, setUserPickImg] = useState();
    const [housePickImg, setHousePickImg] = useState();
    const [result, setResult] = useState('');

    const handlePick = () => {
        if (userPick === 'paper') {
            setUserPickImg(ImgPaper);
        } else if (userPick === 'scissors') {
            setUserPickImg(ImgScissors);
        } else if (userPick === 'rock') {
            setUserPickImg(ImgRock);
        } else if (userPick === 'lizard') {
            setUserPickImg(ImgLizard);
        } else {
            setUserPickImg(ImgSpock);
        }
    };

    const handleHousePick = () => {
        if (housePick === 'paper') {
            setHousePickImg(ImgPaper);
        } else if (housePick === 'scissors') {
            setHousePickImg(ImgScissors);
        } else if (housePick === 'rock') {
            setHousePickImg(ImgRock);
        } else if (housePick === 'lizard') {
            setHousePickImg(ImgLizard);
        } else {
            setHousePickImg(ImgSpock);
        }
    };

    const handleResult = () => {
        if (userPick === housePick) {
            setResult('Drow')
        } else if ((userPick === 'paper' && housePick !== 'scissors' && housePick !== 'lizard') ||
                   (userPick === 'scissors' && housePick !== 'rock' && housePick !== 'spock') ||
                   (userPick === 'rock' && housePick !== 'paper' && housePick !== 'spock') ||
                   (userPick === 'lizard' && housePick !== 'rock' && housePick !== 'scissors') ||
                   (userPick === 'spock' && housePick !== 'lizard' && housePick !== 'paper')) {
            setResult('You win');
            setPlayerScore(prevScore => prevScore + 1);
        } else {
            setResult('You lose');
            setHouseScore(prevScore => prevScore + 1);
        };
    };

    useEffect(() => {
        handlePick();
        handleHousePick();
        handleResult();
    }, [userPick]);

    const handlePlayAgain = () => {
        setShowGameStep1(true); 
        setShowGameStep2(false);
    };

    return (
        <Container className='cs-w-2'>
            <Row className='gap-4 gap-lg-0 text-white text-uppercase justify-content-center'>
                <Col xs={{span: 5, order: 1}} lg={{span: 4, order: 1}} data-aos="fade-right" 
                     className='px-0 d-flex flex-column align-items-center justify-content-between'>
                    <h4 className='text-center h3 w-100 mb-5'>You picked</h4>
                    <Button disabled className={`w-100 cs-btn-def rounded-circle cs-btn-${userPick} ${result === 'You win' && 'cs-win'}`}>
                        <Image fluid src={userPickImg} alt='user pick' className='h-50 w-50' />
                    </Button>
                </Col>
                <Col xs={{span: 12, order: 3}} lg={{span: 4, order: 2}} 
                     data-aos="fade-up"
                     className='d-flex flex-column align-items-center justify-content-center'>
                    <h4 className='display-4'>{result}</h4>
                    <Button className='cs-btn-2 py-3 px-4 text-uppercase' 
                            onClick={handlePlayAgain}>Play again</Button>
                </Col>
                <Col xs={{span: 5, order: 2}} lg={{span: 4, order: 3}} data-aos="fade-left" 
                     className='px-0 d-flex flex-column align-items-center justify-content-between'>
                    <h4 className='text-center h3 w-100 mb-5'>The house picked</h4>
                    <Button disabled className={`w-100 mx-auto cs-btn-def rounded-circle cs-btn-${housePick} ${result === 'You lose' && 'cs-win'}`}>
                        <Image fluid src={housePickImg} alt='house pick' className='h-50 w-50' />
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

const RulesPage = ({setShowRules}) => {
    const [animateOut, setAnimateOut] = useState(false);

    const hideRulesPage = () => {
        setAnimateOut(true); // Trigger the zoom-out animation

        setTimeout(() => {
            setShowRules(false); // Hide the component after the animation
        }, 500);
    };

    const animationClass = animateOut ? 'zoom-out-animation' : '';

    AOS.init();

    return(
        <Container data-aos="zoom-in" fluid className={`cs-page d-flex flex-column justify-content-center ${animationClass}`}>
            <Container className='cs-page-2 bg-white rounded p-5 cs-w d-flex flex-column gap-5'>
                <Container className='d-flex flex-row justify-content-between'>
                    <h3 className='text-uppercase h1'>Rules</h3>
                    <Button onClick={hideRulesPage} className='bg-transparent border-0 h1'><Image fluid src={ImgClose} alt='close' /></Button>
                </Container>
                <Image fluid src={ImgRules} alt='rules' className='m-2' />
            </Container>
        </Container>
    );
};

export default Game_2;