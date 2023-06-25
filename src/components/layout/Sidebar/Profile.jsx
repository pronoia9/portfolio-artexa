import { styled, css } from 'styled-components';

import { dataStore } from '../../../store/dataStore';
import { rem } from '../../../utils';

export const Profile = () => (
  <ProfileContainer className='art-header'>
    <Avatar />
    <Name />
    <Post />
  </ProfileContainer>
);

export const Avatar = () => {
  const data = dataStore((state) => state.sidebar.profile);
  return (
    <AvatarContainer className='art-avatar'>
      <AvatarCurtain data-fancybox='avatar' href={data.avatar} className='art-avatar-curtain'>
        <AvatarImage src={data.avatar} alt='Avatar' />
        <i className='fas fa-expand' />
      </AvatarCurtain>

      <AvatarStatus className='art-lamp-light' $available={data.available}>
        <AvatarStatusLight className='art-available-lamp' $available={data.available} />
      </AvatarStatus>
    </AvatarContainer>
  );
};

export const Name = () => {
  const data = dataStore((state) => state.sidebar.profile);
  return (
    <NameText className='art-name mb-10'>
      <a href={data.nameLink}>{data.name}</a>
    </NameText>
  );
};

export const Post = () => {
  const data = dataStore((state) => state.sidebar.profile);
  return (
    <div>
      {data.subtitle.map((s) => (
        <div key={s}>{s}</div>
      ))}
    </div>
  );
};

const ProfileContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: ${rem(235)};
  padding: ${rem(30)};
  text-align: center;
  background: var(--c-bg-menu-2);
  box-shadow: 0 ${rem(1)} ${rem(4)} 0 var(--c-box-shadow);
  z-index: 99999;
`;

const AvatarContainer = styled.div`
  position: relative;
  width: ${rem(90)};
  height: ${rem(90)};
  margin: 0 auto;
  border-radius: 50%;
  margin-bottom: ${rem(15)};
`;

const AvatarCurtain = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  outline: inherit;
  transition: 0.2s ease-in-out;
  z-index: 0;

  i {
    width: ${rem(30)};
    height: ${rem(30)};
    align-self: center;
    color: var(--c-font-2);
    font-size: ${rem(11)};
    font-weight: 700;
    line-height: ${rem(30)};
    text-align: center;
    background: var(--c-gradient-3);
    border-radius: 50%;
    opacity: 0;
    z-index: 1;
    transition: 0.4s ease-in-out;
  }

  &:hover {
    opacity: 1;
    transition: 0.2s ease-in-out;
    outline: inherit;

    i {
      opacity: 0.7;

      &:hover {
        opacity: 1;
        transform: scale(1.07);
      }
    }
  }
`;

const AvatarImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  z-index: 0;
`;

const AvatarStatus = styled.div`
  z-index: 2;

  &:before {
    content: '';
    position: absolute;
    bottom: ${rem(-1)};
    right: ${rem(1)};
    background: var(--c-bg-img-hover);
    height: ${rem(23)};
    width: ${rem(23)};
    border-radius: 50%;
    animation: ${({ $available }) => ($available ? 'puls 1s infinite' : 'none')};
    opacity: ${({ $available }) => !$available && 0};
  }
`;

const AvatarStatusLight = styled.div`
  position: absolute;
  bottom: ${rem(3)};
  right: ${rem(5)};
  height: ${rem(15)};
  width: ${rem(15)};
  background: ${({ $available }) => ($available ? 'greenyellow' : 'red')};
  border-radius: 50%;
  z-index: 0;
  transition: 0.4s ease-in-out;

  &:after {
    position: relative;
    content: "I'm available for hire";
    width: ${rem(115)};
    display: block;
    padding: ${rem(5)} ${rem(10)};
    top: ${rem(-10)};
    left: ${rem(28)};
    font-size: ${rem(10)};
    font-weight: 200;
    color: var(--c-font-1);
    box-shadow: 0 ${rem(1)} ${rem(4)} 0 var(--c-box-shadow);
    background: var(--c-bg-1);
    opacity: 0;
    pointer-events: none;
    transform: translateX(${rem(20)});
    transition: 0.4s ease-in-out;
    text-align: left;
  }
  ${({ $available }) =>
    $available &&
    css`
      &:after {
        content: "Sorry, I'm no longer available, but feel free to contact me.";
      }
    `}

  &:before {
    content: '';
    position: absolute;
    height: ${rem(5)};
    width: ${rem(5)};
    right: ${rem(-15)};
    top: ${rem(5)};
    opacity: 0;
    background: var(--c-bg-1);
    pointer-events: none;
    transform: translateX(${rem(20)}) rotate(45deg);
    transition: 0.4s ease-in-out;
    z-index: 99;
    animation: none !important;
  }

  &:hover {
    transform: scale(1);

    &:after {
      opacity: 1;
      transform: translateX(0);
    }

    &:before {
      opacity: 1;
      transform: translateX(0) rotate(45deg);
    }
  }
`;

const NameText = styled.h5`
  a {
    color: var(--c-font-2);
    transition: 0.4s ease-in-out;

    &:hover {
      color: var(--c-accent-1);
    }
  }
`;
