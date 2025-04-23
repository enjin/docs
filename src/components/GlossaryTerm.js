import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import glossary from '@site/src/glossary';

export default function GlossaryTerm({ id }) {
  const term = glossary[id];

  if (!term) {
    console.warn(`Glossary term not found: ${id}`);
    return <span style={{ color: 'red' }}>{id}</span>;
  }
  const name = glossary[id].name;
  const definition = glossary[id].definition;

  return (
    <Tooltip title={definition} arrow>
      <span style={{ borderBottom: '1px dotted #888', cursor: 'help' }}>
        {name}
      </span>
    </Tooltip>
  );
}
