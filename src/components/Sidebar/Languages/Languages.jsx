import React from 'react';
import LanguageProgress from './LanguageProgress';

function Languages() {
  const languages = [
    { id: '1', language: 'English', level: 100 },
    { id: '2', language: 'French', level: 20 },
  ];

  return (
    <div className='art-lang-skills p-30-15'>
      {languages.map((l) => (
        <LanguageProgress id={l.id} language={l.language} level={l.level} />
      ))}
    </div>
  );
}

export default Languages;
