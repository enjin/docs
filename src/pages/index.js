import Image from '@site/static/img/integrate_faster.png';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <div className={styles.heroBannerContainer}>
      <header className={clsx('hero', styles.heroBanner)}>
        <div className="container">
          <Heading as="h1" className="hero__title">
            Welcome to Enjin Docs
          </Heading>
          <img src={Image} alt="Integrate Faster" className={styles.heroImage} /> {/* Add CSS class */}
          <p className="hero__subtitle">
            Start building with the world's first purpose-built blockchain for games and apps, with NFTs implemented at the protocol level.
          </p>
          <div className={styles.buttons}>
            <Link
              className={clsx(styles.button__wide, 'button button--primary button--lg margin-right--md')}
              to="getting-started/quick-start-guide">
              Get Started
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}

export default function Home() {
  // const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Welcome to Enjin Docs"
      description="Start building with the world's first purpose-built blockchain for games and apps, with NFTs implemented at the protocol level.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
