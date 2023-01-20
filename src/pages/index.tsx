import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import styles from "./index.module.css";

export default function Home(): JSX.Element {
  return (
    <Layout
      title={`Documentation`}
      description="Official documentation for Fivepunch projects."
    >
      <section className={styles.main}>
        <div className={styles.hero} />
      </section>
    </Layout>
  );
}
