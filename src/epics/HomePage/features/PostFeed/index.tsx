import * as React from 'react';
import Post from './Post';

import {
  createFragmentContainer,
  graphql,
  RelayProp,
} from 'react-relay';

// import { PostFeed_viewer } from '../../../../__relay_artifacts__/PostFeed_viewer.graphql';
import { ChangeEvent } from 'react';

interface IProps {
  relay: RelayProp;
  viewer: any;
}

class PostFeed extends React.Component<IProps> {
  renderPosts() {
    if (!this.props.viewer.posts || !this.props.viewer.posts.edges) {
      throw new Error('assertion failed');
    }
    return this.props.viewer.posts.edges.map(edge => {
      const node = edge && edge.node;
      if (!node) throw new Error('assertion failed');
      return <Post
        key={node.id}
        post={node}
        viewer={this.props.viewer}
      />
    });
  }
  render() {
    const numPosts = this.props.viewer.totalCount;
    const numCompletedPosts = this.props.viewer.completedCount;
    return (
      <section className="post-list">
          {this.renderPosts()}
      </section>
    );
  }
}

export default createFragmentContainer(PostFeed, {
  viewer: graphql`
    fragment PostFeed_viewer on User {
      posts(
        first: 2147483647  # max GraphQLInt
      ) @connection(key: "PostFeed_posts") {
        edges {
          node {
            id,
            complete,
            ...Post_post,
          },
        },
      },
      id,
      totalCount,
      completedCount,
      ...Post_viewer,
    }
  `,
});
