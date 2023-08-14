import { styled } from 'styled-components';

import { HeroHeading, HeroTyped, ButtonGradient, SectionWrapper } from '@/components';
import { heroMotion, rem, hero as data } from '@/utils';

export default SectionWrapper(() => {
  const { toggleLaptopOpen } = dataStore((state) => ({ toggleLaptopOpen: state.toggleLaptopOpen, }));

  const beamMeUpScotty = (e) => {
    e.preventDefault();
    // TODO: Find something cool to do here
    // ! Idea 1: Enter the laptop scene from the start
    toggleLaptopOpen(false);
  };

  return (
    <div className='col-lg-12'>
      <Banner className='art-a art-banner'>
        <div className='art-banner-back' />
        <div className='art-banner-dec' />

        <Overlay className='art-banner-overlay'>
          <Title className='art-banner-title'>
            <HeroHeading {...heroMotion.heading} />
            <HeroTyped {...heroMotion.typed} />
            <ButtonGradient title={data.button.text} onClick={beamMeUpScotty} {...heroMotion.button} />
          </Title>

          <Avatar src={data.avatar} className='art-banner-photo' alt='Banner Profile' />
        </Overlay>
      </Banner>
    </div>
  );
}, 'hero');

const Banner = styled.div`
  transition: 0.55s ease-in-out;
  background: ${({ theme }) => `url(${theme.heroBg})`};
  background-size: cover;
  background-position: center;
  position: relative;
  box-shadow: 0 3px 8px 0 var(--c-box-shadow);
  z-index: 999;
  isolation: isolate;

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
