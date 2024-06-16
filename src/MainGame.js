import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
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

import ImgClose from './images/icon-close.svg';
import ImgRules from './images/image-rules.svg';

const MainGame = () => {
    const [showRules, setShowRules] = useState(false);
    const [showGameStep1, setShowGameStep1] = useState(true);
    const [showGameStep2, setShowGameStep2] = useState(false);
    const [userPick, setUserPick] = useState('');
    const [housePick, setHousePick] = useState('');
    
    const [result, setResult] = useState('');

    const toggleRulesPage = () => {
        setShowRules(!showRules);
    };

    AOS.init();

    return (
        <Container className='d-flex flex-column'>
            <Container data-aos="fade-down" className='border rounded d-flex flex-row justify-content-between w-75 mt-5 py-2'>
                <h1 className='text-uppercase display-5 text-white p-0 m-0'>Rock<br /> Paper<br /> Scissors</h1>
                <Container className='w-25 bg-white rounded m-3 d-flex flex-column align-items-center justify-content-center'>
                    <h2 className='text-uppercase h4'>Score</h2>
                    <h3 className='display-3'>{0}</h3>
                </Container>
            </Container>
            {showGameStep1 && <GameStep1 setShowGameStep1={setShowGameStep1} 
                                         setShowGameStep2={setShowGameStep2}
                                         setUserPick={setUserPick}
                                         setHousePick={setHousePick} />}
            {showGameStep2 && <GameStep2 setShowGameStep2={setShowGameStep2} 
                                         setShowGameStep1={setShowGameStep1}
                                         userPick={userPick}
                                         housePick={housePick} />}
            <Button onClick={toggleRulesPage} className='cs-btn text-uppercase px-4 py-2'>Rules</Button> 
            {showRules && <RulesPage setShowRules={setShowRules} />}
        </Container>
    );
};

const GameStep1 = ({setUserPick, setShowGameStep1, setShowGameStep2, setHousePick}) => {
    const options = ['paper', 'scissors', 'rock'];
    
    const randomizePick = () => {
        const randomIndex = Math.floor(Math.random() * options.length); // Generates a random index between 0 and 2
        return options[randomIndex];
    };
    
    return (
        <Container className='mt-5 cs-w'>
            <Col className='mx-auto'>
                <Row data-aos="fade-right" className='justify-content-between'>
                    <Button className='cs-btn-def cs-btn-paper' 
                            onClick={() => (setUserPick('paper'), 
                                           setShowGameStep1(false), 
                                           setShowGameStep2(true),
                                           setHousePick(randomizePick()))}><Image src={ImgPaper} alt='paper' /></Button>
                    <Button className='cs-btn-def cs-btn-scissors' onClick={() => (setUserPick('scissors'), setShowGameStep1(false), setShowGameStep2(true))}><Image src={ImgScissors} alt='scissors' /></Button>
                </Row>
                <Row data-aos="fade-left" className='mt-4 justify-content-center'>
                    <Button className='cs-btn-def cs-btn-rock' onClick={() => (setUserPick('rock'), setShowGameStep1(false), setShowGameStep2(true))}><Image src={ImgRock} alt='rock' /></Button>
                </Row>
            </Col>
        </Container>
    );
};

const GameStep2 = ({ userPick, housePick, result, setShowGameStep1, setShowGameStep2 }) => {
    const [userPickImg, setUserPickImg] = useState();
    const [housePickImg, setHousePickImg] = useState();

    const handlePick = () => {
        if (userPick === 'paper') {
            setUserPickImg(ImgPaper);
        } else if (userPick === 'scissors') {
            setUserPickImg(ImgScissors);
        } else {
            setUserPickImg(ImgRock);
        }
    };

    const handleHousePick = () => {
        if (housePick === 'paper') {
            setHousePickImg(ImgPaper);
        } else if (housePick === 'scissors') {
            setHousePickImg(ImgScissors);
        } else {
            setHousePickImg(ImgRock);
        }
    };

    useEffect(() => {
        handlePick();
        handleHousePick();
      }, [userPick]);

    return (
        <Container className='mt-5 w-75'>
            <Row className='text-white text-uppercase'>
                <Col className='d-flex flex-column align-items-center'>
                    <h4 className='text-center'>You picked</h4>
                    <Button disabled className={`cs-btn-def cs-btn-${userPick}`}><Image src={userPickImg} alt='user pick' /></Button>
                </Col>
                <Col className='d-flex flex-column align-items-center justify-content-center'>
                    <h4>{result}</h4>
                    <Button className='cs-btn-2 py-3 px-4 text-uppercase' onClick={() => (setShowGameStep1(true), setShowGameStep2(false))}>Play again</Button>
                </Col>
                <Col className='d-flex flex-column align-items-center'>
                    <h4>The house picked</h4>
                    <Button disabled className={`cs-btn-def cs-btn-${housePick}`}><Image src={housePickImg} alt='house pick' /></Button>
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
            <Container className='bg-white rounded p-5 cs-w d-flex flex-column gap-5'>
                <Container className='d-flex flex-row justify-content-between'>
                    <h3 className='text-uppercase'>Rules</h3>
                    <Button onClick={hideRulesPage} className='bg-transparent border-0'><Image fluid src={ImgClose} alt='close' /></Button>
                </Container>
                <Image fluid src={ImgRules} alt='rules' />
            </Container>
        </Container>
    );
};

export default MainGame;