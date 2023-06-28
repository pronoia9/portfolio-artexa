import { styled } from 'styled-components';

import { dataStore } from '../../../store/dataStore';
import { rem } from '../../../utils';

export const SoftSkills = () => {
  const data = dataStore((state) => state.sidebar.skills.soft);
  console.log(data);
  return (
    <SkillsList className='art-knowledge-list p-15-0'>
      {data.map((row, index) => (
        <div key={`sidebar-softskills-${index}`}>
          <ListItem key={`sidebar-softskills-${index}`}>
            <i className='fas fa-check' />
            {row.map((s) => s.title).join(', ')}
          </ListItem>
        </div>
      ))}
    </SkillsList>
  );
};

const SkillsList = styled.ul`
  padding-left: 0;
`;

const ListItem = styled.li`
  margin-bottom: ${rem(5)};
  color: var(--c-font-1);
  list-style-type: none;

  i {
    margin-right: ${rem(5)};
    color: var(--c-accent-1);
    font-size: ${rem(9)};
    font-weight: 900;
  }

  &:last-child {
    margin-bottom: 0;
  }

  &:hover i {
    color: var(--c-accent-3);
  }
`;
