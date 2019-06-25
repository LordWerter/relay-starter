import PostFeed from './features/PostFeed';

import * as React from 'react';
import {
  createFragmentContainer,
  graphql,
  RelayProp,
} from 'react-relay';

// import { HomePage_viewer } from '../../__relay_artifacts__/HomePage_viewer.graphql';

interface Props {
  relay: RelayProp;
  viewer: any;
}

class HomePage extends React.Component<Props> {
  public render() {
    const hasPosts = (this.props.viewer.totalCount || 0) > 0;
    return (
      <>
          <PostFeed viewer={this.props.viewer} />
      </>
    );
  }
}

export default createFragmentContainer(HomePage, {
  viewer: graphql`
    fragment HomePage_viewer on User {
      id,
      totalCount,
      ...PostFeed_viewer,
    }
  `,
});
