import { useRef, useEffect } from 'react';
import Scrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';
import { motion } from 'framer-motion';
import { styled } from 'styled-components';

export const SmoothScroll = (props) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    Scrollbar.use(OverscrollPlugin);
    Scrollbar.init(scrollRef.current, { damping: 0.5 });
  });

  return (
    <Container
      ref={scrollRef}
      className='art-scroll-frame'
      damping={0.5}
      plugins={{ overscroll: { effect: 'bounce' } }}
      {...props}
    >
      {props.children}
    </Container>
  );
};

const Container = styled(motion.div)`
  width: 100%;
  height: calc(100vh - 30px);
`;