import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

//TODO: Fill placeholders with texts and links

const FeatureList = [
  {
    title: 'Quick Start Guide',
    description: 'Learn the basics and get started with Enjin blockchain development in minutes.',
    link: '/docs/quick-start',
    buttonText: 'Start Learning',
  },
  {
    title: 'API Reference',
    description: 'Comprehensive API documentation for building games and apps on Enjin.',
    link: '/docs/api-reference',
    buttonText: 'Explore APIs',
  },
  {
    title: 'SDK Documentation',
    description: 'Detailed guides for using Enjin SDKs in your favorite programming language.',
    link: '/docs/sdk-documentation',
    buttonText: 'View SDKs',
  },
  {
    title: 'SDK Documentation',
    description: 'Detailed guides for using Enjin SDKs in your favorite programming language.',
    link: '/docs/sdk-documentation',
    buttonText: 'View SDKs',
  },
];

function Feature({title, description, link, buttonText}) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className={styles.featureTitle}>{title}</div>
        <p className={styles.featureDescription}>{description}</p>
        <Link
          className="button button--primary button--lg"
          to={link}>
          {buttonText}
        </Link>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <div className={styles.row}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
