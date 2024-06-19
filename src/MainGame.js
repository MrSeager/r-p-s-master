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
    const [playerScore, setPlayerScore] = useState(JSON.parse(localStorage.getItem('playerScore')) || 0);
    const [houseScore, setHouseScore] = useState(JSON.parse(localStorage.getItem('houseScore')) || 0);

    const toggleRulesPage = () => {
        setShowRules(!showRules);
    };

    useEffect(() => {
        localStorage.setItem('playerScore', JSON.stringify(playerScore));
        localStorage.setItem('houseScore', JSON.stringify(houseScore));
      }, [playerScore, houseScore]);

    AOS.init();

    return (
        <Container fluid className='d-flex flex-column align-items-center gap-5'>
            <Container data-aos="fade-down" className='border rounded d-flex flex-row justify-content-between gap-5 cs-w-2 mt-5 py-2'>
                <h1 className='lh-1 text-uppercase display-5 text-white p-0 m-0'>Rock<br /> Paper<br /> Scissors</h1>
                <Container className='cs-w-3 bg-white rounded m-2 d-flex flex-column align-items-center justify-content-center'>
                    <h2 className='text-uppercase cs-fc h4'>Score</h2>
                    <h3 className='display-3 cs-fc-2'>{playerScore} x {houseScore}</h3>
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
        </Container>
    );
};

const GameStep1 = ({setUserPick, setShowGameStep1, setShowGameStep2, setHousePick}) => {
    const options = ['paper', 'scissors', 'rock'];

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
        <Container className='cs-w'>
            <Row>
                <Col xs={4} className='p-0 cs-line-1'>
                    <Button data-aos="fade-right" className='w-100 h-100 rounded-circle cs-btn-def cs-btn-paper' 
                            onClick={() => handlePlayerPick(options[0])}>
                        <Image fluid src={ImgPaper} alt='paper' className='h-50 w-50 mx-auto my-4' />
                    </Button>
                </Col>
                <Col xs={4}></Col>
                <Col xs={4} className='p-0 cs-line-2'>
                    <Button data-aos="fade-left" className='w-100 h-100 rounded-circle cs-btn-def cs-btn-scissors' 
                            onClick={() => handlePlayerPick(options[1])}>
                        <Image fluid src={ImgScissors} alt='scissors' className='h-50 w-50 mx-auto my-4' />
                    </Button>
                </Col>
                <Col xs={4} className='p-0 mx-auto cs-line-3'>
                    <Button fluid data-aos="fade-up" className='py-3 w-100 h-100 rounded-circle cs-btn-def cs-btn-rock' 
                            onClick={() => handlePlayerPick(options[2])}>
                        <Image src={ImgRock} alt='rock' className='h-50 w-50 mx-auto my-4' />
                    </Button>     
                </Col>
            </Row>
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

    const handleResult = () => {
        if (userPick === housePick) {
            setResult('Drow')
        } else if ((userPick === 'paper' && housePick !== 'scissors') ||
                   (userPick === 'scissors' && housePick !== 'rock') ||
                   (userPick === 'rock' && housePick !== 'paper')) {
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
        <Container className='mt-5 cs-w-2'>
            <Row className='gap-4 gap-lg-0 text-white text-uppercase justify-content-center'>
                <Col xs={{span: 5, order: 1}} lg={{span: 4, order: 1}} data-aos="fade-right" 
                     className='px-0 d-flex flex-column align-items-center'>
                    <h4 className='text-center'>You picked</h4>
                    <Button disabled className={`w-100 h-100 cs-btn-def rounded-circle cs-btn-${userPick} ${result === 'You win' && 'cs-win'}`}>
                        <Image fluid src={userPickImg} alt='user pick' className='h-50 w-50 mx-auto my-5' />
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
                     className='px-0 d-flex flex-column align-items-center'>
                    <h4>The house picked</h4>
                    <Button disabled className={`h-100 w-100 mx-auto cs-btn-def rounded-circle cs-btn-${housePick} ${result === 'You lose' && 'cs-win'}`}>
                        <Image fluid src={housePickImg} alt='house pick' className='h-50 w-50 mx-auto my-5' />
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