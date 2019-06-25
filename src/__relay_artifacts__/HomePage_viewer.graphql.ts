/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { PostFeed_viewer$ref } from "./PostFeed_viewer.graphql";
declare const _HomePage_viewer$ref: unique symbol;
export type HomePage_viewer$ref = typeof _HomePage_viewer$ref;
export type HomePage_viewer = {
    readonly id: string;
    readonly totalCount: number | null;
    readonly " $fragmentRefs": PostFeed_viewer$ref;
    readonly " $refType": HomePage_viewer$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "HomePage_viewer",
  "type": "User",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "totalCount",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "PostFeed_viewer",
      "args": null
    }
  ]
};
(node as any).hash = 'fb14ac0c019c1b97c0d996ad957cca0b';
export default node;
