'use client';

import { styled } from 'styled-components';
import { motion } from 'framer-motion';

import { HoverExpand, SectionWrapper } from '@/components';

export default SectionWrapper(({ images }) => {
  return (
    <Grid className='col-12'>
      {images.map((image, index) => (
        <div className='grid-item'>
          <a data-fancybox='project' href={image} className='art-a art-portfolio-item-frame'>
            <img src={image} alt='item' />
            <HoverExpand />
          </a>
        </div>
      ))}
    </Grid>
  );
});

const Grid = styled(motion.div)`
  flex: 0 0 100%;
  width: 100%;
  display: grid;
  grid-template-areas: 'one three' 'two three';
  gap: 1.5rem;

  & > div {
    height: 100%;
    &:nth-child(1) {
      grid-area: one;
    }
    &:nth-child(2) {
      grid-area: two;
    }
    &:nth-child(3) {
      grid-area: three;
    }

    &:nth-child(3) {
      a,
      img {
        height: 100%;
        width: auto;
      }
    }
  }

  @media (max-width: 768px) {
    grid-template-areas: 'one' 'two' 'three';
  }
`;
