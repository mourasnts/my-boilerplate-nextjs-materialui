import { NextPage } from 'next';

import withAuthRedirect from './withAuthRedirect';

export default function withAuth<P>(WrappedComponent: NextPage<P>, location = '/auth/login'): NextPage<P> {
  return withAuthRedirect({
    WrappedComponent,
    location,
    expectedAuth: true,
  });
}
