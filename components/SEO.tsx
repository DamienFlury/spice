import Head from 'next/head';

type Props = {
  title: string;
};

const SEO: React.FC<Props> = ({ title }) => (
  <Head>
    <title>{title}</title>
  </Head>
);

export default SEO;
