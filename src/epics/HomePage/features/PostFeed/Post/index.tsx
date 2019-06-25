/*
import ChangePostStatusMutation from '../mutations/ChangeTodoStatusMutation';
import RemovePostMutation from '../mutations/RemoveTodoMutation';
import RenamePostMutation from '../mutations/RenameTodoMutation';
import PostTextInput from './TodoTextInput';
*/

import * as React from 'react';
import {
  createFragmentContainer,
  graphql,
  RelayProp,
} from 'react-relay';

import { Post_post } from '../../../../../__relay_artifacts__/Post_post.graphql';
import { Post_viewer } from '../../../../../__relay_artifacts__/Post_viewer.graphql';
import { ChangeEvent } from 'react';
import { Environment } from 'relay-runtime';

interface IProps {
  relay: RelayProp;
  post: Post_post;
  viewer: Post_viewer;
}

import { Wrapper, ImageSection, Title, Author, Description } from './index.styles';


class Post extends React.Component<IProps> {
  state = {
    isEditing: false,
  };
  private _setEditMode = (shouldEdit: boolean) => {
    this.setState({isEditing: shouldEdit});
  };
  public render() {
    return (
      <Wrapper>
        <ImageSection imgUrl={this.props.post.img_url} />
        <Title>{this.props.post.title}</Title>
        <Author>{this.props.post.author}</Author>
        <Description>{this.props.post.description}</Description>
      </Wrapper>
    );
  }
  public render() {
    return (
      <div>
        {renderPost()}
      </div>
    );
  }
}

export default createFragmentContainer(Post, {
  post: graphql`
    fragment Post_post on Post {
      complete,
      id,
      img_url,
      title,
      author,
      description,
    }
  `,
  viewer: graphql`
    fragment Post_viewer on User {
      id,
      totalCount,
      completedCount,
    }
  `,
});
