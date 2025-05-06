import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Quick Start Guide',
    description: 'New to Enjin? Follow our step-by-step guide covering essential setup and basic operations to get you building on the Enjin blockchain quickly.',
    link: 'getting-started/quick-start-guide',
    buttonText: 'Start Learning',
  },
  {
    title: 'Guides',
    description: 'Accelerate your development with official Enjin SDKs. Access comprehensive documentation, code examples, and usage guides for various languages and platforms.',
    link: 'category/guides',
    buttonText: 'View Guides',
  },
  {
    title: 'Enjin Tech-Stack',
    description: 'Understand the complete Enjin ecosystem. Get a high-level overview of how the Enjin Blockchain, Platform APIs, SDKs, Wallet, and Marketplace interconnect.',
    link: 'components/enjin-tech-stack',
    buttonText: 'View Tech-Stack',
  },
  {
    title: 'API Reference',
    description: 'Explore the full capabilities of the Enjin Platform. Access detailed specifications for our GraphQL API endpoints and learn how to integrate them.',
    link: '/api-reference',
    buttonText: 'Explore the API',
  },
];

function Feature({title, description, link, buttonText}) {
  return (
    <div className={clsx('col col--6')}>
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
