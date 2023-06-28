import { styled } from 'styled-components';

import { rem } from '../utils';

export const GradientHeading = styled.div`
  transition: transform 0.5s ease-in-out;
  padding: 1rem 0;

  * {
    color: transparent;
    background-image: var(--c-gradient-accent-1);
    background-size: 20%;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -ms-background-clip: text;
    background-clip: text;
    line-height: 3rem;
  }
`;

export const Tooltip = styled.div`
  position: relative;

  &:after {
    content: 'Tooltip Content';
    position: absolute;
    display: block;
    font-size: ${rem(10)};
    font-weight: 200;
    text-align: left;
    background: var(--c-bg);
    box-shadow: 0 ${rem(1)} ${rem(4)} 0 var(--c-box-shadow);
    opacity: 0;
    pointer-events: none;
    transform: translateX(${rem(20)});
    transition: 0.4s ease-in-out;
  }

  &:before {
    content: '';
    position: absolute;
    background: var(--c-bg);
    pointer-events: none;
    opacity: 0;
    z-index: 99;
    transform: translateX(${rem(20)}) rotate(45deg);
    transition: 0.4s ease-in-out;
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