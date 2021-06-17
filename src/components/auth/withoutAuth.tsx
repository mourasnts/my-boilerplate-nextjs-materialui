import { NextPage } from 'next';
import withAuthRedirect from './withAuthRedirect';

export default function WithoutAuth<P>(WrappedComponent: NextPage<P>, location = '/admin/dashboard'): NextPage<P> {
  return withAuthRedirect({
    WrappedComponent,
    location,
    expectedAuth: false,
  });
}
