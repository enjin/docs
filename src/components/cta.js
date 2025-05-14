import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './cta.module.css';

// Don't use it, couldn't make it work with internal links like /02-guides/01-platform/02-managing-users/01-connecting-user-wallets/02-verifying-wallets.md

function Cta({ title, content, url }) {
  const docUrl = useBaseUrl(url);
  return (
    <Link to={docUrl} className={styles.ctaContainer}>
      <h2 className={styles.ctaTitle}>{title}</h2>
      <p className={styles.ctaContent}>{content}</p>
      <span className={styles.ctaArrow}>&rarr;</span>
    </Link>
  );
}

export default Cta;