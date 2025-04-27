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
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Welcome to Enjin Docs
        </Heading>
        <p className="hero__subtitle">
          Start building with the world's first purpose-built blockchain for games and apps, with NFTs implemented at the protocol level.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg margin-right--md"
            to="/docs/quick-start">
            Get Started
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="https://github.com/enjin">
            View on GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  // const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title=""
      description="Begin your journey with Enjin's blockchain ecosystem using the Enjin Tech-Stack. Learn how to integrate blockchain assets into your projects seamlessly.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
