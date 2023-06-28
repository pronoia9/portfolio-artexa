import { styled } from 'styled-components';
import { motion } from 'framer-motion';

import { dataStore } from '../../../store/dataStore';
import { sidebarMotion } from '../../../utils';

export const Info = () => {
  const data = dataStore((state) => state.sidebar.about);

  return (
    <motion.div className='art-table p-15-15' {...sidebarMotion.sidebarSection}>
      <ul>
        {data.map((item) => (
          <InfoItem key={item.id} {...item} />
        ))}
      </ul>
    </motion.div>
  );
};

export const InfoItem = ({ title, subtitle }) => {
  return (
    <ListItem {...sidebarMotion.info.frame}>
      <motion.span {...sidebarMotion.info.title}>{title}</motion.span>
      <motion.span {...sidebarMotion.info.subtitle}>{subtitle}</motion.span>
    </ListItem>
  );
};

const ListItem = styled(motion.li)`
  span:first-child {
    color: var(--c-font-2);
  }
`;