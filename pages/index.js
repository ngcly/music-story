import React, { Fragment } from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import Head from 'next/head';
import './styles.less';

const Index = () => (
    <Fragment>
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta charSet='utf-8' />
      <title>Next-Antd</title>
    </Head>
    <Fragment>
      <h1>我是Next的首页</h1>
      <Link href='/userList'>
        <Button type='primary'>用户列表页</Button>
      </Link>
    </Fragment>
  </Fragment>
)

export default Index