'use client';

import { useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import confetti from 'canvas-confetti';

import { HeroHeading, HeroTyped, ButtonGradient, SectionWrapper } from '@/components';
import { heroMotion, rem, hero as data } from '@/utils';

export default SectionWrapper(() => {
  const myCanvas = useRef(), myConfetti = useRef();

  useEffect(() => {
    myConfetti.current = confetti.create(myCanvas.current, { resize: true, useWorker: true });
  }, []);

  const beamMeUpScotty = (e) => {
    e.preventDefault();

    let count = 200;
    let defaults = { origin: { y: 0.9, x: 0.15 } };

    const fire = (particleRatio, opts) => {
      myConfetti.current(
        Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio),
        })
      );
    };

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  return (
    <div className='col-lg-12'>
      <Banner className='art-a art-banner'>
        <div className='art-banner-back' />
        <div className='art-banner-dec' />

        <BeamMeUp ref={myCanvas} />
        <Overlay className='art-banner-overlay'>
          <Title className='art-banner-title'>
            <HeroHeading {...heroMotion.heading} />
            <HeroTyped {...heroMotion.typed} />
            <ButtonGradient title={data.button.text} onClick={beamMeUpScotty} {...heroMotion.button} inline={true}></ButtonGradient>
          </Title>

          <Avatar src={data.avatar} className='art-banner-photo' alt='Banner Profile' />
        </Overlay>
        
      </Banner>
    </div>
  );
}, 'hero');

const BeamMeUp = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  pointer-events: none;
`;

const Banner = styled.div`
  position: relative;
  background: ${({ theme }) => `url(${theme.heroBg})`};
  background-size: cover;
  background-position: center;
  box-shadow: 0 3px 8px 0 var(--c-box-shadow);
  isolation: isolate;
  z-index: 999;
  transition: 0.55s ease-in-out;

  .art-banner-back {
    content: '';
    position: absolute;
    z-index: 0;
    top: -30px;
    width: 90%;
    height: 30px;
    margin-left: 5%;
    box-shadow: 0 3px 8px 0 var(--c-box-shadow);
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    background: ${({ theme }) => theme.bgBannerBack};
  }

  canvas {
    position: absolute;
    /* bottom: -200%; */
    /* left: -50%; */
    /* width: 200%; */
    /* height: 500%; */
    /* pointer-events: none; */
  }

  @media (max-width: 1400px) {
    .art-banner-back {
      display: none;
    }
  }
`;

const Overlay = styled.div`
  position: relative;
  display: flex;
  padding: 60px;
  width: 100%;
  background-image: ${({ theme }) => theme.bgHeroOverlay};

  @media (max-width: 920px) {
    padding: 60px 30px;
  }
`;

const Title = styled.div`
  width: 100%;
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: ${rem(15)};

  @media (max-width: 700px) {
    align-items: center;
    text-align: center;
  }
`;

const Avatar = styled.img`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 390px;
  transition: all 0.5s;

  &:hover {
    transform: scale(1.15);
    transform-origin: right bottom;
    transition: transform 0.5s;
  }

  @media (max-width: 1600px) {
    width: 360px;
  }

  @media (max-width: 1400px) {
    width: 320px;
  }

  @media (max-width: 700px) {
    display: none;
  }
`;
