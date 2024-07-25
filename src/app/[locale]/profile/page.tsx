import React from 'react';
import { User } from 'components/pages';
import type { PageProps } from 'app/types';

export default async function UserPage({
  params: _params,
  //searchParams,
}: PageProps) {
  return <User />;
}
