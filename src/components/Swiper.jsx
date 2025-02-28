'use client';

import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/autoplay';
// import 'swiper/css/controller';
// import 'swiper/css/effect-cards';
// import 'swiper/css/effect-coverflow';
// import 'swiper/css/effect-creative';
// import 'swiper/css/effect-cube';
// import 'swiper/css/effect-fade';
// import 'swiper/css/effect-flip';
// import 'swiper/css/free-mode';
// import 'swiper/css/grid';
import 'swiper/css/history';
import 'swiper/css/keyboard';
import 'swiper/css/manipulation';
import 'swiper/css/mousewheel';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import 'swiper/css/parallax';
import 'swiper/css/scrollbar';
// import 'swiper/css/thumbs';
// import 'swiper/css/virtual';
// import 'swiper/css/zoom';
import { Swiper as SwiperNative, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, A11y, Autoplay } from 'swiper';
import { styled } from 'styled-components';
import { motion } from 'framer-motion';

import { Card, SVGs } from '@/components';

export const Swiper = ({ section, data, navProps, autoplay, swiperOptions, navigation = true, pagination, children, ...props }) => {
  if (autoplay) SwiperCore.use([Autoplay]);
  return (
    <>
      <motion.div className='col-lg-12' {...props}>
        <SwiperNative
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={30}
          slidesPerView={3}
          speed={900}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 10 },
            1200: { slidesPerView: 3, spaceBetween: 30 },
          }}
          {...swiperOptions}
          navigation={{ nextEl: `.art-${section}-swiper-next`, prevEl: `.art-${section}-swiper-prev` }}
          pagination={{ el: `.${section}-swiper-pagination`, type: 'bullets', clickable: true }}
        >
          {children}
          {data?.map((item, index) => (
            <SwiperSlide key={`${section}-swiper-slide-${index}`} className='swiper-slide art-grid art-grid-3-col art-gallery'>
              <Card key={`${section}-swiper-card-${index}`} swiper={true} index={index} section={section} {...item} subtitle={null} />
            </SwiperSlide>
          ))}
        </SwiperNative>
      </motion.div>

      {navigation && <SwiperNavigation section={section} {...navProps} />}
    </>
  );
};

export const SwiperNavigation = ({ section, ...props }) => (
  <motion.div className='col-lg-12 p-0-30' {...props}>
    <NavContainer className='art-slider-navigation acc'>
      <div className='art-sn-left'>
        <div className={`swiper-pagination ${section}-swiper-pagination`} />
      </div>

      <div className='art-sn-right'>
        <NavFrame className='art-slider-nav-frame'>
          <Nav className={`art-slider-nav art-${section}-swiper-prev`} role='button' aria-label='Previous slide'>
            <SVGs type='left' height={13} />
          </Nav>
          <Nav className={`art-slider-nav art-${section}-swiper-next`} role='button' aria-label='Next slide'>
            <SVGs type='right' height={13} />
          </Nav>
        </NavFrame>
      </div>
    </NavContainer>
  </motion.div>
);

const NavContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  padding: 15px 0 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer !important;

  .swiper-pagination {
    position: static;
    left: 0 !important;
  }

  .swiper-pagination-bullet {
    height: 4px;
    margin-right: 10px;
    background-color: ${({ theme }) => theme.bgSwiperPagination};
    border-radius: 5px;
    opacity: 0.5;
    transition: 0.4s ease-in-out;

    &:focus {
      outline: inherit;
    }

    &:hover {
      background-color: var(--c-accent-4);
      transform: scale(1.1);
    }

    &.swiper-pagination-bullet-active {
      width: 20px;
      background-color: var(--c-accent-1);
      opacity: 1;
    }
  }
`;

const NavFrame = styled.div`
  display: flex;
`;

const Nav = styled.div`
  margin-left: 15px;
  cursor: pointer;
  transition: 0.4s ease-in-out;

  &.swiper-button-disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }

  &:focus {
    outline: inherit;
  }
`;
